from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
import os
import matplotlib.pyplot as plt
from sqlalchemy import or_, func
from datetime import datetime
import json
import random
import string

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a secure secret key in production

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'databases')
if not os.path.exists(db_path):
    os.makedirs(db_path)

def generate_order_number():
    timestamp = datetime.now().strftime('%y%m%d')
    random_digits = ''.join(random.choices(string.digits, k=3))
    return f'ORD#{timestamp}{random_digits}'

# Create separate databases for different entities
class UserDatabase:
    def __init__(self, app):
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(db_path, "users.db")}'
        app.config['SQLALCHEMY_BINDS'] = {
            'users': f'sqlite:///{os.path.join(db_path, "users.db")}',
            'games': f'sqlite:///{os.path.join(db_path, "games.db")}',
            'orders': f'sqlite:///{os.path.join(db_path, "orders.db")}'
        }
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.db = SQLAlchemy(app)

        class User(self.db.Model):
            __bind_key__ = 'users'
            id = self.db.Column(self.db.Integer, primary_key=True)
            email = self.db.Column(self.db.String(120), unique=True, nullable=False)
            password = self.db.Column(self.db.String(80), nullable=False)

        self.User = User

# Game Database
class GameDatabase:
    def __init__(self, app, db):
        class Game(db.Model):
            __bind_key__ = 'games'
            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(100), nullable=False)
            genre = db.Column(db.String(50), nullable=False)
            price = db.Column(db.Float, default=0.0)
            image_url = db.Column(db.String(200), nullable=False)
            description = db.Column(db.Text)
            platform = db.Column(db.String(50))
            release_date = db.Column(db.String(20))
            publisher = db.Column(db.String(100))
            is_trending = db.Column(db.Boolean, default=False)
            is_top = db.Column(db.Boolean, default=False)
            created_at = db.Column(db.DateTime, server_default=db.func.now())
            updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

        self.Game = Game

# Order Database
class OrderDatabase:
    def __init__(self, app, db):
        class Order(db.Model):
            __tablename__ = 'orders'  # Explicitly set table name
            __bind_key__ = 'orders'
            id = db.Column(db.Integer, primary_key=True)
            order_number = db.Column(db.String(20), unique=True, nullable=False)
            user_email = db.Column(db.String(120), nullable=False)
            name = db.Column(db.String(100), nullable=False)
            email = db.Column(db.String(120), nullable=False)
            phone = db.Column(db.String(20), nullable=False)
            address = db.Column(db.Text, nullable=False)
            items = db.Column(db.Text, nullable=False)  # JSON string of cart items
            total = db.Column(db.Float, nullable=False)
            payment_method = db.Column(db.String(50), nullable=False)
            card_number = db.Column(db.String(20))  # Last 4 digits only
            created_at = db.Column(db.DateTime, default=datetime.utcnow)
            status = db.Column(db.String(20), default='pending')

        self.Order = Order

# Initialize databases
user_db = UserDatabase(app)
db = user_db.db
game_db = GameDatabase(app, db)
order_db = OrderDatabase(app, db)

