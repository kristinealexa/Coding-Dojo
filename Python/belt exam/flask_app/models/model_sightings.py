from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DB
from flask_app.models import model_users
from flask import flash

class Sighting:
    def __init__( self, data:dict ):
        self.id = data['id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

        # add additional columns here
        self.location = data['location']
        self.date_sighting = data['date_sighting']
        self.number = data['number']
        self.description = data['description']
        self.users_id = data['users_id']


    #CREATE
    @classmethod
    def create(cls, data):
        query = "INSERT INTO sightings(location,date_sighting,number,description,users_id) VALUES (%(location)s,%(date_sighting)s,%(number)s,%(description)s,%(users_id)s);"
        id = connectToMySQL(DB).query_db(query,data)
        return id

    #READ   
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM sightings JOIN users ON sightings.users_id = users.id;"
        results = connectToMySQL(DB).query_db(query)

        #shield to protect
        if not results:
            return []

        instance_list = []
        for dict in results:
            sighting_instance = cls(dict)
            users_data = {
                **dict,
                'id': dict['users.id'],
                'created_at': dict['users.created_at'],
                'updated_at': dict['users.updated_at']
            }
            user_instance = model_users.User(users_data)
            sighting_instance.sighting_owner = user_instance
            instance_list.append(sighting_instance)
        return instance_list
# THESE WILL NEED TO JOIN
    @classmethod
    def get_one(cls, data:dict):
        query  = "SELECT * FROM sightings JOIN users ON sightings.users_id = users.id WHERE sightings.id = %(id)s;"
        results = connectToMySQL(DB).query_db(query, data)

        if not results:
            return []

        #convert the 1st item in the list to an instance of the class
        dict = results[0]
        sighting_instance = cls(dict)

        users_data = {
            **dict,
            'id': dict['users.id'],
            'created_at': dict['users.created_at'],
            'updated_at':dict['users.updated_at']
        }
        user_instance = model_users.User(users_data)
        sighting_instance.sighting_owner = user_instance
        return sighting_instance

    #UPDATE
    @classmethod
    def update(cls,data: dict):
        query = "UPDATE sightings SET location=%(location)s,date_sighting=%(date_sighting)s,number=%(number)s, description=%(description)s WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query,data)

    #DELETE
    @classmethod
    def delete_one(cls, data:dict):
        query  = "DELETE FROM sightings WHERE id = %(id)s;"
        return connectToMySQL(DB).query_db(query, data)
    
    @staticmethod
    def validate(data:dict) -> bool:
        is_valid= True

        if len(data['location']) < 3:
            flash("location is required, must be at least 3 characters.", "err_sightings_location")
            is_valid = False
        if len(data['date_sighting']) < 3:
            flash("date_sighting is required", "err_sightings_date_sighting")
            is_valid = False
        if int(data['number']) < 1:
            flash("number is required ", "err_sightings_number")
            is_valid = False
        if len(data['description']) < 3:
            flash("description is required, must be at least 3 characters.", "err_sightings_description")
            is_valid = False

        return is_valid