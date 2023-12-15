from flask import Flask, render_template, session, redirect, request
app = Flask(__name__)

app.secret_key="It's my little secret"


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/process', methods = ['POST'])
def process():
    session['name'] = request.form['name']
    session['location'] = request.form['location']
    session['language'] = request.form['language']
    session['comment'] = request.form['comment']
    # return redirect('/result')
    return render_template("result.html")


# @app.route('/result')
# def result():
#     return render_template("result.html")


if __name__=="__main__":
    app.run(debug=True)