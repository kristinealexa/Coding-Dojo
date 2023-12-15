from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DB
from flask_app.models import model_user
from flask import flash

class Recipe:
    def __init__( self, data:dict ):
        self.id = data['id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

        # add additional columns here
        self.name = data['name']
        self.description = data['description']
        self.instructions = data['instructions']
        self.date_cooked = data['date_cooked']
        self.under_30 = data['under_30']
        self.users_id = data['users_id']

    # Now we use class methods to query our database
    #USE CRUD (UPDATE & DELETE DO NOTHING)

    #CREATE
    @classmethod
    def create(cls, data):
        #TO DO change recipes to the table name & update the columns names and vaules
        query = "INSERT INTO recipes(name,description,instructions,under_30,date_cooked,users_id) VALUES (%(name)s,%(description)s,%(instructions)s,%(under_30)s,%(date_cooked)s,%(users_id)s);"
        id = connectToMySQL(DB).query_db(query,data)
        return id

    #READ   
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM recipes JOIN users ON recipes.users_id = users.id;"
        results = connectToMySQL(DB).query_db(query)

        #shield to protect
        if not results:
            return []

        instance_list = []
        for dict in results:
            recipe_instance = cls(dict)
            users_data = {
                **dict,
                'id': dict['users.id'],
                'created_at': dict['users.created_at'],
                'updated_at': dict['users.updated_at']
            }
            user_instance = model_user.User(users_data)
            recipe_instance.recipe_owner = user_instance
            instance_list.append(recipe_instance)
        return instance_list
# THESE WILL NEED TO JOIN
    @classmethod
    def get_one(cls, data:dict):
        query  = "SELECT * FROM recipes JOIN users ON recipes.users_id = users.id WHERE recipes.id = %(id)s;"
        results = connectToMySQL(DB).query_db(query, data)

        if not results:
            return []

        #convert the 1st item in the list to an instance of the class
        dict = results[0]
        recipe_instance = cls(dict)

        users_data = {
            **dict,
            'id': dict['users.id'],
            'created_at': dict['users.created_at'],
            'updated_at':dict['users.updated_at']
        }
        user_instance = model_user.User(users_data)
        recipe_instance.recipe_owner = user_instance
        return recipe_instance

    #UPDATE
    @classmethod
    def update(cls,data: dict):
        query = "UPDATE recipes SET name=%(name)s,description=%(description)s,instructions=%(instructions)s, date_cooked=%(date_cooked)s, under_30=%(under_30)s WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query,data)

    #DELETE
    @classmethod
    def delete_one(cls, data:dict):
    #THE data DICTIONARY NEEDS A KEY OF 'ID'
        query  = "DELETE FROM recipes WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query, data)
    
    @staticmethod
    def validate(data:dict) -> bool:
        is_valid= True

        if len(data['name']) < 3:
            flash("name is required, must be at least 3 characters.", "err_users_name")
            is_valid = False

        if len(data['description']) < 3:
            flash("description is required, must be at least 3 characters.", "err_users_description")
            is_valid = False

        if len(data['instructions']) < 8:
            flash("instructions is required, must be at least 8 characters.", "err_users_instructions")
            is_valid = False
        if len(data['date_cooked']) < 3:
            flash("date_cooked is required, must be at least 3 characters.", "err_users_date_cooked")
            is_valid = False

        if 'under_30' not in data:
            flash("under 30 is required","err_users_under_30")
            is_valid = False

        return is_valid