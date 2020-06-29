import React, { useContext } from "react";
import { MdAdd } from "react-icons/md";
import { animateScroll } from "react-scroll";

// components
import Button from "../../../components/Button";
import SetupBookBox from "./SetupBookBox";

// models
import { Book } from "../../../core/models/Book";

// context
import BooksContext from "../../../core/context/BooksContext";

function SetupBooksContainer(props) {
  const { books, setBooks } = useContext(BooksContext); // books state

  const bookBoxElements = books.map((book) => (
    <SetupBookBox book={book} key={book.id} />
  ));

  function scrollToBottomOfContainer() {
    animateScroll.scrollToBottom({
      containerId: "setup-books-container",
    });
  }

  return (
    <div className="setup-books-container" id="setup-books-container">
      {bookBoxElements}
      <Button
        classnames={["button-setup-add-book"]}
        onClick={() => {
          // add new book at the end of the list
          setBooks([...books, new Book()]);
          setTimeout(scrollToBottomOfContainer, 100); // timeout is gross but ok
        }}
      >
        <MdAdd />
        Add Book
      </Button>
    </div>
  );
}

export default SetupBooksContainer;
