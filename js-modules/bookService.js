const getBooks = async (url, searchTerm) => {
  const response = await fetch(`${url}+${searchTerm}`);
  const data = await response.json();
  return data.items;
};
export default getBooks;