# Function to initialize games in the database
def init_games():
    # Only initialize if no games exist
    if game_db.Game.query.first() is None:
        games = [
            # Trending Games
            game_db.Game(
                name='Warframe',
                genre='Action RPG',
                price=0.0,
                image_url='static/images/trending-01.jpg',
                description='A free-to-play action role-playing game set in a sci-fi universe.',
                platform='PC, PS5, Xbox Series X/S',
                release_date='2013-03-25',
                publisher='Digital Extremes',
                is_trending=True
            ),
            game_db.Game(
                name='Tower of Fantasy',
                genre='MMORPG',
                price=29.99,
                image_url='static/images/trending-02.jpg',
                description='An anime-inspired open-world MMORPG with deep character customization.',
                platform='PC, Mobile',
                release_date='2022-08-10',
                publisher='Perfect World',
                is_trending=True
            ),
            game_db.Game(
                name='Super People',
                genre='Battle Royale',
                price=19.99,
                image_url='static/images/trending-03.jpg',
                description='A unique battle royale game with super-powered characters.',
                platform='PC',
                release_date='2022-10-11',
                publisher='Wonder People',
                is_trending=True
            ),
            game_db.Game(
                name='Dragon Raja',
                genre='MMORPG',
                price=0.0,
                image_url='static/images/trending-04.jpg',
                description='A stunning mobile MMORPG with next-gen graphics.',
                platform='Mobile',
                release_date='2020-02-27',
                publisher='Archosaur Games',
                is_trending=True
            ),
            
            # Top Games
            game_db.Game(
                name='Warframe Prime',
                genre='Action RPG',
                price=49.99,
                image_url='static/images/top-game-01.jpg',
                description='The premium version of Warframe with exclusive content.',
                platform='PC, PS5, Xbox Series X/S',
                release_date='2023-01-15',
                publisher='Digital Extremes',
                is_top=True
            ),
            game_db.Game(
                name='PUBG: Battlegrounds',
                genre='Battle Royale',
                price=29.99,
                image_url='static/images/top-game-02.jpg',
                description='The original battle royale experience.',
                platform='PC, PS5, Xbox Series X/S',
                release_date='2017-12-20',
                publisher='Krafton',
                is_top=True
            ),
            game_db.Game(
                name='Apex Legends',
                genre='Battle Royale',
                price=0.0,
                image_url='static/images/top-game-03.jpg',
                description='A hero-based battle royale with fast-paced gameplay.',
                platform='PC, PS5, Xbox Series X/S',
                release_date='2019-02-04',
                publisher='Electronic Arts',
                is_top=True
            ),
            game_db.Game(
                name='The Sims 4',
                genre='Life Simulation',
                price=39.99,
                image_url='static/images/top-game-04.jpg',
                description='Create and control people in a virtual world.',
                platform='PC, PS5, Xbox Series X/S',
                release_date='2014-09-02',
                publisher='Electronic Arts',
                is_top=True
            ),
            game_db.Game(
                name='Lost Ark',
                genre='MMORPG',
                price=0.0,
                image_url='static/images/top-game-05.jpg',
                description='An action-packed MMORPG with stunning visuals.',
                platform='PC',
                release_date='2022-02-11',
                publisher='Amazon Games',
                is_top=True
            ),
            game_db.Game(
                name='Destiny 2',
                genre='FPS',
                price=0.0,
                image_url='static/images/top-game-06.jpg',
                description='A shared-world first-person shooter with MMO elements.',
                platform='PC, PS5, Xbox Series X/S',
                release_date='2017-09-06',
                publisher='Bungie',
                is_top=True
            )
        ]
        
        for game in games:
            db.session.add(game)
        db.session.commit()
        print("Games initialized successfully!")

# Create database tables and initialize games
with app.app_context():
    db.create_all()  # Create all database tables
    init_games()     # Initialize games data

# Function to generate top categories chart
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

# Home page
@app.route('/')
def home():
    trending_games = game_db.Game.query.filter_by(is_trending=True).all()
    top_games = game_db.Game.query.filter_by(is_top=True).all()
    return render_template('index.html', trending_games=trending_games, top_games=top_games)

