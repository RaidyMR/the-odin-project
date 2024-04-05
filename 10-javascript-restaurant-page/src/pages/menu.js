import menu1 from '../images/3678022977_a878cff56c_k.jpg';
import menu2 from '../images/3678835600_026fd2e1eb_k.jpg';
import menu3 from '../images/3678836770_ed1ea83ffa_k.jpg';
import menu4 from '../images/3678019717_b98dbbd049_k.jpg';

export function generateMenuContent() {
    const menus = [
        {
            name: "Fried bacon with ramsons and grilled cucumber",
            image: menu1,
            source: "https://www.flickr.com/photos/23178876@N03/3678022977/"
        },
        {
            name: "White asparagus with poached egg yolk and woodruff sauce",
            image: menu3,
            source: "https://www.flickr.com/photos/23178876@N03/3678836770/"
        },
        {
            name: "Raw razor shell with parsley jelly",
            image: menu2,
            source: "https://www.flickr.com/photos/23178876@N03/3678835600/"
        },
        {
            name: "Toast with turbot roe and vinegar dust",
            image: menu4,
            source: "https://www.flickr.com/photos/23178876@N03/3678836770/"
        }
    ];

    const ourMenu = document.createElement("h1");
    ourMenu.innerText = "Our Menu";

    const menusContainer = document.createElement("div");
    menusContainer.classList.add("menusContainer");

    menus.forEach(menu => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menuItem");

        const name = document.createElement("h2");
        name.innerText = menu.name;
        menuItem.appendChild(name);

        const img = new Image();
        img.src = menu.image;
        img.alt = menu.name;
        menuItem.appendChild(img);

        const source = document.createElement("p");
        source.innerText = "Picture from ";
        const sourceLink = document.createElement("a");
        sourceLink.href = menu.source;
        sourceLink.innerText = "Flickr";
        source.appendChild(sourceLink);
        menuItem.appendChild(source);

        menusContainer.appendChild(menuItem);
    });

    const mainContent = document.getElementById("mainContent");
    mainContent.appendChild(ourMenu);
    mainContent.appendChild(menusContainer);
}