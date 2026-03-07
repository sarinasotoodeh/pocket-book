from flask import Flask, send_file, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    # return "Home Page"
    return render_template("index.html")

@app.route('/map.html')
def map():
    return render_template('map.html')

@app.route('/schedules.html')
def schedules():
    return render_template('schedules.html')

@app.route('/services.html')
def services():
    return render_template('services.html')


# @app.route("/about")
# def about():
#     # return "About Page"
#     return send_file("index.html", name="sarina")


app.run()