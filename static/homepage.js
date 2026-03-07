let map_btn = document.getElementById("map-btn")
let all_schedules_btn = document.getElementById("all-schedules-btn")
let my_schedule_btn = document.getElementById("my-schedule-btn")
let services_btn = document.getElementById("services-btn")

let map_container = document.getElementById("map-container")
let all_schedules_container = document.getElementById("all-schedules-container")
let my_schedule_container = document.getElementById("my-schedule-container")
let services_container = document.getElementById("services-container")


let active_btn = map_btn
let active_container = map_container

map_btn.addEventListener("click", show_map)
all_schedules_btn.addEventListener("click", show_all_schedules)
my_schedule_btn.addEventListener("click", show_my_schedule)
services_btn.addEventListener("click", show_services)

function remove_classes() {
    active_btn.classList.remove("active")
    active_container.classList.remove("show")
}

function add_classes() {
    active_btn.classList.add("active")
    active_container.classList.add("show")
}

function load_page(page, container) {
    fetch(page)
    .then(response => response.text())
    .then(html => {
        container.innerHTML = html;
    })
}

function show_map() {
    remove_classes()
    active_btn = map_btn
    active_container = map_container
    load_page("map.html", map_container)
    add_classes()
}

function show_all_schedules(){
    remove_classes()
    active_btn = all_schedules_btn
    active_container = all_schedules_container
    load_page("schedules.html", all_schedules_container)
    add_classes()
}

function show_my_schedule(){
    remove_classes()
    active_btn = my_schedule_btn
    active_container = my_schedule_container
    load_page("schedules.html", my_schedule_container)
    add_classes()
}

function show_services() {
    remove_classes()
    active_btn = services_btn
    active_container = services_container
    load_page("services.html", services_container)
    add_classes()
}