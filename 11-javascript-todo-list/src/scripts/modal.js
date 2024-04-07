document.getElementById('add-task').addEventListener('click', () => {
    document.getElementById('task-modal').style.display = 'block';
});

document.getElementById('close-task').addEventListener('click', () => {
    document.getElementById('task-modal').style.display = 'none';
});

document.getElementById('add-project').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'block';
});

document.getElementById('close-project').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'none';
});
