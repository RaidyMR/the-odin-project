import './styles/style.css';

import { generateAboutContent } from "./pages/about";
import { generateHomeContent } from "./pages/home";
import { generateMenuContent } from "./pages/menu";

document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("mainContent");
    function switchContent(content) {
        mainContent.innerHTML = '';

        switch (content) {
            case 'home':
                generateHomeContent();
                break;
            case 'menu':
                generateMenuContent();
                break;
            case 'about':
                generateAboutContent();
                break;
            default:
                break;
        }
    }

    document.getElementById("home").addEventListener("click", () => {
        switchContent('home');
    });

    document.getElementById("menu").addEventListener("click", () => {
        switchContent('menu');
    });

    document.getElementById("about").addEventListener("click", () => {
        switchContent('about');
    });

    document.getElementById("home").click();
});