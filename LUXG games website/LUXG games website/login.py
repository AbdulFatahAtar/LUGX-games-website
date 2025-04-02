from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import json
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session management

USERS_FILE = 'users.json'

# ---------------------------
# Helper functions
# ---------------------------

def load_users():
    """Load the users dictionary from the file."""
    try:
        if os.path.exists(USERS_FILE):
            with open(USERS_FILE, 'r') as file:
                users = json.load(file)
        else:
            users = {}
    except Exception as e:
        print(f"Error loading users: {e}")
        users = {}
    return users

def save_users(users):
    """Save the users dictionary to the file."""
    try:
        with open(USERS_FILE, 'w') as file:
            json.dump(users, file)
    except Exception as e:
        print(f"Error saving users: {e}")

def register_user(email, password):
    """Register a new user if not already registered."""
    users = load_users()
    if email in users:
        return False, "Account already registered."
    users[email] = {"email": email, "password": password}
    save_users(users)
    return True, "Registration successful. You are now logged in."

def login_user(email, password):
    """Login an existing user if credentials match."""
    users = load_users()
    if email not in users:
        return False, "Account not registered."
    if users[email]["password"] != password:
        return False, "Incorrect password."
    return True, "Login successful."

# ---------------------------
# Routes
# ---------------------------

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/account')
def account_page():
    if 'user_email' in session:
        email = session['user_email']
        users = load_users()
        user = users.get(email, {})
        return render_template('account.html', email=user.get("email"), password=user.get("password"))
    return redirect(url_for('login_page'))

@app.route('/contactUS')
def contact_page():
    return render_template('contactUS.html')

@app.route('/ourShop')
def shop_page():
    return render_template('ourShop.html')

@app.route('/auth', methods=['POST'])
def auth():
    action = request.form.get("action")
    email = request.form.get("email")
    password = request.form.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Please provide both email and password."})
    
    if action == "register":
        success, message = register_user(email, password)
        if success:
            session['user_email'] = email
        return jsonify({"success": success, "message": message})
    
    elif action == "login":
        success, message = login_user(email, password)
        if success:
            session['user_email'] = email
        return jsonify({"success": success, "message": message})

    return jsonify({"success": False, "message": "Invalid action."})

# ---------------------------
# Run the app
# ---------------------------
if __name__ == '__main__':
    app.run(debug=True)
