from flask import Flask, render_template
app = Flask(__name__)

@app.route('/play')
def index():
    return render_template('index.html', num= 3, background = 'lightblue')

@app.route('/play/<num>')
def num(num):
    return render_template('index.html', num= int(num), background = 'lightblue')

@app.route('/play/<num>/<color>')
def color(num, color):
    return render_template('index.html', num= int(num),  background = color)


if __name__=="__main__":
    app.run(debug=True)