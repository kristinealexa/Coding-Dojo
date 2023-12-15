from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.__init__ import DB
from flask_app.models.ninjas_model import Ninjas

class Dojo:
    def __init__(self ,data ):
        self.id = data['id']
        self.name = data['name']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.my_ninjas = []

    @classmethod
    def get_all(cls):
        query = """SELECT * FROM dojos;"""
        results = connectToMySQL(DB).query_db(query)
        #print("--------------------->", results)
        dojos = []
        for dojo in results:
            dojos.append(cls(dojo))
        return dojos
    
    @classmethod
    def get_one(cls):
        query = """SELECT * FROM dojos WHERE id = %(id)s;"""


    @classmethod
    def get_one(cls, ninjas_id):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        data = {"id": ninjas_id}
        results = connectToMySQL(DB).query_db(query, data)
        return cls(results[0])

    @classmethod
    def save_dojo(cls, data):
        query = """INSERT into dojos(name) 
        VALUES(%(name)s);"""
        id = connectToMySQL(DB).query_db(query,data)
        return id

    @classmethod 
    def one_to_many(cls, data):
        query = """ SELECT * from dojos left join ninjas on ninjas.dojos_id = dojos.id WHERE dojos.id = %(id)s;"""
        results = connectToMySQL(DB).query_db(query,data)
        # good to print result to see what your are getting back from database
        # print("------------>",results)
        dojo_object = cls(results[0])
        for row in results:
            ninja_data = {
                'id': row['ninjas.id'],
                'first_name': row['first_name'],
                'last_name': row['last_name'],
                'age': row['age'],
                'created_at' : row['ninjas.created_at'],
                'updated_at' : row['ninjas.updated_at']
            }
            dojo_object.my_ninjas.append(Ninjas(ninja_data))
        return dojo_object

