from flask import Flask
from flask_bcrypt import Bcrypt
app = Flask(__name__)
app.secret_key = "it's a secreeeetttttttt"

bcrypt = Bcrypt(app)

DB = "recipes_db"