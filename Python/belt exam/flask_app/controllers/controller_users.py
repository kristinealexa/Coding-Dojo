from flask import render_template, redirect, request, session
from flask_app import app, bcrypt
from flask import flash
from flask_app.models.model_users import User

# POST ROUTE shows the form to create a user
@app.post('/users/login/process')
def users_login():
    if not User.validate_login(request.form):
        return redirect('/')
    
    return redirect('/dashboard')

@app.post('/users/logout')
def users_logout():
    del session['uuid']
    del session['user_data']
    return redirect('/')

# POST ROUTE process the form from the new route (above)
@app.post('/users/create')
def users_create():
    #TO DO do the logic for creating the row in the database here
    #validate
    is_valid = User.validate(request.form)
    if not is_valid:
        return redirect('/')
    #set up hash
    hash_pw = bcrypt.generate_password_hash(request.form['password'])
    data = {
        **request.form,
        'password': hash_pw
    }
    #create user
    id = User.create(data)

    #store id into session
    session['uuid'] = id
    session['user_data'] = {
        'first_name': data['first_name'],
        'last_name': data['last_name'],
        'email': data['email']
    }
    return redirect('/dashboard')


#DISPLAY ROUTE just display the user info
@app.route('/users/<int:id>')
def users_show(id):
    #TO DO get the user from the database and pass that instance of the game to the HTML page
    return render_template('users_show.html')

#DISPLAY ROUTE display the form to edit the user
@app.route('/users/<int:id>/edit')
def users_edit(id):
    #TO DO in the future make sure that the user is suppose to be able to update the record
    #TO DO get the user from the database and pass that instance of the user to the HTML page
    return render_template('users_edit.html')

#ACTION ROUTE process the form from the edit route
@app.post('/users/<int:id>/update')
def users_update(id):
    #TO DO in the future make sure that the user is suppose to be able to update the record
    # TO DO call on the delete method from the class to delete the row in the database
    return redirect('/')



# DISPLAY ROUTE shows the form of reg
@app.route("/register/user", methods=['POST'])
def register():
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)
    data = {
        "email": request.form['email'],
        "password" : pw_hash
    }
    user_id = User.save(data)
    # session['user_id'] = user_id
    session['user_id'] = request.form['first_name']
    return redirect("/dashboard")

# DISPLAY ROUTE shows the form of login
@app.route('/login', methods=['POST'])
def login():
    # see if the username provided exists in the database
    data = { "email" : request.form["email"] }
    user_in_db = User.get_by_email(data)
    # user is not registered in the db
    if not user_in_db:
        flash("Invalid email/Password")
        return redirect("/")
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        # if we get False after checking the password
        flash("Invalid email/Password")
        return redirect('/')
    # if the passwords matched, we set the user_id into session
    session['user_id'] = user_in_db.id
    # never render on a post!!!
    return redirect("/dashboard")