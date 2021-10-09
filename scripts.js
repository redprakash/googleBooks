import getBooks from './js-modules/bookService.js';
const GOOGLEBOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

const searchBtn = document.querySelector('.searchButton');
const gridContainer = document.querySelector('.books-grid');
const searchHeader = document.querySelector('.search-header');
const searchInput = document.querySelector('.searchInput');

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value;
  if (searchQuery === '') {
    openModal();
  } else {
    const books = await getBooks(GOOGLEBOOKS_URL, searchQuery);

    const booksList = books.map((book) => {
      const imgLink =
        book.volumeInfo.imageLinks?.thumbnail ?? './images/defaultimage.jpeg';
      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors;
      const bookreadmore = book.volumeInfo.previewLink;
      return `
        <div class="booksCard">
          <div class="booksCard__image">
            <img class="booksImg" src=${imgLink} alt="${title}" />
          </div>
          <div class="booksCard__content">
            <div class="booksCard__content__title">${title}</div>
            <div class="booksCard__content__author">
              Author/s : ${authors}
            </div>
            <a href="${bookreadmore}" target="_blank"><div class="booksCard__content__button">Read Book</div>
            </a>
          </div>
        </div>
    `;
    });

    gridContainer.innerHTML = booksList.join('');
    searchHeader.textContent = `Your search results for :  ${searchQuery} `;
  }
});

// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
