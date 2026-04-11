
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
