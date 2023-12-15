from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DB
from flask import flash, session
import re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

class User:
    def __init__( self , data):

        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']


    @classmethod
    def get_all(cls):
        query = "SELECT * FROM users;"
        results = connectToMySQL(DB).query_db(query)

        instance_list = []
        for dict in results:
            instance_list.append( cls(dict) )
        return instance_list
    
    @classmethod
    def get_one(cls, id):
        query  = "SELECT * FROM users WHERE id = %(id)s;"
        data = {'id':id}
        results = connectToMySQL(DB).query_db(query, data)
        return cls(results[0])
    
    @classmethod
    def get_email(cls, data):
        query= "SELECT * from users where email = %(email)s;"
        result=connectToMySQL(DB).query_db(query, data)
        if len(result)<1:
            return False
        return cls(result[0])


    @classmethod
    def save(cls, data):
        query = "INSERT INTO users (first_name,last_name,email,password)  VALUES(%(first_name)s,%(last_name)s,%(email)s,%(password)s);"
        result = connectToMySQL(DB).query_db(query,data)
        return result
    

    @staticmethod
    def validate_user(user):
        is_valid = True 

        if len(user['first_name']) < 2:
            flash("first_name is required","err_users_first_name")
            is_valid = False

        if len(user['last_name']) < 2:
            flash("last_name is required","err_users_last_name")
            is_valid = False

        if len(user['email']) < 7:
            flash("email is required","err_users_email")
            is_valid = False
        elif not EMAIL_REGEX.match(user['email']): 
            flash("Invalid email address!", "err_users_email")
            is_valid = False
        
        if len(user['password']) < 8:
            flash("password is required","err_users_password")
            is_valid = False
        return is_valid