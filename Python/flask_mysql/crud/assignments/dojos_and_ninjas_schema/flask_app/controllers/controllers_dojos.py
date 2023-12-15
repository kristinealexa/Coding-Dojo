from flask import render_template, request, redirect, session
from flask_app import app
from flask_app.models.dojos_model import Dojo

@app.route('/dojos')
def home_dojos():
    all_dojos = Dojo.get_all()
    return render_template("dojos.html", all_dojos = all_dojos)

@app.post('/dojos/process')
def post_dojo():
    Dojo.save_dojo(request.form)
    return redirect('/dojos')

@app.route('/dojos/<int:id>')
def dojos(id):
    data = {
        "id":id
    }
    #call a classmethod that does  one-to-many join to get associated data
    one_dojos_with_ninjas = Dojo.one_to_many(data)
    return render_template('dojowninjas.html', dojo_data = one_dojos_with_ninjas)

#  SELECT * FROM dojos 
# JOIN ninjas ON dojos.id =dojos.ninja_id;