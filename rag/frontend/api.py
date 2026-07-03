import requests

from config import FASTAPI_URL


def search_resumes(query, top_k=5):

    response = requests.post(

        f"{FASTAPI_URL}/search",

        json={

            "query": query,

            "top_k": top_k

        }

    )

    return response.json()