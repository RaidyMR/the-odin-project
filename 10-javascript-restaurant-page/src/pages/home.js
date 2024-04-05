export function generateHomeContent() {
    const welcome = document.createElement("h1");
    welcome.innerText = "Welcome to our restaurant!";

    const greeting = document.createElement("p");
    greeting.innerText = "Welcome to Odin Restaurant, where Nordic traditions meet modern tastes. Our menu blends authentic Nordic dishes with a contemporary twist, all crafted with care using the finest local ingredients. Join us for a warm and inviting dining experience that celebrates the best of Nordic cuisine.";

    const openHours = document.createElement("h2");
    openHours.innerText = "Opening Hours";

    const weekdays = document.createElement("p");
    weekdays.innerText = "Monday - Friday: 11:00 AM - 10:00 PM";

    const weekends = document.createElement("p");
    weekends.innerText = "Saturday - Sunday: 9:00 AM - 11:00 PM";


    const openhoursdiv = document.createElement("div");
    openhoursdiv.classList.add("openHours");
    openhoursdiv.appendChild(openHours);
    openhoursdiv.appendChild(weekdays);
    openhoursdiv.appendChild(weekends);

    const mainContent = document.getElementById("mainContent");
    mainContent.appendChild(welcome);
    mainContent.appendChild(greeting);
    mainContent.appendChild(openhoursdiv);
}