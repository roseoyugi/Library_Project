const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

//adding book to the library

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

//displaying books
function displayBooks() {
    const libraryDiv = document.querySelector("#library");
    libraryDiv.innerHTML = " ";
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-index", index);
        
        const bookInfo = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.read ? "Read" : "Not Read"}</p>
        `;
        bookCard.innerHTML = bookInfo;

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read Status";
        toggleReadButton.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Book";
        removeButton.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });

        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(removeButton);
        libraryDiv.appendChild(bookCard);
    });
}

document.querySelector("#new-book-btn").addEventListener("click", () => {
    const form = document.querySelector("#book-form");
    form.classList.toggle("hidden");
});

document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;
    
    addBookToLibrary(title, author, pages, read);

    // Clear the form and hide it
    document.querySelector("#book-form").reset();
    document.querySelector("#book-form").classList.add("hidden");
});

// Initial display
displayBooks();
