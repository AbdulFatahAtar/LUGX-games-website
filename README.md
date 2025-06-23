# LUGX Games Website

## GitHub Repository

The source code for this project is available on GitHub: (https://github.com/AbdulFatahAtar/LUGX-games-website)

## Identification

* **Name:** Abdul Fatah Abdul Rauof Atar
* **P-number:** P456774
* **Course code:** IY4103 - Web Development

## Declaration of Own Work

I confirm that this assignment is my own work. 

## Introduction

LUGX Games Website is a fresh web application built with Python, Flask, HTML, CSS and JavaScript. It uses separate SQLite databases for users, games and orders, managed via SQLAlchemy. The back end lives in **main.py**, handling routes, user sessions and order processing. A simple script, **create_db.py**, sets up the database tables. Games data is initialised automatically if none exist.

The front end uses familiar templates: **index.html** for the home page, **ourShop.html** for the store, **login.html** for login and registration, **account.html** for user details, **cart.html** for the shopping cart, **search_results.html** for search outcomes, and **contactUs.html** for support messages. Static assets include **style.css**, **scripts.js** and images in **static/images** and **static2/images** (including a pie chart of top categories).

To launch the site, simply run `python main.py`. The app starts on port 5001 by default and offers user registration, login, trending and top games display, a searchable shop, cart and checkout with unique order numbers, and a contact form. A pie chart shows the most popular game categories, generated with Matplotlib.

## Key Functions

The application relies on several main functions that keep it running smoothly. `register_user()` handles new account creation, including form checks and password hashing. `login_user()` manages user sessions securely. `add_to_cart()` allows adding games into the shopping cart with quantity tracking, while `update_cart()` changes quantities and re-calculates totals. `checkout()` completes an order, gives a unique order number and saves it. `search_games()` lets users find games by name or genre without worrying about case. `generate_pie_chart()` uses Matplotlib to show which game categories are most popular. Finally, `contact()` deals with support messages, saving each one and flashing a confirmation.

## Libraries Used

* **Flask** – web framework
* **Flask-SQLAlchemy** – ORM & multi-bind support
* **SQLAlchemy** – query building & functions
* **matplotlib** – chart generation
* **datetime** – for timestamps
* **os** – system operations
* **json** – data structure handling
* **random** – random value generation
* **string** – string constants

Front-end: HTML5, CSS3, Google Fonts, JavaScript (vanilla, fetch/AJAX).
python
from flask import Flask, request, jsonify, render\_template, redirect, url\_for, session, flash
from flask sqlalchemy import SQLAlchemy
import os
import matplotlib.pyplot as plt
from sqlalchemy import or, func
from datetime import datetime
import json
import random
import string

````
These libraries handle the web framework, database connections, chart drawing, and general utilities.

## Installation
1. Ensure you have Python 3 installed.

> **Note:** There is no `requirements.txt` file; simply install the following packages:
```bash
pip install flask flask_sqlalchemy matplotlib
````

## How to Run

Start the server by running:

```bash
python main.py
```

Then open your web browser and go to:

```
http://127.0.0.1:5001
```

### Initialising Databases

To create the SQLite tables without launching the server:

```bash
python create_db.py
```

## Project Structure

```
LUGX-games-website/
├── databases/
│   ├── users.db
│   ├── games.db
│   └── orders.db
├── static/
│   ├── images/
│   ├── style.css
│   └── scripts.js
├── static2/
│   └── images/
│       └── top_categories_pie.png
├── templates/
│   ├── index.html
│   ├── ourShop.html
│   ├── login.html
│   ├── account.html
│   ├── cart.html
│   ├── search_results.html
│   └── contactUs.html
├── create_db.py
├── main.py
└── README.md
```

## Unit Tests

Although no formal tests are included, you can test manually by:

1. Registering a user and checking the database entry.
2. Logging in and out to verify sessions.
3. Adding, updating and removing items in the cart.
4. Completing a checkout and confirming the order number appears in `orders.db`.
5. Searching for games by name or genre.
6. Viewing the pie chart under `static2/images/top_categories_pie.png`.

## Contribution

Contributions are very welcome. Feel free to open an issue or submit a pull request at the GitHub repository.
