export function generateAboutContent() {
    const about = document.createElement("h1");
    about.innerText = "About Us";

    const text1 = document.createElement("p");
    text1.innerText = "Our team of chefs, led by our visionary head chef [Chef's Name], brings a wealth of experience and passion to the kitchen. They work tirelessly to source the finest local ingredients and transform them into culinary masterpieces that delight the senses."

    const text2 = document.createElement("p");
    text2.innerText = "But Odin is more than just a restaurant. It's a place where stories are shared, friendships are forged, and memories are made. Our warm and inviting atmosphere is perfect for intimate dinners, family gatherings, or celebrations with friends."   

    const text3 = document.createElement("p");
    text3.innerText = "Whether you're a seasoned foodie or simply looking for a memorable dining experience, Odin Restaurant welcomes you with open arms. Join us and discover the magic of Nordic cuisine."

    const skål = document.createElement("p");
    skål.innerText = "Skål!";

    
    const mainContent = document.getElementById("mainContent");
    mainContent.appendChild(about);
    mainContent.appendChild(text1);
    mainContent.appendChild(text2);
    mainContent.appendChild(text3);
    mainContent.appendChild(skål);
}