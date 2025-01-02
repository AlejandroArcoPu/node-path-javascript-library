// VARIABLES AND DOM ELEMENTS

let myLibrary = [];
const content_dropdown = document.querySelector(".content_dropdown");
const books_content = document.querySelector(".books_content");
const crossButtonCreate = document.querySelector(".cross_button_create");
const createButton = document.querySelector(".create_button");
const addBookButton = document.querySelector(".add_book_button");
const bookCreateDialog = document.querySelector(".book_create");
const button_synopsis = document.querySelector(".info_part.synopsis");
const button_drop = document.querySelector(".button_drop");
const formCreate = document.querySelector(".form_create");
const emptyDiv = document.querySelector(".empty");

// CONSTRUCTORS

// function Book(front_page, title, author, synopsis, pages, read) {
//   this.front_page = front_page;
//   this.title = title;
//   this.author = author;
//   this.synopsis = synopsis;
//   this.pages = pages;
//   this.read = read;
//   this.info = function () {
//     return `The ${this.title} by ${this.author}, ${this.pages} pages, ${
//       read ? "read" : "not read yet"
//     }`;
//   };
// }

class Book {
  constructor(front_page, title, author, synopsis, pages, read) {
    this.front_page = front_page;
    this.front_page = front_page;
    this.title = title;
    this.author = author;
    this.synopsis = synopsis;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `The ${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  }
}

// LISTENERS

window.onclick = (event) => {
  if (!event.target.matches(".button_drop")) {
    if (content_dropdown.classList.contains("show")) {
      content_dropdown.classList.remove("show");
    }
  }
};

addBookButton.addEventListener("click", () => {
  bookCreateDialog.showModal();
});

crossButtonCreate.addEventListener("click", () => {
  bookCreateDialog.close();
  document.querySelector(".form_create").reset();
});

button_drop.addEventListener("click", () => {
  content_dropdown.classList.toggle("show");
});

formCreate.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleNewBook = event.target.title.value
    .replaceAll(" ", "+")
    .toLowerCase();
  const authorNewBook = event.target.author.value
    .replaceAll(" ", "+")
    .toLowerCase();
  const readNewBook = event.target.read.checked;
  fetch(
    `https://openlibrary.org/search.json?title=${titleNewBook}&author=${authorNewBook}&sort=rating&language=eng&fields=key,title,author_name,number_of_pages_median,publish_year,cover_i,subject&limit=1`
  )
    .then((response) => response.json())
    .then((data) => {
      let successMessage = document.querySelector(".success-message");

      let { title, author_name, number_of_pages_median, cover_i, subject } =
        data.docs[0];
      addBookToLibrary(
        `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`,
        title,
        author_name,
        subject.slice(0, 5),
        number_of_pages_median,
        readNewBook
      );
      displayABook(
        `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`,
        title,
        author_name,
        subject.slice(0, 5),
        number_of_pages_median,
        readNewBook
      );
      event.target.title.className = "valid";
      event.target.author.className = "valid";
      successMessage.style.display = "flex";
      if (emptyDiv.style.display !== "none") {
        emptyDiv.style.display = "none";
      }
      setTimeout(() => {
        bookCreateDialog.close();
        successMessage.style.display = "none";
        event.target.title.className = "";
        event.target.author.className = "";
        document.querySelector(".form_create").reset();
      }, 500);
    })
    .catch((error) => {
      let errorMessage = document.querySelector(".error-message");
      event.target.title.className = "invalid";
      event.target.author.className = "invalid";
      errorMessage.style.display = "flex";
      setTimeout(() => {
        errorMessage.style.display = "none";
        event.target.title.className = "";
        event.target.author.className = "";
      }, 5000);
    });
});

let inputSearch = document.querySelector(".input_search");
inputSearch.addEventListener("input", () => {
  let bookContainFilter = myLibrary.filter((book) =>
    book.title.toLowerCase().includes(inputSearch.value.toLowerCase())
  );
  displayBooks(bookContainFilter);
});

// FUNCTIONS

