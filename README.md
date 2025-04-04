# LUGX Games Website

# GitHub Repository
The source code for this project is available on GitHub: https://github.com/AbdulFatahAtar/LUGX-games-website

## Identification
- **Name:** Abdul Fatah Abdul Rauof Atar
- **P-number:** P456774
- **Course code:** IY499 - Introduction to Programming

## Declaration of Own Work
I confirm that this assignment is my own work.  
Where I have referred to online sources, I have provided comments detailing the reference and included a link to the source.

## Introduction
LUXG Games Website is an exciting web application that uses Python, HTML, CSS, and JavaScript. It’s designed to give you an online gaming shop experience with a well organised and simple structure. The main functions are handled by login.py, which handles user login, routing, sorting user information and data processing. User information like email and password is saved in users.json and accessed through functions like register_user() and login_user().

The front end uses HTML, CSS, and JavaScript, featuring important templates like index.html (homepage), account.html (user dashboard), ourShop.html (game store), login.html (login and register page) and contactUs.html (support page). The static files including images file, style.css and scripts.js help improve the user interface which makes sure everything works smoothly such as login in the website and contact.

To set up and run the project, make sure you have Python installed. Start the application by executing `python login.py` or run the code from VS code which will launch the website at `http://127.0.0.1:5000`. The site has great features like user registration and login, a list of trending and most-played games, an online store for gaming products, and a contact form. In addition, it uses matplotlib for data visualisation which shows a pie chart of the most popular game categories. The project also includes good error handling and file access methods for efficient data management.

The project runs on Python for the back end, HTML, CSS and JavaScript for the front end use matplotlib for showing gaming trends, json for saving user data, and Git for version control. The front end design is fully responsive, ensuring a smooth experience on all devices. With its clear structure and simple design, the LUXG Games Website offers a fantastic platform for gaming fans, mixing functionality with ease of use.

## Installation
To run the project, ensure you have Python installed, then install the required dependencies from the `requirements.txt` file using the following command:
```bash
pip install -r requirements.txt
```

## How to Run
- Run the website by executing the `login.py` file:
  ```bash
  python login.py
  ```
- Open your web browser and visit:
  ```
  http://127.0.0.1:5000
  ```

### Running Unit Tests
```bash
python login.py test
```

## Project Elements
- User registration and login
- Game search functionality
- Display of trending and most played games
- Online shopping for gaming products
- A "Contact Us" form
- Responsive web design
- Data visualisation using a pie chart (matplotlib)
- Comprehensive error handling and recovery mechanisms
- File access for reading and writing user data
- Use of functions, complex data structures, and well-commented code
- Application of a search or sort algorithm

## Libraries Used
The following libraries and packages are used in this project:
- Flask (for web framework)
- matplotlib (for data visualisation)
- json (for file handling)
- unittest (for unit testing)
- HTML, CSS, and JavaScript (for the frontend)
- Git (for version control)

## Project Structure
LUXG games website/
├── login.py
├── users.json
├── readme.md
├── static/
│   ├── images/
│   ├── scripts.js
│   └── style.css
├── templates/
│   ├── index.html
│   ├── account.html
│   ├── contactUs.html
│   ├── login.html
│   └── ourShop.html
└── static2/
    └── images

## Unit Tests 
The project includes unit tests to verify key functionalities such as user registration, login, and chart generation.
To run the unit tests, navigate to the project directory and run:
```bash
python login.py test
```
This command will execute all the test cases defined in the project.

## Contribution Guidelines 
If you wish to contribute to this project, please feel free to open an issue or submit a pull request.

