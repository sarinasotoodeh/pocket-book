from flask import Flask, send_file, render_template, request, send_from_directory

app = Flask(__name__)

@app.route("/")
def home():
    # return "Home Page"
    return render_template("test.html")

@app.route("/map.html")
def map_html():
    return send_from_directory("templates/godot", "map.html")

@app.route("/map.png")
def map_png():
    return send_from_directory("static/godot", "map.png")

@app.route("/map.js")
def map_js():
    return send_from_directory("static/godot", "map.js")

@app.route("/godot/map.wasm")
def map_wasm():
    return send_from_directory("static/godot", "map.wasm")

@app.route("/godot/map.pck")
def map_pck():
    return send_from_directory("static/godot", "map.pck")

@app.route('/schedules.html')
def schedules():
    return render_template('schedules.html')

@app.route('/services.html')
def services():
    return render_template('services.html')


# @app.route("/about")
# def about():
#     # return "About Page"
#     return send_file("index.html", name="")


app.run()