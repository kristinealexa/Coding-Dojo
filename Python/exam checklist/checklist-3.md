# MY CHECKLIST

# FIRST STEP after getting MYSQL workbench up and running!!
*remember to forward engineer DB && save model*
!!START WITH RUNNING TERMINAL!!
- pipenv install flask PyMySQL, flask-bcrypt
- pipenv shell

*after adding in all boilerplates*
- python3 server.py


# SECOND STEP
*having MVC file structor meaning have folders/files structor down*
*models views and controllers*

 1. ROOT folder aka name of project
    1. Flask_app 🗂️
        1. config 📁
            1. mysqlconnection.py 📄
        2. controllers 📁
            1.controller_name.py 📄
        3. models 📁
            1. name_model.py 📄
        4. static 📁
            1. css 📁
                1. style.css 📄
            2. js 📁
                1.script.js 📄
        5. templates 📁
            1.name.html 📄
    2. __init__.py 📄
2. pipfile 📄
3. pipfile.lock 📄
4. server.py 📄

*make sure boilerplates are added & test to make sure server is working*

## THIRD STEP add in ALL boilerplate codes

## \_\_init__.py
```py
from flask import Flask
from flask_bcrypt import Bcrypt
app = Flask(__name__)
app.secret_key = "it's a secreeeetttttttt"

bcrypt = Bcrypt(app)

DB = " whatever you name it on mysql "
```

# server.py
```py
from flask_app import app
from flask_app.controllers import controller_fileName(s)


if __name__ == "__main__":
    app.run(debug=True)
```

## mysqlconnection
*!!write your own password!!*
```py
# a cursor is the object we use to interact with the database
import pymysql.cursors
# this class will give us an instance of a connection to our database
class MySQLConnection:
    def __init__(self, db):
        # change the user and password as needed
        connection = pymysql.connect(host = 'localhost',
                                    user = 'root', 
                                    password = 'hellokitty', 
                                    db = db,
                                    charset = 'utf8mb4',
                                    cursorclass = pymysql.cursors.DictCursor,
                                    autocommit = False)
        # establish the connection to the database
        self.connection = connection
    # the method to query the database
    def query_db(self, query:str, data:dict=None):
        with self.connection.cursor() as cursor:
            try:
                query = cursor.mogrify(query, data)
                print("Running Query:", query)
     
                cursor.execute(query)
                if query.lower().find("insert") >= 0:
                    # INSERT queries will return the ID NUMBER of the row inserted
                    self.connection.commit()
                    return cursor.lastrowid
                elif query.lower().find("select") >= 0:
                    # SELECT queries will return the data from the database as a LIST OF DICTIONARIES
                    result = cursor.fetchall()
                    return result
                else:
                    # UPDATE and DELETE queries will return nothing
                    self.connection.commit()
            except Exception as e:
                # if the query fails the method will return FALSE
                print("Something went wrong", e)
                return False
            finally:
                # close the connection
                self.connection.close() 
# connectToMySQL receives the database we're using and uses it to create an instance of MySQLConnection
def connectToMySQL(db):
    return MySQLConnection(db)
```

## model.py file for model_vacation.py
```py
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DB

class Vacation:
    def __init__( self, data:dict ):
        self.id = data['id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

        # add additional columns here
        self.location = data['location']
        self.description = data['description']
        self.start_date = data['start_date']
        self.end_date = data['end_date']
        self.is_summer = data['is_summer']
        self.user_id = data['user_id']

    # Now we use class methods to query our database
    #USE CRUD (UPDATE & DELETE DO NOTHING)

    #CREATE
    @classmethod
    def create(cls, data:dict) -> int:
        #TO DO change table_name to the table name & update the columns names and vaules
        query = "INSERT INTO table_name(location,description,start_date,end_date,is_summer,user_id) VALUES (%(location)s,%(description)s,%(start_date)s,%(end_date)s,%(is_summer)s,%(user_id)s);"
        id = connectToMySQL(DB).query_db(query,data)
        return id

    #READ   
    @classmethod
    def get_all(cls):
        #TO DO change table_name to the actual table name
        query = "SELECT * FROM table_name;"
        results = connectToMySQL(DB).query_db(query)

        #shield to protect
        if not results:
            return []

        instance_list = []
        for dict in results:
            instance_list.append( cls(dict) )
        return instance_list

    @classmethod
    def get_one(cls, data:dict):
        #THE data DICTIONARY NEEDS A KEY OF 'ID' ex: user_id
        #TO DO change table_name to the actual table name
        query  = "SELECT * FROM table_name WHERE id = %(id)s;"
        results = connectToMySQL(DB).query_db(query, data)

        if not results:
            return []

        #convert the 1st item in the list to an instance of the class
        dict = results[0]
        instance = cls(dict)
        return instance

    #UPDATE
    @classmethod
    def update(cls,data):
        query = "UPDATE table_name(location,description,start_date,end_date,is_summer,user_id) WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query,data)

    #DELETE
    @classmethod
    def delete_one(cls, data:dict):
    #THE data DICTIONARY NEEDS A KEY OF 'ID'
    #TO DO change table_name to the table name
        query  = "DELETE FROM table_name WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query, data)
 
#table name for this example would be vactions table on mysqlworkbench
```


