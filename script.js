// VARIABLES AND DOM ELEMENTS

const myLibrary = [];
let content_dropdown = document.querySelector(".content_dropdown");
let books_content = document.querySelector(".books_content");
// let bookDialog = document.querySelector(".book_dialog");
// let crossButton = document.querySelector(".cross_button");
let crossButtonCreate = document.querySelector(".cross_button_create");
let bookCreateButton = document.querySelector(".book_create_button");
let bookCreateDialog = document.querySelector(".book_create");
let button_synopsis = document.querySelector(".info_part.synopsis");
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

// button_synopsis.addEventListener("click", () => {
//   if (synopsis_info.style.display === "block") {
//     synopsis_info.style.display = "none";
//     button_synopsis.querySelector("img").style.transform = "rotate(0deg)";
//     return;
//   }
//   button_synopsis.querySelector("img").style.transform = "rotate(90deg)";
//   synopsis_info.style.display = "block";
// });

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
  "This book could be worth a million dollars to you. Andrew Carnegie attributed his great fortune to his discovery of a magic formula for success. Carnegie",
  256,
  true
);
addBookToLibrary(
  "https://m.media-amazon.com/images/I/61CIKpN5QjL._SL1200_.jpg",
  "Test and grow rich",
  "Test Hill",
  "Test Test Test",
  2,
  true
);

function displayBookInPage() {
  myLibrary.forEach((book) => {
    const newArticle = document.createElement("article");
    newArticle.className = "book_article";
    newArticle.id = `${book.title}`;

    newArticle.style = `background-image: url(${book.front_page}); background-size: contain;`;
    books_content.appendChild(newArticle);

    createBookDialog(
      book.front_page,
      book.title,
      book.author,
      book.synopsis,
      book.pages
    );

    const bookDialog = document.getElementById(
      `${book.title.replaceAll(" ", "+")}`
    );
    const crossButton = bookDialog.querySelector(".cross_button");
    const buttonSynopsis = bookDialog.querySelector(".info_part.synopsis");
    const synopsisInfo = bookDialog.querySelector(".synopsis_info");

    newArticle.addEventListener("click", () => {
      bookDialog.showModal();
    });

    crossButton.addEventListener("click", () => {
      bookDialog.close();
    });

    buttonSynopsis.addEventListener("click", () => {
      if (synopsisInfo.style.display === "block") {
        synopsisInfo.style.display = "none";
        buttonSynopsis.querySelector("img").style.transform = "rotate(0deg)";
        return;
      }
      buttonSynopsis.querySelector("img").style.transform = "rotate(90deg)";
      synopsisInfo.style.display = "block";
    });
  });
}

function createBookDialog(img, title, author, synopsis, pages) {
  // create dialog
  const dialog = document.createElement("dialog");
  dialog.className = "book_dialog";
  dialog.id = `${title.replaceAll(" ", "+")}`;

  // first line of the dialog
  const divFirstLine = document.createElement("div");
  divFirstLine.className = "first_line_info";
  const imgBook = document.createElement("img");
  imgBook.src = img;
  imgBook.alt = `Book cover of ${title}`;
  divFirstLine.appendChild(imgBook);

  const crossButtonDialog = document.createElement("button");
  crossButtonDialog.className = "cross_button";
  const crossButtonImg = document.createElement("img");
  crossButtonImg.src = "./icons/circle-cross.svg";
  crossButtonImg.alt = "Close dialog";
  crossButtonDialog.appendChild(crossButtonImg);
  divFirstLine.appendChild(crossButtonDialog);
  dialog.appendChild(divFirstLine);

  // second part content
  const divInfoContent = document.createElement("div");
  divInfoContent.className = "info_content";

  // title and author
  const titleAuthor = document.createElement("div");
  titleAuthor.className = "info_part_first";
  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  const authorElement = document.createElement("p");
  const authorSpan = document.createElement("span");
  titleAuthor.appendChild(titleElement);
  authorElement.textContent = "By ";
  authorSpan.textContent = author;
  authorElement.appendChild(authorSpan);
  titleAuthor.appendChild(authorElement);
  divInfoContent.appendChild(titleAuthor);

  // synopsys
  const synopsisButton = document.createElement("button");
  synopsisButton.className = "info_part synopsis";
  const synopsisTitle = document.createElement("h4");
  synopsisTitle.textContent = "Synopsis";
  const synopsisImg = document.createElement("img");
  synopsisImg.src = "./icons/angle-right.svg";
  synopsisImg.alt = "Show synopsis icon";
  synopsisButton.appendChild(synopsisTitle);
  synopsisButton.appendChild(synopsisImg);
  divInfoContent.appendChild(synopsisButton);

  const synopsisElement = document.createElement("div");
  const synopsisInfo = document.createElement("p");
  synopsisElement.className = "synopsis_info";
  synopsisInfo.textContent = synopsis;
  synopsisElement.appendChild(synopsisInfo);
  divInfoContent.appendChild(synopsisElement);

  // pages
  const pagesElement = document.createElement("div");
  pagesElement.className = "info_part pages";
  const pagesTitle = document.createElement("h4");
  pagesTitle.textContent = "Pages";
  const pagesNumber = document.createElement("p");
  pagesNumber.textContent = pages;
  pagesElement.appendChild(pagesTitle);
  pagesElement.appendChild(pagesNumber);
  divInfoContent.appendChild(pagesElement);

  // read or not read
  const readElement = document.createElement("div");
  readElement.className = "info_part read";
  const readTitle = document.createElement("h4");
  readTitle.textContent = "Read?";
  const labelSwitch = document.createElement("label");
  labelSwitch.className = "switch";
  const inputSwitch = document.createElement("input");
  inputSwitch.type = "checkbox";
  const spanSwitch = document.createElement("span");
  spanSwitch.className = "slider round";
  labelSwitch.appendChild(inputSwitch);
  labelSwitch.appendChild(spanSwitch);
  readElement.appendChild(readTitle);
  readElement.appendChild(labelSwitch);
  divInfoContent.appendChild(readElement);

  // delete button
  const buttonDelete = document.createElement("button");
  buttonDelete.className = "delete";
  buttonDelete.textContent = "Delete";
  const buttonDeleteSpan = document.createElement("span");
  buttonDeleteSpan.textContent = "Irreversible action";
  buttonDelete.appendChild(buttonDeleteSpan);
  divInfoContent.appendChild(buttonDelete);
  dialog.appendChild(divInfoContent);
  books_content.appendChild(dialog);
}

displayBookInPage();
