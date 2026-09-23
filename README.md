# Pocket-Book – 3D Campus Navigation App

An interactive 3D campus map and schedule tool for university students.

## Overview

Pocket-Book is a campus navigation web app built for CSCB20. It combines an interactive 3D map of one campus building (modeling every building on campus was out of scope, so the team built one as a demo) with course schedule tools and a food spot directory, backed by a SQL database and served through a Flask backend.

## Features

**3D campus map**
- Interactive 3D model of one campus building (built in Godot, exported to WebAssembly)
- Click on a room to view the courses held there

**Room schedule**
- Displays all class schedules, read from the SQL database
- Available as a table view and a weekly timetable view
- Logged-in users can add a course to their own schedule directly from this view

**My Schedule**
- Same table/weekly timetable views, showing only the logged-in user's own added courses, read from a separate table based on login info

**Food spots**
- Directory of food spots on campus with their availability times, read from the SQL database

**Accounts**
- Sign up, log in, and log out

## Tech stack

- **Backend:** Python (Flask)
- **Database:** SQLite — separate tables for class schedules, personal schedules, and food spot info
- **Frontend:** HTML/CSS/JS, with the 3D map built in Godot and exported to WebAssembly

## How to run

```bash
pip install flask
python run.py
```

Then open `http://127.0.0.1:5000` in your browser.

## Screenshots / demo

*(coming soon)*

## Team

Built by a 5-person team for CSCB20 (Jan – May 2026).

