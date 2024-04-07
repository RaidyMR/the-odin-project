import './styles/style.css';
import './styles/modal.css';

import { 
    checkLocalStorage,
    showProjectForm,
    showTaskForm,
    render
} from './scripts/domHandler';

document.addEventListener('DOMContentLoaded', () => {
    checkLocalStorage();

    document.getElementById('add-task').addEventListener('click', () => {
        showTaskForm('create');
    });
    
    document.getElementById('close-task').addEventListener('click', () => {
        document.getElementById('task-modal').style.display = 'none';
    });
    
    document.getElementById('add-project').addEventListener('click', () => {
        showProjectForm('create');
    });
    
    document.getElementById('close-project').addEventListener('click', () => {
        document.getElementById('project-modal').style.display = 'none';
    });

    render();
});