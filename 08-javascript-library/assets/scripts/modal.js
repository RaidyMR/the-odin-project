// Get the modal
const modal = document.getElementById("form-modal");
const button = document.getElementById("form-button");
const span = document.getElementsByClassName("close")[0];

button.onclick = function() {
    console.log("test")
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

