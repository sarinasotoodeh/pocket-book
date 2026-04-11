renderWeeklySchedule(window.schedulesData);
document.addEventListener("DOMContentLoaded", () => {
    const tableViewBtn = document.getElementById("table-view-btn");
    const weeklyViewBtn = document.getElementById("weekly-view-btn");
    const tableView = document.getElementById("table-view");
    const weeklyView = document.getElementById("weekly-view");
    const weeklySchedule = document.getElementById("weekly-schedule");

    tableViewBtn.addEventListener("click", () => {
        tableView.style.display = "block";
        weeklyView.style.display = "none";
        tableViewBtn.classList.add("active");
        weeklyViewBtn.classList.remove("active");
    });

    weeklyViewBtn.addEventListener("click", () => {
        tableView.style.display = "none";
        weeklyView.style.display = "block";
        weeklyViewBtn.classList.add("active");
        tableViewBtn.classList.remove("active");
    });

    renderWeeklySchedule(schedules);

    function renderWeeklySchedule(classes) {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const startHour = 8;
        const endHour = 21;
        const hourHeight = 60; // 60px per hour

        weeklySchedule.innerHTML = "";

        // Main grid
        const grid = document.createElement("div");
        grid.className = "weekly-grid";

        // Top-left empty corner
        const corner = document.createElement("div");
        corner.className = "grid-header corner";
        grid.appendChild(corner);

        // Day headers
        days.forEach(day => {
            const header = document.createElement("div");
            header.className = "grid-header";
            header.textContent = day;
            grid.appendChild(header);
        });

        // Time labels + empty columns
        for (let hour = startHour; hour < endHour; hour++) {
            const timeCell = document.createElement("div");
            timeCell.className = "time-cell";
            timeCell.textContent = formatHour(hour);
            grid.appendChild(timeCell);

            for (let d = 0; d < days.length; d++) {
                const slot = document.createElement("div");
                slot.className = "grid-cell";
                grid.appendChild(slot);
            }
        }

        weeklySchedule.appendChild(grid);

        // Overlay for class blocks
        const overlay = document.createElement("div");
        overlay.className = "class-overlay";
        weeklySchedule.appendChild(overlay);

        classes.forEach(cls => {
            const dayIndex = days.indexOf(normalizeDay(cls.day));
            if (dayIndex === -1) return;

            const startMinutes = timeToMinutes(cls.start_time);
            const endMinutes = timeToMinutes(cls.end_time);

            const top = ((startMinutes - startHour * 60) / 60) * hourHeight;
            const height = ((endMinutes - startMinutes) / 60) * hourHeight;

            const block = document.createElement("div");
            block.className = "class-block";

            // left position:
            // 1 time column + dayIndex day columns
            block.style.top = `${top + 40}px`;
            block.style.left = `calc(${(dayIndex + 1) * (100 / 6)}% + 4px)`;
            block.style.width = `calc(${100 / 6}% - 8px)`;
            block.style.height = `${height - 4}px`;

            block.innerHTML = `
                <strong>${cls.dept}${cls.code}</strong><br>
                ${cls.section}<br>
                ${cls.building_name}<br>
                ${formatTime(cls.start_time)} - ${formatTime(cls.end_time)}
            `;

            overlay.appendChild(block);
        });
    }

    function normalizeDay(day) {
        const map = {
            "Mon": "Monday",
            "Tue": "Tuesday",
            "Wed": "Wednesday",
            "Thu": "Thursday",
            "Fri": "Friday",
            "Monday": "Monday",
            "Tuesday": "Tuesday",
            "Wednesday": "Wednesday",
            "Thursday": "Thursday",
            "Friday": "Friday"
        };
        return map[day] || day;
    }

    function timeToMinutes(timeStr) {
        const parts = timeStr.split(":");
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        return hours * 60 + minutes;
    }

    function formatHour(hour) {
        const suffix = hour >= 12 ? "PM" : "AM";
        const display = hour % 12 === 0 ? 12 : hour % 12;
        return `${display}:00 ${suffix}`;
    }

    function formatTime(timeStr) {
        const [h, m] = timeStr.split(":");
        const hour = parseInt(h, 10);
        const suffix = hour >= 12 ? "PM" : "AM";
        const display = hour % 12 === 0 ? 12 : hour % 12;
        return `${display}:${m} ${suffix}`;
    }
});
document.getElementById('table-view-btn').addEventListener('click', () => {
    document.getElementById('table-view').style.display = 'block';
    document.getElementById('weekly-view').style.display = 'none';
    document.getElementById('table-view-btn').classList.add('active');
    document.getElementById('weekly-view-btn').classList.remove('active');
});

document.getElementById('weekly-view-btn').addEventListener('click', () => {
    document.getElementById('table-view').style.display = 'none';
    document.getElementById('weekly-view').style.display = 'block';
    document.getElementById('table-view-btn').classList.remove('active');
    document.getElementById('weekly-view-btn').classList.add('active');
    renderWeeklyView();
});
