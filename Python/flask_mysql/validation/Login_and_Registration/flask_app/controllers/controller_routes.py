from flask import render_template, request, redirect, session, flash
from flask_app import app
from flask_app.models.model_user import User
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)


@app.route('/')
def login_page():
    return render_template('login.html')

@app.post('/register/process')
def register_process():
    if not User.validate_user(request.form):
        return redirect('/')
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)
    data = {
        "first_name": request.form['first_name'],
        "last_name": request.form['last_name'],
        "email": request.form['email'],
        "username": request.form['username'],
        "password": pw_hash
    }
    user_id=User.save(data)
    session['user_id'] = user_id
    session['first_name'] = request.form['first_name']
    return redirect("/dashboard")

# @app.post('/register/process')
# def register_process():
#     if not User.validate_user(request.form):
#         return redirect('/')
#     data = {
#         "first_name": request.form['first_name'],
#         "last_name": request.form['last_name'],
#         "email": request.form['email'],
#         "username": request.form['username'],
#         "password": request.form['password']
#     }
#     User.save(data)
#     session['first_name'] = request.form['first_name']
#     return redirect("/dashboard")

@app.post('/login/process')
def login_process():
    data1 = {"email":request.form["login_email"]}
    user_in_db1=User.get_by_email(data1)
    print(user_in_db1.password)
    print(request.form['login_password'])
    if not user_in_db1:
        flash("Invalid Email/Password")
        return redirect("/")
    if not bcrypt.check_password_hash(user_in_db1.password, request.form['login_password']):
        flash("Invalid Email/Password")
        return redirect("/")
    session['user_id'] = user_in_db1.id
    return redirect("/dashboard")

@app.route('/dashboard')
def dashboard_page():
    return render_template("dashboard.html", user=session['first_name'])
