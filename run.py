from flask import Flask, render_template, request, send_from_directory, make_response
import sqlite3
from collections import defaultdict

app = Flask(__name__)

DATABASE = "Updated Database/database.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/")
def home():
    sID = request.cookies.get('student_id')
    if sID:
        print(f"Loading index with sID: {sID}")
        return render_template("index.html", student_number = sID)
    else:
        # sID = -1 represents not logged in
        print(f"Loading index with sID: -1 so no user :) hehe")
        return render_template("index.html", student_number = -1)

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
    sID = request.cookies.get("student_id")
    if not sID:
        sID = -1

    schedules = conn.execute("""
        SELECT c.*, r.building_name, r.room_number, r.room_name, 
            CASE 
                WHEN s.sID IS NOT NULL THEN 1
                ELSE 0
            END AS has_class
        FROM classes c
        JOIN rooms r ON c.rID = r.rID
        LEFT JOIN student_classes s ON s.cID = c.cID AND s.sID = ?
        ORDER BY r.building_name, r.room_number, c.day, c.start_time;
    """, (sID,)).fetchall()

    conn.close()

    return render_template("schedules.html", schedules=schedules, mode="all")

def has_schedule(sID:int, cID:int)->bool:
    conn = get_db_connection()
    curr = conn.cursor()

    has = curr.execute("""
                       SELECT * FROM student_classes
                       WHERE sID = ? AND cID = ?;
                       """, (sID, cID)).fetchone()
    print(has)
    conn.close()
    return has is not None
    
@app.route('/add_schedule/<int:cID>', methods=["GET"])
def add_schedule(cID:int):
    sID = request.cookies.get('student_id')
    print(f"adding {sID} {cID}")
    if not sID:
        print("Not logged in error")
        return "not logged in"
    if has_schedule(sID, cID):
        print("Already added course error")
        return "eror"
    conn = get_db_connection()
    curr = conn.cursor()
    curr.execute("""
                INSERT INTO student_classes (sID, cID)
                VALUES (?, ?);
                """, (sID, cID))
    curr.close()
    conn.commit()
    conn.close()
    return make_response("success")

@app.route('/remove_schedule/<int:cID>', methods=["GET"])
def remove_schedule(cID:int):
    sID = request.cookies.get('student_id')
    print(f"removing {sID} {cID}")
    if not sID:
        return
    if not has_schedule(sID, cID):
        return
    conn = get_db_connection()
    curr = conn.cursor()
    curr.execute("""
                DELETE FROM student_classes
                WHERE sID = ? AND cID = ?;
                """, (sID, cID))
    curr.close()
    conn.commit()
    conn.close()
    return make_response("success")

@app.route("/my-schedule")
def my_schedule():
    student_id = request.cookies.get('student_id')
    if student_id:
        print(f"Fetching schedule for student_id={student_id} from the database")
    else:
        print("Not logged in yet")

    conn = get_db_connection()
    # after log in is implemented: student_id = session["student_id"] 

    schedules = conn.execute("""
        SELECT c.*, r.building_name, r.room_number, r.room_name, 1 as has_class
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

# Login + Register + Add schedule (Tuna + Rhianna)



@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # 1. Grab EVERY field required by your schema
        username = request.form.get('username')
        password = request.form.get('password')
        fullname = request.form.get('fullname')
        email = request.form.get('email')
        student_num = request.form.get('student_number')
        
        conn = get_db_connection()
        
        # 2. Check if user already exists
        user = conn.execute("SELECT * FROM students WHERE username = ?", (username,)).fetchone()
        if user:
            conn.close()
            return "exists"
        
        try:
            # 3. Insert matching your specific column names
            cursor = conn.cursor()
            cursor.execute('''
                SELECT MAX(sID) as num FROM students;
                           ''')
            new_sID = cursor.fetchone()['num'] + 1
            print(new_sID)
            cursor.execute('''
                INSERT INTO students (sID, student_number, full_name, email, username, password) 
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (new_sID, student_num, fullname, email, username, password))
            
            new_id = cursor.lastrowid 
            conn.commit()
            
            resp = make_response("success")
            resp.set_cookie('isLoggedIn', 'true')
            resp.set_cookie('user', username)
            resp.set_cookie('student_id', str(new_id))
            return resp
            
        except sqlite3.Error as e:
            print(f"Database error: {e}")
            return "error"
        finally:
            conn.close()

    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        conn = get_db_connection()
        # Matches your 'username' column
        user = conn.execute('SELECT * FROM students WHERE username = ? AND password = ?', 
                            (username, password)).fetchone()
        conn.close()
        
        if user:
            print(user['sID'])
            print("USER ID: " + str(user['sID']))
            resp = make_response("success")
            resp.set_cookie('isLoggedIn', 'true', max_age=10000)
            resp.set_cookie('user', username, max_age=10000)
            resp.set_cookie('student_id', str(user['sID']), max_age=10000) 
            return resp
        
        return "invalid"
    return render_template('login.html')

if __name__ == "__main__":
    app.run(debug=True)
