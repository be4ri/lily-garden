import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [myUsers, setMyUsers] = useState([
    {username: "Ecler", password: "ceva"},
    {username: "Pandispan", password: "user"},
    {username: "Budinca", password: "oparola"},
    { username: "Tort", password: "tuidk" },
    { username: "Bexea", password: "cevaidk" },
  ]);

  return (
    <UserContext.Provider value={{ myUsers, setMyUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
