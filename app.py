from flask import Flask, render_template


app = Flask(__name__)

@app.route("/")
def greeting():
    return "Welcome to my fantastic application!"

@app.route("/hello")
def hello():
    return "Hello world"

@app.route("/to-dolist")
def htmlResponse():
    return render_template("index.html")

app.run(debug=True)