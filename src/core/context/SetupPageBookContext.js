import { createContext } from "react";
// model
import { Book } from "../models/Book";

const SetupPageBookContext = createContext({
  bookInState: new Book(),
  modifyBook: () => {},
});
export default SetupPageBookContext;