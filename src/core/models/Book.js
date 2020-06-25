import shortid from "shortid";

export class Book {
  constructor(title, pagesRead, totalPages, deadlineDate) {
    this._title = title || "";
    this._pagesRead = pagesRead || 0;
    this._totalPages = totalPages || 1;
    // deadline is one week from now by default
    this._deadlineDate = deadlineDate || new Date(Date.now() + 7 * 86400000);
    this._id = shortid.generate(); // random identifier
  }

  /* GETTERS */

  get title() {
    return this._title;
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

  /* SETTERS */

  set pagesRead(pages) {
    if (pages <= this._totalPages) {
      this._pagesRead = pages;
    } else {
      throw new Error(
        "Number of pages read exceeds total number of pages in book"
      );
    }
  }

  set title(bookTitle) {
    this._title = bookTitle;
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
      pagesRead: this._pagesRead,
      totalPages: this._totalPages,
      deadlineDate: this._deadlineDate.getTime(),
      id: this._id,
    };
  }
}

export function initializeBookFromJSON(bookObj) {
  return new Book(
    bookObj.title,
    bookObj.pagesRead,
    bookObj.totalPages,
    new Date(bookObj.deadlineDate),
    bookObj.id
  );
}
