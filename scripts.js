const GOOGLEBOOKS_URL = 'https://www.googleapis.com/books/v1';

const getBooks = async (searchTerm) => {
  const response = await fetch(`${GOOGLEBOOKS_URL}/volumes?q=${searchTerm}`);
  const data = await response.json();
  return data.items;
};

const searchBtn = document.querySelector('.searchButton');
const gridContainer = document.querySelector('.books-grid');
const searchHeader = document.querySelector('.search-header');
searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector('.searchInput');
  const searchQuery = searchInput.value;
  if (searchQuery === '') {
    alert('Please type something to search');
    return;
  }

  const books = await getBooks(searchQuery);

  let booksList = books
    .map((book) => {
      return `
        <div class="booksCard">
          <div class="booksCard__image">
            <img class="booksImg" src=${book.volumeInfo.imageLinks.thumbnail} alt="${book.volumeInfo.title}" />
          </div>
          <div class="booksCard__content">
            <div class="booksCard__content__title">${book.volumeInfo.title}</div>
            <div class="booksCard__content__author">
              Author/s : ${book.volumeInfo.authors}
            </div>
            <a href="${book.volumeInfo.previewLink}" target="_blank"><div class="booksCard__content__button">Read Book</div>
            </a>
          </div>
        </div>
    `;
    })
    .join();

  booksList = booksList.replace(/,/g, '');
  gridContainer.innerHTML = booksList;
  searchHeader.textContent = 'Your search results for : ' + searchQuery;
});
