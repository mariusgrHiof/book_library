const form = document.querySelector('form');
const overlay = document.querySelector('.overlay');
const addBtn = document.querySelector('.addBtn');
const closeFormBtn = document.querySelector('.close-form');
const cardsContainer = document.querySelector('.cards');

let myLibrary = [];
let books = JSON.parse(localStorage.getItem('books'));
books ? (myLibrary = books) : [];

getAllBooks(myLibrary);

function showForm() {
  form.classList.add('show-form');
  overlay.classList.add('active');
}
function closeForm() {
  overlay.classList.remove('active');

  form.classList.remove('show-form');
  clearForm();
}
function clearForm() {
  form['title'].value = '';
  form['author'].value = '';
  form['pages'].value = '';
  form['read'].checked = false;
}

function Book(title, author, pages, read) {
  this.title = this.title;
  this.author = this.author;
  this.pages = this.pages;
  this.read = this.read;

  return {
    title,
    author,
    pages,
    read,
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

function getAllBooks(books) {
  books.forEach((book) => {
    const { title, author, pages, read, id } = book;

    let html = `
    <div class="card" data-id="${id}">
      <h2 class="card__title">${title}</h2>
      <p class="card__author">By ${author}</p>
      <p class="card__pages">Pages: ${pages}</p>
      <p class="card__read">Read: ${read}</p>
    </div>
    
    
    `;
    cardsContainer.insertAdjacentHTML('beforeend', html);
  });
}

function isValidInputs(inputs) {
  const arrInputs = [...inputs];
  const title = arrInputs[0];
  const author = arrInputs[1];
  const pages = Number.parseInt(arrInputs[2]);

  if (/^\d+$/.test(title) || /^\d+$/.test(author) || !Number.isInteger(pages)) {
    alert('Invalid inputs');
    return false;
  }

  return true;
}

function renderBook(book) {
  const { title, author, pages, read, id } = book;

  let html = `
    <div class="card" data-id="${id}">
      <h2 class="card__title">${title}</h2>
      <p class="card__author">By ${author}</p>
      <p class="card__pages">Pages: ${pages}</p>
      <p class="card__read">Read: ${read}</p>
    </div>
    
    
    `;
  cardsContainer.insertAdjacentHTML('beforeend', html);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form['title'].value;
  const author = form['author'].value;
  const pages = form['pages'].value;
  const read = form['read'].checked ? true : false;

  if (!isValidInputs([title, author, pages, read])) return;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  closeForm();
  renderBook(newBook);
});

// Attach event handers
addBtn.addEventListener('click', showForm);
closeFormBtn.addEventListener('click', closeForm);
overlay.addEventListener('click', closeForm);
