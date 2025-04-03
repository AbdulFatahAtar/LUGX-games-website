from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import json
import os
import matplotlib.pyplot as plt  # Import matplotlib for creating charts
import sys
import unittest  # Import unittest for running tests

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Secret key is needed for session management

USERS_FILE = 'users.json'  # File to store user data

# ---------------------------
# Helper Functions for User Management
# ---------------------------

def load_users():
    """Load user data from a JSON file.
    If the file does not exist or an error occurs, return an empty dictionary."""
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
    """Save user data to a JSON file.
    Print an error message if the data cannot be saved."""
    try:
        with open(USERS_FILE, 'w') as file:
            json.dump(users, file)
    except Exception as e:
        print(f"Error saving users: {e}")

def register_user(email, password):
    """Register a new user if the email is not already registered.
    Return a tuple (success, message) to indicate the result."""
    users = load_users()
    if email in users:
        return False, "Account already registered."
    users[email] = {"email": email, "password": password}
    save_users(users)
    return True, "Registration successful. You are now logged in."

def login_user(email, password):
    """Log in a user if the email exists and the password matches.
    Return a tuple (success, message) to indicate the result."""
    users = load_users()
    if email not in users:
        return False, "Account not registered."
    if users[email]["password"] != password:
        return False, "Incorrect password."
    return True, "Login successful."

# ---------------------------
# Function to Generate Top Categories Pie Chart
# ---------------------------

def generate_top_categories_chart():
    """Generate a pie chart showing usage of top categories and save it in static2/images.
    This image is used on the index page to display category usage."""
    # Define the category labels and example percentages
    labels = ['Puzzle Games', 'Strategy Games', 'Racing Games', 'Adventure Games', 'Action Games']
    sizes = [20, 25, 15, 30, 10]  # Example usage percentages for each category
    colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0']  # Colors for each slice
    explode = (0.05, 0.05, 0.05, 0.05, 0.05)  # Slightly offset each slice for visibility

    # Create the pie chart figure
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140, colors=colors, explode=explode)
    plt.title('Top Categories Usage')
    plt.axis('equal')  # Ensure the chart is drawn as a circle

    # Set the directory to save the image as static2/images
    images_dir = os.path.join('static2', 'images')
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)
    # Save the chart image
    chart_path = os.path.join(images_dir, 'top_categories_pie.png')
    plt.savefig(chart_path)
    plt.close()
    print(f"Chart saved at {chart_path}")

# ---------------------------
# Flask Routes for the Web Application
# ---------------------------

@app.route('/')
def home():
    """Render the index page. The index page includes the top categories chart image."""
    return render_template('index.html')

@app.route('/login')
def login_page():
    """Render the login page for user authentication."""
    return render_template('login.html')

@app.route('/account')
def account_page():
    """Render the account page with the user's email and password if logged in."""
    if 'user_email' in session:
        email = session['user_email']
        users = load_users()
        user = users.get(email, {})
        return render_template('account.html', email=user.get("email"), password=user.get("password"))
    return redirect(url_for('login_page'))

@app.route('/contactUS')
def contact_page():
    """Render the contact us page so users can send questions or comments."""
    return render_template('contactUS.html')

@app.route('/ourShop')
def shop_page():
    """Render the shop page to display available products."""
    return render_template('ourShop.html')

@app.route('/auth', methods=['POST'])
def auth():
    """Handle authentication for login and registration.
    It checks the user action and processes the user credentials accordingly."""
    action = request.form.get("action")
    email = request.form.get("email")
    password = request.form.get("password")

    # Check if email and password are provided
    if not email or not password:
        return jsonify({"success": False, "message": "Please provide both email and password."})
    
    # Process registration
    if action == "register":
        success, message = register_user(email, password)
        if success:
            session['user_email'] = email
        return jsonify({"success": success, "message": message})
    # Process login
    elif action == "login":
        success, message = login_user(email, password)
        if success:
            session['user_email'] = email
        return jsonify({"success": success, "message": message})
    
    # If the action is not recognized, return an error
    return jsonify({"success": False, "message": "Invalid action."})

# ---------------------------
# Unit Tests for Helper Functions and Chart Generation
# ---------------------------

class TestUserFunctions(unittest.TestCase):
    """Unit tests to check the user functions and chart generation."""

    def setUp(self):
        """Setup a test users file before each test."""
        # Backup the real users file if it exists
        self.backup_file = None
        if os.path.exists(USERS_FILE):
            with open(USERS_FILE, 'r') as file:
                self.backup_file = file.read()
        # Start with an empty users file
        with open(USERS_FILE, 'w') as file:
            file.write("{}")

    def tearDown(self):
        """Restore the original users file after each test."""
        if self.backup_file is not None:
            with open(USERS_FILE, 'w') as file:
                file.write(self.backup_file)
        else:
            os.remove(USERS_FILE)

    def test_register_and_login(self):
        """Test registration and login functions."""
        # Register a new user
        success, message = register_user("test@example.com", "testpass")
        self.assertTrue(success)
        self.assertEqual(message, "Registration successful. You are now logged in.")
        
        # Try to register the same user again
        success, message = register_user("test@example.com", "testpass")
        self.assertFalse(success)
        self.assertEqual(message, "Account already registered.")

        # Test login with correct credentials
        success, message = login_user("test@example.com", "testpass")
        self.assertTrue(success)
        self.assertEqual(message, "Login successful.")

        # Test login with wrong password
        success, message = login_user("test@example.com", "wrongpass")
        self.assertFalse(success)
        self.assertEqual(message, "Incorrect password.")

        # Test login with unregistered email
        success, message = login_user("nonexistent@example.com", "testpass")
        self.assertFalse(success)
        self.assertEqual(message, "Account not registered.")

    def test_generate_chart(self):
        """Test if the top categories chart is generated and saved correctly."""
        generate_top_categories_chart()
        chart_path = os.path.join('static2', 'images', 'top_categories_pie.png')
        self.assertTrue(os.path.exists(chart_path))

# ---------------------------
# Run the Flask Application or Unit Tests
# ---------------------------

if __name__ == '__main__':
    # If 'test' is passed as an argument, run unit tests instead of the app
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        # Remove 'test' from sys.argv to prevent unittest from processing it
        sys.argv.pop(1)
        unittest.main()
    else:
        # Generate the pie chart for top categories before starting the app
        generate_top_categories_chart()
        # Start the Flask app in debug mode
        app.run(debug=True)
