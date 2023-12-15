from flask import render_template, redirect, request, session
from flask_app import app
from flask_app.models.model_sightings import Sighting
from flask_app.models.model_users import User


# DISPLAY ROUTE shows landing page
@app.route('/')
def index():
    if 'uuid' in session:
        return redirect ('/dashboard')
    return render_template("login.html")
    

# DISPLAY ROUTE shows the form of dashboard
@app.route("/dashboard")
def dashboard():
    if not 'uuid' in session:
        return redirect ('/')
    all_sightings = Sighting.get_all()
    return render_template("dashboard.html", all_sightings = all_sightings)