import { createContext } from 'react';
const SetupStateContext = createContext({
  setupState: 0,
  setSetupState: () => {}
});
export default SetupStateContext;