# Register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        if not email or not password:
            return jsonify({"success": False, "message": "Please provide both email and password."})
        
        existing_user = user_db.User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"success": False, "message": "Email already registered."})
        
        new_user = user_db.User(email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        
        session['user_email'] = email
        return jsonify({"success": True, "message": "Registration successful. You are now logged in."})
    
    return render_template('login.html')

# Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        if not email or not password:
            return jsonify({"success": False, "message": "Please provide both email and password."})
        
        user = user_db.User.query.filter_by(email=email).first()
        if not user or user.password != password:
            return jsonify({"success": False, "message": "Invalid email or password."})
        
        session['user_email'] = email
        return jsonify({"success": True, "message": "Login successful."})
    
    return render_template('login.html')

# Auth page
@app.route('/auth', methods=['POST'])
def auth():
    action = request.form.get('action')
    if action == 'register':
        return register()
    elif action == 'login':
        return login()
    return jsonify({"success": False, "message": "Invalid action."})

@app.route('/logout')
def logout():
    session.pop('user_email', None)
    return redirect(url_for('home'))

@app.route('/account')
def account_page():
    if 'user_email' not in session:
        return redirect(url_for('login'))
    return render_template('account.html', email=session['user_email'])

# Contact Us page
@app.route('/contactUs', methods=['GET', 'POST'])
def contact_page():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        # Here you would typically save the message to a database or send an email
        # For now, we'll just redirect back with a success message
        flash('Thank you for your message! We will get back to you soon.', 'success')
        return redirect(url_for('contact_page'))
    return render_template('contactUs.html')

# Our Shop page
@app.route('/ourShop')
def shop_page():
    try:
        # Get sort parameter
        sort_by = request.args.get('sort', 'name')  # Default sort by name
        
        # Query all games
        query = game_db.Game.query
        
        # Apply sorting
        if sort_by == 'price_low':
            query = query.order_by(game_db.Game.price.asc())
        elif sort_by == 'price_high':
            query = query.order_by(game_db.Game.price.desc())
        elif sort_by == 'name':
            query = query.order_by(game_db.Game.name.asc())
        elif sort_by == 'newest':
            query = query.order_by(game_db.Game.release_date.desc())
        
        # Get all games
        games = query.all()
        
        # Get unique genres for filtering
        genres = db.session.query(game_db.Game.genre).distinct().all()
        genres = [g[0] for g in genres]
        
        return render_template('ourShop.html', 
                             games=games,
                             genres=genres,
                             current_sort=sort_by)
    except Exception as e:
        print(f"Store page error: {str(e)}")
        return render_template('ourShop.html', 
                             games=[],
                             genres=[],
                             error=str(e))

@app.route('/ourShop.html')
def shop_page_html():
    return redirect(url_for('shop_page'))

# Search page
@app.route('/search')
def search():
    query = request.args.get('q', '').strip()
    
    # Return empty JSON if no query for API requests
    if not query:
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify([])
        return redirect(url_for('home'))
    
    try:
        # Search in both name and genre, case-insensitive
        search_query = f"%{query}%"
        games = game_db.Game.query.filter(
            or_(
                func.lower(game_db.Game.name).like(func.lower(search_query)),
                func.lower(game_db.Game.genre).like(func.lower(search_query))
            )
        ).all()
        
        # For API requests (AJAX), return JSON
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            results = []
            for game in games:
                results.append({
                    'id': game.id,
                    'name': game.name,
                    'genre': game.genre,
                    'price': game.price,
                    'image_url': game.image_url,
                    'is_trending': game.is_trending,
                    'is_top': game.is_top
                })
            print(f"Search query '{query}' returned {len(results)} results")
            return jsonify(results)
        
        # For regular requests, render the search results page
        return render_template('search_results.html', games=games, query=query)
        
    except Exception as e:
        print(f"Search error: {str(e)}")
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({'error': str(e)}), 500
        return render_template('search_results.html', games=[], query=query, error=str(e))

# Cart functions
def get_cart():
    if 'cart' not in session:
        session['cart'] = []
    return session['cart']

# Add to cart
def add_to_cart(game_id, quantity=1):
    cart = get_cart()
    game = game_db.Game.query.get(game_id)
    if not game:
        return False
    
    # Check if game already in cart
    for item in cart:
        if item['id'] == game_id:
            item['quantity'] += quantity
            session.modified = True
            return True
    
    # Add new item to cart
    cart.append({
        'id': game_id,
        'name': game.name,
        'price': game.price,
        'image_url': game.image_url,
        'quantity': quantity
    })
    session.modified = True
    return True

# Update cart quantity
def update_cart_quantity(game_id, quantity):
    cart = get_cart()
    for item in cart:
        if item['id'] == game_id:
            if quantity > 0:
                item['quantity'] = quantity
            else:
                cart.remove(item)
            session.modified = True
            return True
    return False

def clear_cart():
    session['cart'] = []
    session.modified = True

# Add to cart route
@app.route('/add-to-cart/<int:game_id>')
def add_to_cart_route(game_id):
    if add_to_cart(game_id):
        return jsonify({'success': True, 'message': 'Added to cart'})
    return jsonify({'success': False, 'message': 'Failed to add to cart'})

# Update cart quantity route
@app.route('/update-cart', methods=['POST'])
def update_cart_route():
    game_id = request.form.get('game_id', type=int)
    quantity = request.form.get('quantity', type=int)
    if update_cart_quantity(game_id, quantity):
        return jsonify({'success': True})
    return jsonify({'success': False})

# Cart page route
@app.route('/cart')
def cart_page():
    cart = get_cart()
    total = sum(item['price'] * item['quantity'] for item in cart)
    tax = total * 0.1  # 10% tax
    grand_total = total + tax
    return render_template('cart.html', 
                         cart=cart,
                         total=total,
                         tax=tax,
                         grand_total=grand_total)

# Checkout route
@app.route('/checkout', methods=['POST'])
def checkout():
    if 'user_email' not in session:
        return jsonify({'success': False, 'message': 'Please login first'})
    
    cart = get_cart()
    if not cart:
        return jsonify({'success': False, 'message': 'Cart is empty'})
    
    try:
        # Create new order with unique order number
        order = order_db.Order(
            order_number=generate_order_number(),
            user_email=session['user_email'],
            name=request.form['name'],
            email=request.form['email'],
            phone=request.form['phone'],
            address=request.form['address'],
            items=json.dumps(cart),
            total=float(request.form['total']),
            payment_method=request.form['payment_method'],
            card_number=request.form.get('card_number', '')[-4:] if request.form.get('card_number') else None
        )
        
        db.session.add(order)
        db.session.commit()
        
        # Clear the cart
        clear_cart()
        
        return jsonify({
            'success': True,
            'message': 'Order placed successfully!',
            'order': {
                'number': order.order_number,
                'name': order.name,
                'email': order.email,
                'phone': order.phone,
                'address': order.address,
                'items': json.loads(order.items),
                'total': order.total,
                'payment_method': order.payment_method,
                'created_at': order.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
        })
    
    except Exception as e:
        print(f"Checkout error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to place order. Please try again.'
        })

if __name__ == '__main__':
    app.run(debug=True, port=5001) 