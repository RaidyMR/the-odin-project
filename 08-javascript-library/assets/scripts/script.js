const myLibrary = [
    new Book('The Hobbit', 'J.R.R. Tolkien', 295, false),
    new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 398, true),
];

const form = document.getElementById("book-form");

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${isRead ? 'Read' : 'Not Read'}`;
    }

    this.toggleReadStatus = function() {
        this.isRead = !this.isRead;
    }
}

function createBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isRead = document.querySelector('#is-read').checked;

    return new Book(title, author, pages, isRead);
}

form.onsubmit = function(event) {
    event.preventDefault();
    const book = createBook();
    addBookToLibrary(book);
    render();
    modal.style.display = "none";
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

function render() {
    const bookshelf = document.querySelector('.bookshelf');
    bookshelf.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('card');


        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');

        const cardTitle = document.createElement('div');
        cardTitle.classList.add('title');

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent =`Author: ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages} pages`;

        const readStatus = document.createElement('button');
        readStatus.classList.add(book.isRead ? 'read' : 'not-read');
        readStatus.textContent = book.isRead ? 'Read' : 'Not Read';
        readStatus.addEventListener('click', () => {
            book.toggleReadStatus();
            console.log(myLibrary[index].isRead)
            render();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeBookFromLibrary(index);
            render();
        });

        const infoButton = document.createElement('button');
        infoButton.textContent = 'Info';
        infoButton.addEventListener('click', () => {
            infoModal = document.getElementById("info-modal");
            infoModal.style.display = "block";
            document.getElementById("info-title").textContent = book.title;
            document.getElementById("info-author").textContent = book.author;
            document.getElementById("info-pages").textContent = book.pages;
            document.getElementById("info-read").textContent = book.isRead ? 'Finished' : 'Unfinished';

            document.getElementById("info-close").onclick = function() {
                infoModal.style.display = "none";
            }
        });

        cardTitle.appendChild(title)
        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(removeButton)
        
        cardBody.appendChild(author);
        cardBody.appendChild(pages);

        cardFooter.appendChild(readStatus);
        cardFooter.appendChild(infoButton);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        bookshelf.appendChild(card);
    });
}

render();