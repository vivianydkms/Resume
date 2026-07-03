from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

import os
import shutil

from app.schemas import SearchRequest
from app.database import collection
from app.embeddings import generate_embedding
from app.pdf_parser import extract_content


app = FastAPI(
    title="Resume Selector API"
)


# =====================================
# Upload Resume Endpoint
# =====================================
@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...)
):

    save_path = os.path.join(
        "resumes",
        file.filename
    )

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    content = extract_content(
        save_path
    )

    embedding = generate_embedding(
        content
    )

    collection.add(
        ids=[file.filename],
        documents=[content],
        embeddings=[embedding],
        metadatas=[
            {
                "filename": file.filename
            }
        ]
    )

    print("=" * 80)
    print("Added:", file.filename)
    print("Collection count:", collection.count())
    print("=" * 80)

    return {
        "message": "Resume Added",
        "filename": file.filename
    }


# =====================================
# Search Endpoint
# =====================================
@app.post("/search")
def search_resumes(
    request: SearchRequest
):

    query_embedding = generate_embedding(
        request.query
    )

    results = collection.query(
        query_embeddings=[
            query_embedding
        ],
        n_results=request.top_k,
        include=[
            "distances",
            "documents",
            "metadatas"
        ]
    )

    print(results)

    response = []

    for i in range(
        len(results["metadatas"][0])
    ):

        filename = os.path.basename(
                    results["ids"][0][i]
                        )

        response.append(
             {
        "filename": filename,
        "score": round(
            1 - results["distances"][0][i],
            4
        ),
        "download_url":
        f"http://127.0.0.1:8000/resumes/{filename}"
            }
                )
        
    return {
        "query": request.query,
        "results": response
    }


#Now FastAPI can serve PDFs.
from fastapi.responses import FileResponse

@app.get("/resumes/{filename}")
def get_resume(filename: str):

    path = os.path.join(
        "resumes",
        filename
    )

    return FileResponse(
        path,
        media_type="application/pdf",
        filename=filename
    )