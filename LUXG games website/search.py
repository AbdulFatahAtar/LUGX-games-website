from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data for games (can be replaced with a database later)
games = [
    {"name": "Warframe", "genre": "Action", "image": "images/trending-01.jpg"},
    {"name": "Tower of fantasy", "genre": "Action", "image": "images/trending-02.jpg"},
    {"name": "Super people", "genre": "Action", "image": "images/trending-03.jpg"},
    {"name": "Dragon", "genre": "Action", "image": "images/trending-04.jpg"},
    {"name": "Pubg", "genre": "Adventure", "image": "images/top-game-02.jpg"},
    {"name": "Apex", "genre": "Adventure", "image": "images/top-game-03.jpg"},
    {"name": "The sims 4", "genre": "Adventure", "image": "images/top-game-04.jpg"},
    {"name": "Lostark", "genre": "Adventure", "image": "images/top-game-05.jpg"},
    {"name": "Destiny 2", "genre": "Adventure", "image": "images/top-game-06.jpg"}
]

@app.route("/search", methods=["GET"])
def search():
    # Get the search query from the URL parameters
    query = request.args.get("query", "").lower()
    if not query:
        return jsonify([])
    # Filter games based on the query
    results = [game for game in games if query in game["name"].lower()]
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

     