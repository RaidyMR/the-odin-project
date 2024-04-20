const projectImage = document.getElementsByClassName('project-image');
const colors = [
    '#b30404', '#a243d5', '#08b28d', '#00a1e6', '#f76f8e', '#f9c74f',
];

for (let i = 0; i < projectImage.length; i++) {
    projectImage[i].style.backgroundColor = colors[i];
}