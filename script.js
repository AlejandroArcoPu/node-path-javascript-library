const myLibrary = [];
let content_dropdown = document.querySelector(".content_dropdown");

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

function addBookToLibrary(front_page, title, author, synopsis, pages, read) {
  let newBook = new Book(front_page, title, author, synopsis, pages, read);
  myLibrary.push(newBook);
}

function toggleFunction() {
  content_dropdown.classList.toggle("show");
}

window.onclick = (event) => {
  if (!event.target.matches(".button_drop")) {
    if (content_dropdown.classList.contains("show")) {
      content_dropdown.classList.remove("show");
    }
  }
};
