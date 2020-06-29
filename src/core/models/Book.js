import shortid from "shortid";
import { datesAreSameDay, dateHappenedBefore } from "../util/general-util";

export class Book {
  constructor(
    title,
    author,
    pagesRead,
    totalPages,
    deadlineDate,
    identifier = shortid.generate()
  ) {
    this._title = title || "";
    this._author = author || "";
    this._pagesRead = pagesRead || null;
    this._totalPages = totalPages || null;
    // deadline is one week from now by default
    this._deadlineDate = deadlineDate || new Date(Date.now() + 86400000);
    this._id = identifier; // random identifier (or otherwise specified)
  }

  /* STATIC METHODS */

  static isDeadlineDateValid(deadlineDate) {
    return (
      !datesAreSameDay(deadlineDate, new Date()) &&
      dateHappenedBefore(new Date(), deadlineDate)
    );
  }

  /* GETTERS */

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get pagesRead() {
    return this._pagesRead;
  }

  get totalPages() {
    return this._totalPages;
  }

  get deadlineDate() {
    return this._deadlineDate;
  }

  get percentRead() {
    // gives percent as a decimal (1% = 0.01)
    return this._pagesRead / this._totalPages;
  }

  get id() {
    return this._id;
  }

  get isFinished() {
    // or should I do ">=" just in case?
    return this._pagesRead === this.totalPages;
  }

  // special method to check if book is ready after setup
  get isValid() {
    return (
      this._title !== "" && // book title is not empty
      this._author !== "" && // book author is not empty
      this._pagesRead && // pages read not null
      this._totalPages && // total pages not null
      this.isDeadlineDateValid(this._deadlineDate) // deadline date valid
    );
  }

  /* SETTERS */

  set pagesRead(pages) {
    const sectionOfPages = pages || 0;
    const totalPages = this._totalPages || 1;
    if (sectionOfPages <= totalPages) {
      this._pagesRead = sectionOfPages;
    } else {
      throw new Error(
        "Number of pages read exceeds total number of pages in book"
      );
    }
  }

  set title(bookTitle) {
    this._title = bookTitle;
  }

  set author(authorName) {
    this._author = authorName;
  }

  set totalPages(numPages) {
    this._totalPages = numPages;
  }

  set deadlineDate(date) {
    this._deadlineDate = date;
  }

  /* METHODS */

  addPagesRead(pages) {
    if (this._pagesRead + pages <= this._totalPages) {
      this._pagesRead += pages;
    } else {
      this._pagesRead = this._totalPages;
    }
  }

  subtractPagesRead(pages) {
    if (this._pagesRead - pages >= 0) {
      this._pagesRead -= pages;
    } else {
      this._pagesRead = 0;
    }
  }

  toJSON() {
    // convert to JSON for localStorage purposes
    return {
      title: this._title,
      author: this._author,
      pagesRead: this._pagesRead,
      totalPages: this._totalPages,
      deadlineDate: this._deadlineDate.getTime(),
      id: this._id,
    };
  }

  toString() {
    // for localStorage purposes, if it works
    return JSON.stringify(this.toJSON());
  }
}

export function initializeBookFromJSON(bookObj) {
  return new Book(
    bookObj.title,
    bookObj.author,
    bookObj.pagesRead,
    bookObj.totalPages,
    new Date(bookObj.deadlineDate),
    bookObj.id
  );
}
