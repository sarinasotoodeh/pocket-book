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

let full_screen_btn = document.getElementById("full-screen-btn")

map_btn.addEventListener("click", show_map)
all_schedules_btn.addEventListener("click", show_all_schedules)
my_schedule_btn.addEventListener("click", show_my_schedule)
services_btn.addEventListener("click", show_services)
full_screen_btn.addEventListener("click", toggle_full_screen)

function toggle_full_screen(){
    const element = document.querySelector("main .content");
    const full_screen_svg = document.getElementById("full-screen-svg")
    const close_svg = document.getElementById("close-full-screen-svg")
    if (!document.fullscreenElement) {
        element.requestFullscreen()
        // change the button to close button
        this.style.bottom = "calc(100% - 40px)"
        this.style.right = "16px"
        full_screen_svg.style.display = "none"
        close_svg.style.display = "inline"
    } else {
        document.exitFullscreen();
        // change the button back to full screen button
        this.style.bottom = "10px"
        this.style.right = "10px"
        full_screen_svg.style.display = "inline"
        close_svg.style.display = "none"
    }
}

function remove_classes() {
    active_btn.classList.remove("active")
    active_container.classList.remove("show")
}

function add_classes() {
    active_btn.classList.add("active")
    active_container.classList.add("show")
}

function show_map() {
    remove_classes()
    active_btn = map_btn
    active_container = map_container
    add_classes()
}

function show_all_schedules(){
    remove_classes()
    active_btn = all_schedules_btn
    active_container = all_schedules_container
    add_classes()
}

function show_my_schedule(){
    remove_classes()
    active_btn = my_schedule_btn
    active_container = my_schedule_container
    add_classes()
}

function show_services() {
    remove_classes()
    active_btn = services_btn
    active_container = services_container
    add_classes()
}

function refresh_schedule() {
	//Refreshes the schedules
	console.log("Refreshing schedule iframes")
	var all = document.getElementById("all_iframe")
	var my = document.getElementById("my_iframe")
	all.attr('src', all.attr('src'));
	my.attr('src', my.attr('src'));
}

