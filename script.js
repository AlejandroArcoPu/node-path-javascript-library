const myLibrary = [];
let content_dropdown = document.querySelector(".content_dropdown");
let books_content = document.querySelector(".books_content");
let main = document.querySelector(".books_content");

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

function toggleFunction(event) {
  content_dropdown.classList.toggle("show");
}

window.onclick = (event) => {
  if (!event.target.matches(".button_drop")) {
    if (content_dropdown.classList.contains("show")) {
      content_dropdown.classList.remove("show");
    }
  }
};

addBookToLibrary(
  "https://m.media-amazon.com/images/I/61CIKpN5QjL._SL1200_.jpg",
  "Think and grow rich",
  "Napoleon Hill",
  "This book could be worth a million dollars to you.Andrew Carnegie attributed his great fortune to his discovery of a magic formula for success. Carnegie",
  256,
  true
);

function displayBookInPage() {
  myLibrary.forEach((book) => {
    const newArticle = document.createElement("article");
    newArticle.className = "book_article";
    newArticle.id = `${book.title}`.replace(/ /g, "");
    newArticle.style = `background-image: url(${book.front_page}); background-size: contain;`;
    books_content.appendChild(newArticle);
    // newArticle.addEventListener("click", showBookInfo);
  });
}

// function showBookInfo(event) {
//   const bookEvent = myLibrary.find(
//     (book) => book.title.replace(/ /g, "") === event.target.id
//   );
//   const bookTitleSanitized = bookEvent.title.replace(/ /g, "");
//   const originalArticle = document.querySelector(`#${bookTitleSanitized}`);
//   console.log(originalArticle);
//   const bookInfoAr = document.createElement("article");
//   const bookTitleH2 = document.createElement("h2");
//   bookInfoAr.classList = "book_article_info";
//   bookTitleH2.textContent = bookEvent.title;
//   //   bookInfoAr.appendChild(bookTitleH2);
//   main.appendChild(bookInfoAr);
// }

displayBookInPage();

const updateButton = document.getElementById("updateDetails");
const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("favDialog");
dialog.returnValue = "favAnimal";

function openCheck(dialog) {
  if (dialog.open) {
    console.log("Dialog open");
  } else {
    console.log("Dialog closed");
  }
}

// Update button opens a modal dialog
updateButton.addEventListener("click", () => {
  dialog.showModal();
  openCheck(dialog);
});

// Form cancel button closes the dialog box
cancelButton.addEventListener("click", () => {
  dialog.close("animalNotChosen");
  openCheck(dialog);
});
