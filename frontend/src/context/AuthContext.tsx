import {
  Children,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

export const AuthContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
}>({
  user: null,
  setUser: (user) => {
    user;
  },
});

const getUserFromLocalStorage = () => {
  try {
    const userJson = window.localStorage.getItem("user");
    if (!userJson) {
      return null;
    }
    return JSON.parse(userJson);
  } catch (error) {
    return null;
  }
};

export default function AuthContextProvider(props) {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
