const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Book.generateId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === 'true';
  }

  toggleRead() {
    this.read = !this.read;
  }

  static generateId() {
    // Simple fallback for unique ID
    return 'id-' + Math.random().toString(36).substr(2, 16);
  }
}



function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  displayBook();
}

// Delete all books from myLibrary
function clearBooks() {
  myLibrary.length = 0;
  displayBook();
}

document.getElementById('clear-lib-btn').addEventListener('click', () => {
  clearBooks();
});

function displayBook() {
  const container = document.getElementById('book-container');
  container.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-id', book.id);
    card.innerHTML = `
    <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
      
      <button class="toggle-read-btn">Toggle Read</button>
      <button class="remove-btn">Remove</button>
    `;
    container.appendChild(card)
  });

  addcardListeners();
}

function addcardListeners() {
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', e => {
      const bookId = e.target.parentElement.getAttribute('data-id');
      removeBook(bookId)
    });
  });

  document.querySelectorAll('.toggle-read-btn').forEach(button => {
    button.addEventListener('click', e => {
      const bookId = e.target.parentElement.getAttribute('data-id');
      toggleReadStatus(bookId);
    })
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index != -1) {
    myLibrary.splice(index, 1);
    displayBook();
  }
}

function toggleReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBook();
  }
}

// Dialog/form handlers
const dialog = document.getElementById('book-form-dialog');
const form = document.getElementById('book-form');

document.getElementById('new-book-btn').addEventListener('click', () => {
  dialog.showModal();
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  dialog.close();
});



form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const read = formData.get('read');
  addBookToLibrary(title, author, pages, read);
  form.reset();
  dialog.close();
});

//some sample books
addBookToLibrary('1984', 'George Orwell', 328, 'true');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, 'false');
