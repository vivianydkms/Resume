import chromadb


client = chromadb.PersistentClient(
    path="./resume_db"
)

collection = client.get_or_create_collection(
    name="resume_collection",
    metadata={"hnsw:space": "cosine"}
)

print("Collection count:", collection.count())