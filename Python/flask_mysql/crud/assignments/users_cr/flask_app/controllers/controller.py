from flask import render_template, request, redirect, session
from flask_app import app
from  flask_app. models.user_model import User


#  follow CRUD - CREATE,READ,UPDATE & DELETE

# Home
@app.route('/read')
def index():
    all_users = User.get_all()
    return render_template("read.html", all_users = all_users)

# Process
@app.post('/process')
def process():
    User.save(request.form)
    return redirect("/read")

# Create
@app.route('/create')
def create():
    return render_template("create.html")

# Show
@app.route('/read/show/<int:user_id>')
def show(user_id):
    user=User.get_one(user_id)
    return render_template("show_user.html",user=user)

# Update
@app.route('/update_form/<int:user_id>')
def update_form(user_id):
    user=User.get_one(user_id)
    return render_template("update.html", user=user)

# Update
@app.route('/update',methods=['POST'])
def update():
    User.update(request.form)
    return redirect('/read')

# Delete
@app.route('/read/delete/<int:read_id>')
def read(read_id):
    User.delete(read_id)
    return redirect('/read')