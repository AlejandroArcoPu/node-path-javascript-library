// VARIABLES AND DOM ELEMENTS

const myLibrary = [];
let content_dropdown = document.querySelector(".content_dropdown");
let books_content = document.querySelector(".books_content");
let bookDialog = document.querySelector(".book_dialog");
let crossButton = document.querySelector(".cross_button");
let crossButtonCreate = document.querySelector(".cross_button_create");
let bookCreateButton = document.querySelector(".book_create_button");
let bookCreateDialog = document.querySelector(".book_create");
let button_synopsis = document.querySelector(".info_part.synopsis");
let synopsis_info = document.querySelector(".synopsis_info");
let button_drop = document.querySelector(".button_drop");

// CONSTRUCTORS

function Book(front_page, title, author, synopsis, pages, read) {
  this.front_page = front_page;
  this.title = title;
  this.author = author;
  this.synopsis = synopsis;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `The ${this.title} by ${this.author}, ${this.pages} pages, ${
      read ? "read" : "not read yet"
    }`;
  };
}

// LISTENERS

window.onclick = (event) => {
  if (!event.target.matches(".button_drop")) {
    if (content_dropdown.classList.contains("show")) {
      content_dropdown.classList.remove("show");
    }
  }
};

button_synopsis.addEventListener("click", () => {
  if (synopsis_info.style.display === "block") {
    synopsis_info.style.display = "none";
    button_synopsis.querySelector("img").style.transform = "rotate(0deg)";
    return;
  }
  button_synopsis.querySelector("img").style.transform = "rotate(90deg)";
  synopsis_info.style.display = "block";
});

bookCreateButton.addEventListener("click", () => {
  bookCreateDialog.showModal();
});

crossButtonCreate.addEventListener("click", () => {
  bookCreateDialog.close();
});

button_drop.addEventListener("click", () => {
  content_dropdown.classList.toggle("show");
});

// FUNCTIONS

function addBookToLibrary(front_page, title, author, synopsis, pages, read) {
  let newBook = new Book(front_page, title, author, synopsis, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary(
  "https://m.media-amazon.com/images/I/61CIKpN5QjL._SL1200_.jpg",
  "Think and grow rich",
  "Napoleon Hill",
  "This book could be worth a million dollars to you.Andrew Carnegie attributed his great fortune to his discovery of a magic formula for success. Carnegie",
  256,
  true
);
addBookToLibrary(
  "https://m.media-amazon.com/images/I/61CIKpN5QjL._SL1200_.jpg",
  "Test and grow rich",
  "Test Hill",
  "Test Test Test",
  256,
  true
);

function displayBookInPage() {
  myLibrary.forEach((book) => {
    const newArticle = document.createElement("article");
    newArticle.className = "book_article";
    newArticle.id = `${book.title}`;

    newArticle.style = `background-image: url(${book.front_page}); background-size: contain;`;
    books_content.appendChild(newArticle);

    newArticle.addEventListener("click", (event) => {
      //aqui tendriamos que obtener el id al click y
      // hacer el show del dialog con el mismo id
      let calledArticle = event.target;
      console.log(calledArticle);
      console.log(event.currentTarget.parentElement.parentElement.id);

      bookDialog.showModal();
    });

    crossButton.addEventListener("click", (event) => {
      //aqui tendriamos que obtener el id al click y
      // hacer el show del dialog con el mismo id

      bookDialog.close();
    });
  });
}

function createBookDialog(img, title, author, synopsis, pages) {
  const dialog = document.createElement("dialog");
  dialog.className = "books_dialog";
  dialog.id = `${title}`;

  const divFirstLine = document.createElement("div");
  divFirstLine.className = "first_line_info";

  const divInfoContent = document.createElement("div");
  divInfoContent.className = "info_content";
}

displayBookInPage();
