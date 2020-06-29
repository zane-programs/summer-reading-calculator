import { createContext } from "react";
const BooksContext = createContext({
  books: [],
  setBooks: () => {},
});
export default BooksContext;
