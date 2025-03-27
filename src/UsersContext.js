import { createContext, useState, useContext } from "react";
import { faker } from "@faker-js/faker"; 

const UserContext = createContext();

export function UserProvider({ children }) {
  const generateRandomUsers = (numUsers) => {
    const randomUsers = [];
    for (let i = 0; i < numUsers; i++) {
      const username = faker.internet.userName();
      const password = faker.internet.password();
      randomUsers.push({
        username: username,
        password: password,
      });
    }
    return randomUsers;
  };


  const randomUsers = generateRandomUsers(100);

  const [myUsers, setMyUsers] = useState(randomUsers); 

  return (
    <UserContext.Provider value={{ myUsers, setMyUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
