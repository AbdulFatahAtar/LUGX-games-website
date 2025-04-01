import os
import json
from flask import Flask, request, render_template_string

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Required for session management

# File to store user data
USERS_FILE = "users.json"

# -------------------------------
# File handling functions
# -------------------------------
def load_users():
    """Load users from a JSON file; return an empty dict if file doesn't exist."""
    if not os.path.exists(USERS_FILE):
        return {}
    try:
        with open(USERS_FILE, "r") as f:
            users = json.load(f)
        return users
    except Exception as e:
        print("Error loading users:", e)
        return {}

def save_users(users):
    """Save the users dictionary to a JSON file."""
    try:
        with open(USERS_FILE, "w") as f:
            json.dump(users, f, indent=4)
    except Exception as e:
        print("Error saving users:", e)

# -------------------------------
# User registration and login functions
# -------------------------------
def register_user(email, password):
    """Register a new user. Return (success, message)."""
    users = load_users()
    if email in users:
        return (False, "Email already registered. Please log in instead.")
    users[email] = password
    save_users(users)
    return (True, "Registration successful. You can now log in.")

def login_user(email, password):
    """Log in a user. Return (success, message)."""
    users = load_users()
    if email not in users:
        return (False, "Email not registered. Please register first.")
    if users[email] != password:
        return (False, "Incorrect password. Please try again.")
    return (True, "Login successful.")

# -------------------------------
# Route for handling authentication (AJAX endpoint)
# -------------------------------
@app.route("/auth", methods=["POST"])
def auth():
    email = request.form.get("email", "").strip()
    password = request.form.get("password", "")
    action = request.form.get("action")
    if action == "register":
        success, message = register_user(email, password)
    elif action == "login":
        success, message = login_user(email, password)
    else:
        success, message = False, "Invalid action."
    return json.dumps({"success": success, "message": message}), 200, {"Content-Type": "application/json"}

# -------------------------------
# Main route to render the login page
# -------------------------------
@app.route("/")
def home():
    # For simplicity, we serve the login page directly from the file system.
    # In production, you might use render_template with a separate HTML file.
    with open("login.html", "r", encoding="utf-8") as f:
        html_content = f.read()
    return render_template_string(html_content)

# -------------------------------
# Run the Flask application
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)


     