function addBookToLibrary(front_page, title, author, synopsis, pages, read) {
  let newBook = new Book(front_page, title, author, synopsis, pages, read);
  myLibrary.push(newBook);
}

function displayBooks(books) {
  const bookArticles = document.querySelectorAll(".book_article");
  const bookDialogs = document.querySelectorAll(".book_dialog");
  bookArticles.forEach((bookArticle) => bookArticle.remove());
  bookDialogs.forEach((bookDialog) => bookDialog.remove());
  books.forEach((book) => {
    const newArticle = document.createElement("article");
    newArticle.className = "book_article";
    newArticle.id = book.title.replaceAll(" ", "");

    newArticle.style = `background-image: url(${book.front_page}); background-size: contain;`;
    books_content.appendChild(newArticle);

    const bookDialog = createBookDialog(
      book.front_page,
      book.title,
      book.author,
      book.synopsis,
      book.pages,
      book.read
    );
    const crossButton = bookDialog.querySelector(".cross_button");
    const deleteButton = bookDialog.querySelector(".delete");
    const buttonSynopsis = bookDialog.querySelector(".info_part.synopsis");
    const synopsisInfo = bookDialog.querySelector(".synopsis_info");

    newArticle.addEventListener("click", () => {
      bookDialog.showModal();
    });

    crossButton.addEventListener("click", () => {
      bookDialog.close();
    });

    //when delete the dialog should close
    deleteButton.addEventListener("click", () => {
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

function displayABook(img, title, author, subject, pages, read) {
  const newArticle = document.createElement("article");
  newArticle.className = "book_article";
  newArticle.id = title.replaceAll(" ", "");

  newArticle.style = `background-image: url(${img}); background-size: contain;`;
  books_content.appendChild(newArticle);

  const bookDialog = createBookDialog(img, title, author, subject, pages, read);
  const crossButton = bookDialog.querySelector(".cross_button");
  const deleteButton = bookDialog.querySelector(".delete");
  const buttonSynopsis = bookDialog.querySelector(".info_part.synopsis");
  const synopsisInfo = bookDialog.querySelector(".synopsis_info");

  newArticle.addEventListener("click", () => {
    bookDialog.showModal();
  });

  crossButton.addEventListener("click", () => {
    bookDialog.close();
  });

  deleteButton.addEventListener("click", () => {
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
}

function createBookDialog(img, title, author, synopsis, pages, read) {
  // create dialog
  const dialog = document.createElement("dialog");
  dialog.className = "book_dialog";
  dialog.id = `${title.replaceAll(" ", "")}`;

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
  synopsisTitle.textContent = "Subject";
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
  inputSwitch.addEventListener("change", () => {
    myLibrary.map((book) =>
      book.title === title ? (book.read = inputSwitch.checked) : book.read
    );
  });
  inputSwitch.checked = read;
  const spanSwitch = document.createElement("span");
  spanSwitch.className = "slider round";
  labelSwitch.appendChild(inputSwitch);
  labelSwitch.appendChild(spanSwitch);
  readElement.appendChild(readTitle);
  readElement.appendChild(labelSwitch);
  divInfoContent.appendChild(readElement);

  // delete button
  const buttonDelete = document.createElement("button");
  buttonDelete.addEventListener("click", (event) => {
    let deleteElement = document.querySelectorAll(
      `#${title.replaceAll(" ", "")}`
    );
    deleteElement.forEach((element) => element.remove());
    myLibrary = myLibrary.filter((book) => book.title !== title);
    if (myLibrary.length === 0) {
      emptyDiv.style.display = "block";
    }
  });
  buttonDelete.className = "delete";
  buttonDelete.textContent = "Delete";
  const buttonDeleteSpan = document.createElement("span");
  buttonDeleteSpan.textContent = "Irreversible action";
  buttonDelete.appendChild(buttonDeleteSpan);
  divInfoContent.appendChild(buttonDelete);
  dialog.appendChild(divInfoContent);
  books_content.appendChild(dialog);

  return dialog;
}
