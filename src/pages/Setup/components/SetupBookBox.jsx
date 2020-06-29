import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";

// components
import { SetupBookControlledInput as Input } from "./SetupBookControlledInput";

// context
import BooksContext from "../../../core/context/BooksContext";
import SetupPageBookContext from "../../../core/context/SetupPageBookContext";

// util
import { isInteger } from "../../../core/util/general-util";
import { Book } from "../../../core/models/Book";

// styles
import "react-datepicker/dist/react-datepicker.css";

function SetupBookBox(props) {
  const { books, setBooks } = useContext(BooksContext); // books state

  const [bookInState /*, setBookInState*/] = useState(props.book);

  function modifyBook(modifiedBookJSON) {
    // make a copy of books
    let bookList = books.slice();

    // get index and element for book with props.book.id
    const bookListElementIndex = bookList.findIndex(
      (book) => book.id === props.book.id
    );
    const bookListElement = bookList[bookListElementIndex];

    // modify selected element
    const modifiedProperties = Object.keys(modifiedBookJSON);
    let modification;
    for (const modifiedProperty of modifiedProperties) {
      modification = modifiedBookJSON[modifiedProperty];
      if (isInteger(modification)) modification = parseInt(modification);
      bookListElement[modifiedProperty] = modification;
    }

    // add modified element back to bookList
    bookList[bookListElementIndex] = bookListElement;

    // set books state to bookList
    setBooks(bookList);
  }

  function removeBook() {
    let bookList = books.slice().filter((book) => book.id !== props.book.id);
    setBooks(bookList);
  }

  // Removes THIS book from books (state)
  async function removeBookButtonClick() {
    let deleteDialog = await Swal.fire({
      title: "Delete Book?",
      text:
        "Are you sure you want to delete this book? You will not be able to recover it.",
      icon: "warning",
      showCancelButton: "true",
      confirmButtonColor: "#b71c1c",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Delete",
    });
    if (deleteDialog.value) {
      // if they chose to delete
      removeBook(); // remove book from book list
    }
  }

  // Handles date change (for date picker)
  function handleDeadlineDateChange(date) {
    if (Book.isDeadlineDateValid(date)) {
      // they seleced today
      modifyBook({
        deadlineDate: date,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Please select date at least one day later than today.",
      });
    }
  }

  return (
    <div className="setup-book-box">
      <SetupPageBookContext.Provider value={{ bookInState, modifyBook }}>
        <div className="setup-fields-grid">
          <Input
            type="text"
            placeholder="Title"
            label="Book Title"
            modifyProperty="title"
          />
          <Input
            type="text"
            placeholder="Author"
            label="Book Author"
            modifyProperty="author"
          />
          <Input
            type="number"
            placeholder="Total # Pages"
            modifyProperty="totalPages"
          />
          <Input
            type="number"
            placeholder="# Pages Read So Far"
            modifyProperty="pagesRead"
          />
          <DatePicker
            selected={props.book.deadlineDate}
            onChange={handleDeadlineDateChange}
          />
        </div>
      </SetupPageBookContext.Provider>
      <div
        role="button"
        onClick={removeBookButtonClick}
        className="setup-remove-book"
        title="Remove Book"
      >
        <div className="inner">
          <MdDeleteForever />
        </div>
      </div>
    </div>
  );
}

export default SetupBookBox;
