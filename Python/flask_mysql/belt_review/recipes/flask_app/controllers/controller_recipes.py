from flask import render_template, redirect, request, session
from flask_app import app
from flask_app.models.model_recipe import Recipe

# DISPLAY ROUTE shows the form to create a recipe
@app.route('/recipes/new')
def recipe_new():
    if not 'uuid' in session:
        return redirect ('/')
    return render_template('recipe_new.html')


@app.post('/recipe/create')
def recipe_create():
    is_vaild = Recipe.validate(request.form)
    if not is_vaild:
        return redirect('/recipes/new')
    
    data = {
        **request.form,
        'users_id': session['uuid']
    }

    Recipe.create(data)
    return redirect('/')


@app.route('/recipes/<int:id>')
def recipe_show(id):
    if not 'uuid' in session:
        return redirect ('/')
    
    recipe = Recipe.get_one({'id': id})
    return render_template('show_recipe.html', recipe=recipe)


@app.route('/recipes/<int:id>/edit')
def recipe_edit(id):
    if not 'uuid' in session:
        return redirect ('/')

    recipe = Recipe.get_one({'id': id})
    return render_template('recipe_edit.html', recipe=recipe)


@app.route('/recipes/<int:id>/update',methods=['POST'])
def recipe_update(id):
    if not 'uuid' in session:
        return redirect (f'/recipes/{id}/edit')
    
    is_vaild = Recipe.validate(request.form)

    if not is_vaild:
        return redirect('/')
    data = {
        **request.form,
        "id": id
    }
    Recipe.update(data)
    return redirect('/')


@app.route("/recipes/<int:id>/delete")
def delete_recipe(id):
    Recipe.delete_one({"id": id})
    return redirect("/dashboard")
