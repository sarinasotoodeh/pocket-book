from flask import Flask, render_template, request, send_from_directory
import sqlite3

app = Flask(__name__)

DATABASE = "database.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return render_template("index.html")

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

@app.route("/schedules")
def all_schedules():
    conn = get_db_connection()

    schedules = conn.execute("""
        SELECT * FROM classes
        ORDER BY building_name, room_number, day_of_week, start_time
    """).fetchall()

    conn.close()

    return render_template("schedules.html", schedules=schedules, mode="all")

@app.route("/my-schedule/<int:student_id>")
def my_schedule(student_id):
    conn = get_db_connection()
    # after log in is implemented: student_id = session["student_id"] 
    schedules = conn.execute("""
        SELECT c.*
        FROM student_classes sc
        JOIN classes c ON sc.class_id = c.class_id
        WHERE sc.student_id = ?
        ORDER BY day_of_week, start_time
    """, (student_id,)).fetchall()

    conn.close()

    return render_template("schedules.html", schedules=schedules, mode="student")

@app.route('/services.html')
def services():
    return render_template('services.html')


app.run()
