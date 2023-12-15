from flask import Flask
app = Flask(__name__)
app.secret_key = "secret"

DB = 'login_and_registration_db'