# model_user.py model file
```py 
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DB, bcrypt
from flask import flash, session
import re # the regex module

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

class User:
    def __init__( self, data:dict ):

        self.id = data['id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

        # add additional columns here
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']

    #CREATE
    @classmethod
    def create(cls, data:dict) -> int:
        query = "INSERT INTO users(first_name,last_name,email,password) VALUES (%(first_name)s,%(last_name)s,%(email)s),%(password)s;"
        id = connectToMySQL(DB).query_db(query,data)
        return id

    #READ   
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM users;"
        results = connectToMySQL(DB).query_db(query)

        #shield to protect
        if not results:
            return []

        instance_list = []
        for dict in results:
            instance_list.append( cls(dict) )
        return instance_list

    @classmethod
    def get_one(cls, data:dict):
        #THE data DICTIONARY NEEDS A KEY OF 'ID' ex: user_id
        query  = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL(DB).query_db(query, data)

        if not results:
            return []

        #convert the 1st item in the list to an instance of the class
        dict = results[0]
        instance = cls(dict)
        return instance
    
    # this is part of the LOGIN where emails need to match
     @classmethod
    def get_one_by_email(cls,data: dict):
         #THE data DICTIONARY NEEDS A KEY OF 'ID' ex: user_id
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL(DB).query_db(query,data)

        if not results:
            return []

        #convert the 1st item in the list to an instance of the class
        dict = results[0]
        instance = cls(dict)
        return instance

    #UPDATE
    @classmethod
    def update(cls,data):
        query = "UPDATE users(first_name,last_name,email,password) WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query,data)

    #DELETE
    @classmethod
    def delete_one(cls, data:dict):
    #THE data DICTIONARY NEEDS A KEY OF 'ID'
    #TO DO change table_name to the table name
        query  = "DELETE FROM users WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query, data)

    #VALIDATIONS
   @staticmethod
    def validate(data: dict): -> bool
        is_valid = True

        if len(data['first_name']) < 3:
            flash("first_name is required, must be at least 3 characters.", "err_users_first_name")
            is_valid = False

        if len(data['last_name']) < 3:
            flash("last_name is required, must be at least 3 characters.", "err_users_last_name")
            is_valid = False

        if len(data['email']) < 8:
            flash("email is required, must be at least 8 characters.", "err_users_email")
            is_valid = False
        elif not EMAIL_REGEX.match(data['email']):
            flash("Invalid email address!","err_users_email")
            is_valid = False
        else:
            potential_user = User.get_one_by_email(data)
            if potential_user:
                flash("Email address already exists!","err_users_email")
                is_valid = False
        if len(data['password']) < 3:
            flash("password is required, must be at least 3 characters.", "err_users_password")
            is_valid = False

        if len(data['confirm_password']) < 8:
            flash("confirm_password is required, must be 3 characters","err_users_confirm_password")
            is_valid = False

        elif data['password'] != data["confirm_password"]:
            flash("Password and Confirm Password do not match", "err_users_confirm_password")
            is_valid = False

        return is_valid

    @staticmethod
    def validate_login(data:dict) -> bool:
        is_valid = True

         if len(data['email']) < 8:
            flash("email is required, must be at least 8 characters.", "err_users_email_login")
            is_valid = False
        elif not EMAIL_REGEX.match(data['email']):
            flash("Invalid email address!","err_users_email_login")
            is_valid = False
        else:
            potential_user = User.get_one_by_email(data)
            if not potential_user:
                flash("Invalid Credentials!","err_users_password_login")
                is_valid = False
        
        if (len(data['password']) < 8):
            flash("password is required, must be at least 8 characters","err_users_password_login")
            is_valid = False
        
        if is_valid:
            if not bcrypt check_password_hash(potential_user.password, data['password']):
                flash("Invalid Credentials!", "err_users_password_login")
                is_valid = False
            else:
                session['uuid'] = potential_user.id
            
        return is_valid
```

