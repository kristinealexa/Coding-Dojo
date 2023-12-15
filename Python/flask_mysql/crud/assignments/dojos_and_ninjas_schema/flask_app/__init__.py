from flask import Flask
app = Flask(__name__)
app.secret_key = 'secret secret tell no one'


DB = 'dojos_and_ninjas_db'