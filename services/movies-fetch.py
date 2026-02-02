from fastapi import FastAPI
import requests

app = FastAPI()

TMDB_API_KEY = "c52f25de03e21f818876a590fe19380e"
TMDB_BASE_URL = "https://api.themoviedb.org/3"

@app.get("/movie")
def get_movie(movie_name: str):
    try:
        response = requests.get(
            f"{TMDB_BASE_URL}/search/movie",
            params={
                "api_key": TMDB_API_KEY,
                "query": movie_name,
                "language": "en-US"
            },
            timeout=5
        )
    except requests.exceptions.Timeout:
        return {"error": "TMDB timeout"}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

    if response.status_code != 200:
        return {"error": "TMDB error", "status": response.status_code}

    data = response.json()

    if "results" not in data or len(data["results"]) == 0:
        return {"error": "Movie not found"}

    movie = data["results"][0]

    return {
        "name": movie.get("title"),
        "description": movie.get("overview"),
        "release_date": movie.get("release_date"),
        "poster": (
            f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
            if movie.get("poster_path")
            else None
        )
    }

main.py
2 KB