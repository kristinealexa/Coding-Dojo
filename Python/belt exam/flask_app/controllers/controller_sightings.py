from flask import render_template, redirect, request, session
from flask_app import app
from flask_app.models.model_sightings import Sighting

# DISPLAY ROUTE shows the form to create a sighting
@app.route('/sightings/new')
def sighting_new():
    if not 'uuid' in session:
        return redirect ('/')
    return render_template('sighting_new.html')


@app.post('/sightings/create')
def sighting_create():
    is_vaild = Sighting.validate(request.form)
    if not is_vaild:
        return redirect('/sightings/new')
    
    data = {
        **request.form,
        'users_id': session['uuid']
    }
    print(data)
    Sighting.create(data)
    return redirect('/')


@app.route('/sightings/<int:id>')
def sighting_show(id):
    if not 'uuid' in session:
        return redirect ('/')
    
    sighting = Sighting.get_one({'id': id})
    return render_template('sighting_show.html', sighting=sighting)


@app.route('/sightings/<int:id>/edit')
def sighting_edit(id):
    if not 'uuid' in session:
        return redirect ('/')
    
    sighting = Sighting.get_one({'id': id})
    return render_template('sighting_edit.html', sighting=sighting)


@app.route('/sightings/<int:id>/update',methods=['POST'])
def sighting_update(id):
    if not 'uuid' in session:
        return redirect (f'/sightings/{id}/edit')
    
    is_valid = Sighting.validate(request.form)

    if not is_valid:
        return redirect(f'/sightings/{id}/edit')
    data = {
        **request.form,
        "id": id
    }
    Sighting.update(data)
    return redirect('/')


@app.route("/sightings/<int:id>/delete")
def delete_sighting(id):
    Sighting.delete_one({"id": id})
    return redirect("/dashboard")
