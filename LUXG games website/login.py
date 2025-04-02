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
    """
    Load the users dictionary from the file.
    If the file doesn't exist, return an empty dictionary.
    """
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
    """
    Save the users dictionary to the file.
    """
    try:
        with open(USERS_FILE, 'w') as file:
            json.dump(users, file)
    except Exception as e:
        print(f"Error saving users: {e}")

def register_user(email, password):
    """
    Register a new user if not already registered.
    Returns a tuple (success, message).
    """
    users = load_users()
    # Use simple search (linear search in dictionary keys)
    if email in users:
        return (False, "Account already registered.")
    # Save user data
    users[email] = {"email": email, "password": password}
    save_users(users)
    return (True, "Registration successful. You are now logged in.")

def login_user(email, password):
    """
    Login an existing user if credentials match.
    Returns a tuple (success, message).
    """
    users = load_users()
    if email not in users:
        return (False, "Account not registered.")
    # Check if the provided password matches the stored password
    if users[email]["password"] != password:
        return (False, "Incorrect password.")
    return (True, "Login successful.")

# ---------------------------
# Routes
# ---------------------------

@app.route('/')
def home():
    return render_template('index.html')  # Assume you have an index.html

@app.route('/login')
def login_page():
    # Render the login/register page
    return render_template('login.html')

@app.route('/account')
def account_page():
    """
    Display account details if the user is logged in.
    """
    if 'user_email' in session:
        email = session['user_email']
        users = load_users()
        user = users.get(email, {})
        return render_template('account.html', email=user.get("email"), password=user.get("password"))
    else:
        return redirect(url_for('login_page'))

@app.route('/auth', methods=['POST'])
def auth():
    """
    Handle registration and login requests via AJAX.
    """
    action = request.form.get("action")
    email = request.form.get("email")
    password = request.form.get("password")

    # Basic validation
    if not email or not password:
        return jsonify({"success": False, "message": "Please provide both email and password."})
    
    if action == "register":
        success, message = register_user(email, password)
        if success:
            # Set session and redirect to account page
            session['user_email'] = email
        return jsonify({"success": success, "message": message})
    elif action == "login":
        success, message = login_user(email, password)
        if success:
            session['user_email'] = email
        return jsonify({"success": success, "message": message})
    else:
        return jsonify({"success": False, "message": "Invalid action."})

# ---------------------------
# Testing (Manual or Automated)
# ---------------------------
# You can write tests using unittest or pytest in a separate file.
# For example, a simple test function for register_user:

def test_register_user():
    # Clear users file for testing
    if os.path.exists(USERS_FILE):
        os.remove(USERS_FILE)
    # Test registration of new user
    success, msg = register_user("test@example.com", "test123")
    assert success == True, "Registration should succeed for new user"
    # Test duplicate registration
    success, msg = register_user("test@example.com", "test123")
    assert success == False, "Duplicate registration should fail"
    print("All tests passed.")

if __name__ == '__main__':
    # Uncomment the following line to run tests:
    # test_register_user()
    app.run(debug=True)


     
