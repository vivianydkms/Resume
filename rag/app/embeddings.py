from sentence_transformers import SentenceTransformer


# Load once when FastAPI starts
model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    device="cuda"
)


def generate_embedding(text):
    return model.encode(text).tolist()

