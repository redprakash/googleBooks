import getBooks from './js-modules/allData.js';
const GOOGLEBOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

const searchBtn = document.querySelector('.searchButton');
const gridContainer = document.querySelector('.books-grid');
const searchHeader = document.querySelector('.search-header');
const searchInput = document.querySelector('.searchInput');

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value;
  if (searchQuery === '') {
    alert('Please type something to search');
    return;
  }

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
});
