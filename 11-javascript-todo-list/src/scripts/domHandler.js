import pencil from '../images/pencil.svg';
import trash from '../images/trash-can.svg';
import pencilOutline from '../images/pencil-outline.svg';
import trashOutline from '../images/trash-can-outline.svg';

import Task from './task.js';
import Project from './project.js';

let projects = [{
    title: 'My Project',
    description: 'Nice and Cozy'
}];

let tasks = [{
    title : 'My Task',
    description : 'Do this task',
    dueDate : '2021-12-31',
    priority : 'low',
    project : 'My Project'
}];

let currentProject = projects[0];

const clonedProjectForm = document.getElementById('project-form').cloneNode(true);
const clonedTaskForm = document.getElementById('task-form').cloneNode(true);

const checkLocalStorage = () => {
    if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
    }

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if (localStorage.getItem('currentProject')) {
        currentProject = JSON.parse(localStorage.getItem('currentProject'));
    }     

    console.log(tasks)
    console.log(projects)
}

const showProjectForm = (type, project = '') => {
    document.getElementById('project-modal').style.display = 'block';
    const projectForm = document.getElementById('project-form');
    projectForm.replaceWith(clonedProjectForm.cloneNode(true));

    if (type === 'create') {
        document.getElementById('project-modal-title').textContent = 'Create Project';
        document.getElementById('submit-project').textContent = 'Create';
    } else if (type === 'edit') {
        document.getElementById('project-modal-title').textContent = 'Edit Project';
        document.getElementById('submit-project').textContent = 'Edit';

        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
    }

    document.getElementById('project-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
    
        if (type === 'create') {
            const project = new Project(title, description);
            projects.push(project);
        } else if (type === 'edit') {
            project.title = title;
            project.description = description;
        }
    
        localStorage.setItem('projects', JSON.stringify(projects));
        document.getElementById('project-modal').style.display = 'none';
        render();
    });
}

const showTaskForm = (type, task = '') => {
    document.getElementById('task-modal').style.display = 'block';
    const taskForm = document.getElementById('task-form');
    taskForm.replaceWith(clonedTaskForm.cloneNode(true));

    if (type === 'create') {
        document.getElementById('task-modal-title').textContent = 'Create Task';
        document.getElementById('submit-task').textContent = 'Create';
    } else if (type === 'edit') {
        document.getElementById('task-modal-title').textContent = 'Edit Task';
        document.getElementById('submit-task').textContent = 'Edit';

        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-due-date').value = task.dueDate;
        document.getElementById('task-priority').value = task.priority;
    }

    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById('task-due-date').value;
        const priority = document.getElementById('task-priority').value;
        const project = currentProject.title;
        const checklist = false;
    
        if (type === 'create') {
            const task = new Task(title, description, dueDate, priority, checklist, project);
            tasks.push(task);
        } else if (type === 'edit') {
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
            task.priority = priority;
        }
    
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('task-modal').style.display = 'none';
        render();
    });
}

const render = () => {   
    document.getElementsByClassName('project-title')[0].textContent = currentProject.title;
    document.getElementsByClassName('project-description')[0].textContent = currentProject.description;

    document.getElementsByClassName('projects')[0].innerHTML = '';
    projects.forEach(project => {
        document.getElementsByClassName('projects')[0].appendChild(showProject(project));
    });

    document.getElementsByClassName('tasks')[0].innerHTML = '';
    tasks.forEach(task => {
        if (task.project === currentProject.title) {
            document.getElementsByClassName('tasks')[0].appendChild(showTask(task));
        }
    });
}

function showProject(project) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.addEventListener('click', () => {
        currentProject = project;
        localStorage.setItem('currentProject', JSON.stringify(currentProject));
        render();
    });

    const title = document.createElement('h5');
    title.textContent = project.title;
    
    titleDiv.appendChild(title);
    
    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add('icons');
    
    const editIcon = document.createElement('img');
    editIcon.src = pencilOutline;
    editIcon.alt = 'edit';
    editIcon.classList.add('edit');
    editIcon.addEventListener('click', () => showProjectForm('edit', project));
    
    const deleteIcon = document.createElement('img');
    deleteIcon.src = trashOutline;
    deleteIcon.alt = 'delete';
    deleteIcon.classList.add('delete');
    deleteIcon.addEventListener('click', () => {
        projects = projects.filter(p => p !== project);
        localStorage.setItem('projects', JSON.stringify(projects));
        if(project === currentProject) {
            if(projects.length > 0) {
                currentProject = projects[0];
                localStorage.setItem('currentProject', JSON.stringify(currentProject));
            } else {
                currentProject = 'none';
                localStorage.setItem('currentProject', JSON.stringify(currentProject));
            }
        }
        render();
    });

    iconsDiv.appendChild(editIcon);
    iconsDiv.appendChild(deleteIcon);

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    if(project.title === currentProject.title) {
        projectDiv.classList.add('active');
        iconsDiv.classList.add('active');
    }
    
    projectDiv.appendChild(titleDiv);
    projectDiv.appendChild(iconsDiv);

    return projectDiv;
}

function showTask(task) {
    const checkDiv = document.createElement('div');
    checkDiv.classList.add('check');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.checklist;
    check.addEventListener('change', () => {
        task.checklist = check.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    checkDiv.appendChild(check);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    
    const title = document.createElement('h5');
    title.textContent = task.title;
    
    titleDiv.appendChild(title);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');

    const date = document.createElement('p');
    date.textContent = task.dueDate;

    dateDiv.appendChild(date);
    
    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add('icons');
    
    const editIcon = document.createElement('img');
    editIcon.src = pencil;
    editIcon.alt = 'edit';
    editIcon.classList.add('edit');
    editIcon.addEventListener('click', () => showTaskForm('edit', task));
    
    const deleteIcon = document.createElement('img');
    deleteIcon.src = trash;
    deleteIcon.alt = 'delete';
    deleteIcon.classList.add('delete');
    deleteIcon.addEventListener('click', () => {
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        render();
    });

    iconsDiv.appendChild(editIcon);
    iconsDiv.appendChild(deleteIcon);

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    switch(task.priority) {
        case 'low':
            taskDiv.classList.add('low');
            break;
        case 'medium':
            taskDiv.classList.add('medium');
            break;
        case 'high':
            taskDiv.classList.add('high');
            break;
    }

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left');

    const rightDiv = document.createElement('div');
    rightDiv.classList.add('right');
    
    leftDiv.appendChild(checkDiv)
    leftDiv.appendChild(titleDiv);
    rightDiv.appendChild(dateDiv);
    rightDiv.appendChild(iconsDiv);

    taskDiv.appendChild(leftDiv);
    taskDiv.appendChild(rightDiv);

    return taskDiv;
}

export { 
    checkLocalStorage,
    showProjectForm,
    showTaskForm,
    render 
};