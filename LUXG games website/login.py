# I use many libraries in this code and it is the following
from flask import Flask, request, jsonify, render_template, redirect, url_for, session  
import json  
import os  
import matplotlib.pyplot as plt  
import sys  
import unittest  

# I create a Flask and set a secret key 
app = Flask(__name__)
app.secret_key = 'your_secret_key'

# define the file and store user data in users.json
USERS_FILE = 'users.json'

# this function load user data from the json file
def load_users():
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

# this function save user data to the json file and print error if saving fails
def save_users(users):
    try:
        with open(USERS_FILE, 'w') as file:
            json.dump(users, file)
    except Exception as e:
        print(f"Error saving users: {e}")

# this function register a new user if the email is not already registered
def register_user(email, password):
    users = load_users()
    if email in users:
        return False, "Account already registered."
    users[email] = {"email": email, "password": password}
    save_users(users)
    return True, "Registration successful. You are now logged in."

# this function check if the user exists and if the password matches
def login_user(email, password):
    users = load_users()
    if email not in users:
        return False, "Account not registered."
    if users[email]["password"] != password:
        return False, "Incorrect password."
    return True, "Login successful."

# this function sort users by email and return a sorted dictionary
def get_sorted_users():
    users = load_users()
    sorted_emails = sorted(users.keys())
    sorted_users = {email: users[email] for email in sorted_emails}
    return sorted_users

# this function ceate a pie chart for game category usage
def generate_top_categories_chart():
    labels = ['Puzzle Games', 'Strategy Games', 'Racing Games', 'Adventure Games', 'Action Games']
    sizes = [20, 25, 15, 30, 10]
    colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0']
    explode = (0.05, 0.05, 0.05, 0.05, 0.05)
    
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140, colors=colors, explode=explode)
    plt.title('Top Categories Usage')
    plt.axis('equal')
    
    images_dir = os.path.join('static2', 'images')
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)
    chart_path = os.path.join(images_dir, 'top_categories_pie.png')
    plt.savefig(chart_path)
    plt.close()
    print(f"Chart saved at {chart_path}")

# this function render the home page with the top categories chart
@app.route('/')
def home():
    return render_template('index.html')

# this function render the login page
@app.route('/login')
def login_page():
    return render_template('login.html')

# this function render the account page
@app.route('/account')
def account_page():
    if 'user_email' in session:
        email = session['user_email']
        users = load_users()
        user = users.get(email, {})
        return render_template('account.html', email=user.get("email"), password=user.get("password"))
    return redirect(url_for('login_page'))

# this function render the contact us page
@app.route('/contactUS')
def contact_page():
    return render_template('contactUS.html')

# this function render the our shop page
@app.route('/ourShop')
def shop_page():
    return render_template('ourShop.html')

# this function handle user log in and registration and check if the user is logged in and if the password is correct or not
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

# tast the registration and login also sort user from the users.json file
class TestUserFunctions(unittest.TestCase):
    def setUp(self):
        self.backup_file = None
        if os.path.exists(USERS_FILE):
            with open(USERS_FILE, 'r') as file:
                self.backup_file = file.read()
        with open(USERS_FILE, 'w') as file:
            file.write("{}")

# this function restore the original users.json file after the test
    def tearDown(self):
        if self.backup_file is not None:
            with open(USERS_FILE, 'w') as file:
                file.write(self.backup_file)
        else:
            os.remove(USERS_FILE)

# this function test the registration and login functions and if the input correct or incorrect
    def test_register_and_login(self):
        success, message = register_user("test@example.com", "testpass")
        self.assertTrue(success)
        self.assertEqual(message, "Registration successful. You are now logged in.")
        
        success, message = register_user("test@example.com", "testpass")
        self.assertFalse(success)
        self.assertEqual(message, "Account already registered.")

        success, message = login_user("test@example.com", "testpass")
        self.assertTrue(success)
        self.assertEqual(message, "Login successful.")

        success, message = login_user("test@example.com", "wrongpass")
        self.assertFalse(success)
        self.assertEqual(message, "Incorrect password.")

        success, message = login_user("nonexistent@example.com", "testpass")
        self.assertFalse(success)
        self.assertEqual(message, "Account not registered.")

    def test_generate_chart(self):
        generate_top_categories_chart()
        chart_path = os.path.join('static2', 'images', 'top_categories_pie.png')
        self.assertTrue(os.path.exists(chart_path))

    def test_get_sorted_users(self):
        register_user("z@example.com", "pass")
        register_user("a@example.com", "pass")
        register_user("m@example.com", "pass")
        sorted_users = get_sorted_users()
        sorted_emails = list(sorted_users.keys())
        self.assertEqual(sorted_emails, sorted(sorted_emails))

# run the code and test the functions
if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        sys.argv.pop(1)
        unittest.main()
    else:
        generate_top_categories_chart()
        app.run(debug=True)
