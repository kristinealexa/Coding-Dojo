from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DB
from flask_app import bcrypt
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
        query = "INSERT INTO users(first_name,last_name,email,password) VALUES (%(first_name)s,%(last_name)s,%(email)s,%(password)s);"
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
        results = connectToMySQL(DB).query_db(query,data)

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
        query  = "DELETE FROM users WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query, data)

    #VALIDATIONS
    @staticmethod
    def validate(data):
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

        if len(data['confirm_password']) < 3:
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
            if not bcrypt.check_password_hash(potential_user.password, data['password']):
                flash("Invalid Credentials!", "err_users_password_login")
                is_valid = False
            else:
                session['uuid'] = potential_user.id
                session['user_data'] = {
                    'first_name': potential_user.first_name,
                    'last_name': potential_user.last_name,
                    'email': potential_user.email
                }

        return is_valid