## controller.py for vacation
``` py
from flask import render_template, redirect, request, session
from flask_app import app
from flask_app.models.model_vacation import Vacation

# DISPLAY ROUTE shows the form to create a vacation
@app.route('/vacation/new')
def vacation_new():
    return render_template('vacation_new.html')
    

# ACTION ROUTE process the form from the new route (above)
@app.post('/vacation/create')
def vacation_create():
    #TO DO do the logic for creating the row in the database here
    return redirect('/')

#DISPLAY ROUTE just display the vacation info
@app.route('/vacation/<int:id>')
def vacation_show(id):
    #TO DO get the vacation from the database and pass that instance of the game to the HTML page
    return render_template('vactaion_show.html')

#DISPLAY ROUTE display the form to edit the vacation
@app.route('/vacation/<int:id>/edit')
def vacation_edit(id):
    #TO DO in the future make sure that the user is suppose to be able to update the record
    #TO DO get the vacation from the database and pass that instance of the vacation to the HTML page
    return render_template('vacation_edit.html')

#ACTION ROUTE process the form from the edit route
@app.post('/vacation/<int:id>/update')
def vacation_update(id):
    #TO DO in the future make sure that the user is suppose to be able to update the record
    # TO DO call on the delete method from the class to delete the row in the database
    return redirect('/')
```

# controller.py for MAIN ROUTE
``` py 
from flask import render_template, redirect, request, session
from flask_app import app
from flask_app.models.model_vacation import Vacation
from flask_app.models.model_user import User


# DISPLAY ROUTE shows landing page
@app.route('/')
def index():
     if 'uuid' in session:
        return redirect ('/dashboard')
    return redirect("/index.html")
    

# DISPLAY ROUTE shows the form of dashboard
@app.route("/dashboard")
def dashboard():
    if not 'uuid' in session:
        return redirect ('/')
    
    loggedin_user = User.get_one({'id':session['uuid']})
    return render_template("dashboard.html",loggedin_user=loggedin_user)
```

# controller.py for USERS
```py
from flask import render_template, redirect, request, session
from flask_app import app, bcrypt
from flask_app.models.model_user import User

# POST ROUTE shows the form to create a user
@app.post('/users/login/process')
def users_login():
    return redirect('/dashboard')

@app.post('/users/logout')
def users_logout():
    del session['uuid']
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



```
# FORM TEMPLATES for LANDING PAGE
```js

- Login
<div>
    <h2>Login</h2>
    <form action="/users/login/process", method="POST">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email"> 
        {% for message in get_flashed_messages(category_filter=['err_users_email']) %}
        <p class="err-msg">{{message}}</p>
        {% endfor %}
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="text" name="password" id="password">
        {% for message in get_flashed_messages(category_filter=['err_users_password']) %}
        <p class="err-msg">{{message}}</p>
        {% endfor %}
    </div>
        <button>Login</button>
    </form>
</div>

- Register
<div>
    <h2>Register</h2>
    <form action="/users/create" method="POST">
        <div>
        <label for="first_name">First Name:</label>
        <input type="text" name="first_name" id="first_name">
        {% for message in get_flashed_messages(category_filter=['err_users_first_name']) %}
        <p class="err-msg">{{message}}</p>
        {% endfor %}
        </div>
        <div>
        <label for="last_name">Last Name:</label>
        <input type="text" name="last_name" id="last_name">
        {% for message in get_flashed_messages(category_filter=['err_users_last_name']) %}
        <p class="err-msg">{{message}}</p>
        {% endfor %}
        </div>
        <div>
        <label for="email">Email:</label>
        <input type="text" name="email" id="email">
        {% for message in get_flashed_messages(category_filter=['err_users_email']) %}
        <p class="err-msg">{{message}}</p>
        {% endfor %}
        </div>
        <div>
        <label for="password">Password:</label>
        <input type="text" name="password" id="password">
        {% for message in get_flashed_messages(category_filter=['err_users_password']) %}
        <p class="err-msg">{{message}}</p>
        {% endfor %}
        </div>
        <button type="submit">Register</button>
    </form>
</div>

##another way to make a 'button'
<form action="/users/logout" method="POST">
    <button>Logout</button>
</form>
```

# DASHBOARD HTML
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">

    <title>Document</title>
</head>
<body>
#this will link names to the table onto the page and go to the correct user id
    <h1>Hello {{ session['user_data']['first_name'] }}</h1>
    <form action="/users/logout" method="POST">
        <button>LOGOUT</button>
    </form>


    <script src=" {{ url_for('static', filename='js/script.js') }}"></script>
</body>
</html>

```

## Validation FLASH messages on the TEMPLATE html file
```js
{% with messages = get_flashed_messages() %}     <!-- declare a variable called messages -->
    {% if messages %}                            <!-- check if there are any messages -->
        {% for message in messages %}            <!-- loop through the messages -->
            <p>{{message}}</p>                   <!-- display each message in a paragraph tag -->
        {% endfor %}
    {% endif %}
{% endwith %}


from flask import flash
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

```