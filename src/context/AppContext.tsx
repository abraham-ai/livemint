import { createContext } from 'react'


interface AppContextType {
  isSignedIn: boolean;
  setIsSignedIn: (signedIn: boolean) => void;
  username: string | null;
  setUsername: (username: string) => void;
}

const AppContext = createContext<AppContextType>({
  isSignedIn: false,
  setIsSignedIn: () => {},
  username: null,
  setUsername: () => {},
});


export default AppContext;
