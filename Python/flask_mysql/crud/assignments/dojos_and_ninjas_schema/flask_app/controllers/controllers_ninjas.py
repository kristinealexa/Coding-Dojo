from flask import render_template, request, redirect, session
from flask_app import app
from flask_app.models.ninjas_model import Ninjas 
from flask_app.models.dojos_model import Dojo

@app.route('/ninjas')
def new_ninjas():
    all_dojos = Dojo.get_all()
    #print("all dojos ---------------------->", all_dojos[0].id)
    return render_template("ninjas.html", all_dojos = all_dojos)

@app.post('/ninjas/process')
def ninja_process():
    Ninjas.save(request.form)
    return redirect('/dojos')

@app.route("/ninjas/process", methods=["POST"])
def create():
    print("submitted form------------------------>", request.form)
    return redirect("/dojos")
