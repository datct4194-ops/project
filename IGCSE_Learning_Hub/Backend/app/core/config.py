import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

DB_PATH = os.path.join(BASE_DIR, "app", "db", "igcse.db")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")