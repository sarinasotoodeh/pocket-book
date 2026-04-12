from collections import defaultdict

from flask import Flask, render_template, request, send_from_directory
import sqlite3

app = Flask(__name__)

DATABASE = "Updated Database/database.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    print("Rendering index.html with student_id=1")
    return render_template("index.html", student_id="1")

@app.route("/map.html")
def map_html():
    return send_from_directory("templates/godot", "map.html")

@app.route("/map.png")
def map_png():
    return send_from_directory("static/godot", "map.png")

@app.route("/map.js")
def map_js():
    return send_from_directory("static/godot", "map.js")

@app.route("/map.wasm")
def map_wasm():
    return send_from_directory("static/godot", "map.wasm")

@app.route("/map.pck")
def map_pck():
    return send_from_directory("static/godot", "map.pck")

@app.route("/map.side.wasm")
def map_side_wasm():
    return send_from_directory("static/godot", "map.side.wasm")

@app.route("/schedules")
def all_schedules():
    print("Fetching all schedules from the database")
    conn = get_db_connection()

    schedules = conn.execute("""
        SELECT c.*, r.building_name, r.room_number, r.room_name
        FROM classes c
        JOIN rooms r ON c.rID = r.rID
        ORDER BY r.building_name, r.room_number, c.day, c.start_time;
    """).fetchall()

    conn.close()

    return render_template("schedules.html", schedules=schedules, mode="all")

@app.route("/my-schedule/<int:student_id>")
def my_schedule(student_id):
    print(f"Fetching schedule for student_id={student_id} from the database")
    conn = get_db_connection()
    # after log in is implemented: student_id = session["student_id"] 

    schedules = conn.execute("""
        SELECT c.*, r.building_name, r.room_number, r.room_name
        FROM classes c
        JOIN rooms r ON c.rID = r.rID
        JOIN student_classes sc ON c.cID = sc.cID
        WHERE sc.sID = ?
        ORDER BY r.building_name, r.room_number, c.day, c.start_time;
    """, (student_id,)).fetchall()

    conn.close()

    return render_template("schedules.html", schedules=schedules, mode="student")

@app.route('/services.html')
def services():
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT rID, name, day, start_time, end_time, price_range
        FROM food_spots
        ORDER BY name, day
    """).fetchall()
    conn.close()

    vendors = defaultdict(list)

    for row in rows:
        vendors[row["name"]].append({
            "day": row["day"],
            "start_time": row["start_time"],
            "end_time": row["end_time"],
            "price_range": row["price_range"]
        })
    vendor_list = []
    for name, hours in vendors.items():
        vendor_list.append({
            "name": name,
            "location_id": name.lower().replace(" ", "-").replace("&", "and"),
            "place_tag": hours[0]["price_range"] if hours else "",
            "hours": hours
        })

    return render_template('services.html', vendors=vendor_list)


app.run()
