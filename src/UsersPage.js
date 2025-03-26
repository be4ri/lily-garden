import { useUserContext } from "./UsersContext";
import { useNavigate } from "react-router-dom";
import "./UsersPageCSS.css";
import { useState } from "react"; 

export default function UsersPage() {
  const { myUsers } = useUserContext();
  const [isSorted, setIsSorted] = useState(false);
  let sortedUsers;
  if (isSorted) {
    sortedUsers = [...myUsers].sort((a, b) => a.username.localeCompare(b.username));
  } else {
    sortedUsers = myUsers;
  }
  const userWithLongestPassword = myUsers.reduce((longest, user) => {
    if (user.password.length > longest.password.length) {
      return user;
    }
    return longest;
  }, myUsers[0]);

const userWithSecondLongestPassword = myUsers.reduce((longest,user) => {
  if(user.password.length > longest.password.length && user.username !== userWithLongestPassword.username){
    return user;
  }
  return longest;
}, myUsers[0]);

  return (
    <div class="BodyUserPage">
    <div className="UP">
    <TopBarUsers />
    <WhiteBarUser />
    <div class="UserListDiv">
    <CheckBoxSort isSorted={isSorted} setIsSorted={setIsSorted} />
    <UserListFunction users={sortedUsers} userWithLongestPassword = {userWithLongestPassword} userWithSecondLongestPassword={userWithSecondLongestPassword} />
    </div>
    </div>
    </div>
  );
}

function TopBarUsers(){
  return(
    <div class="topuser">
      <ButtonToHomeFromUsers />
      <header class="UsersText">Users</header>
    </div>
  );
}

function ButtonToHomeFromUsers(){
  const navigate = useNavigate();
  return(
    <button class="buttonuserhome" onClick={() => navigate("/home")}>🡠 Back</button>
  );
}

function WhiteBarUser(){
  return(
    <hr class="myLineUsers" />
);
}

function UserListFunction({ users, userWithLongestPassword, userWithSecondLongestPassword }) {
  return (
    <ol className="myUserList">
      {users.map((user, index) => {
        let color = "black"; 
        if (user.username === userWithLongestPassword.username) {
          color = "red"; 
        } 
        else if (user.username === userWithSecondLongestPassword.username) {
          color = "blue"; 
        }
        return (
          <li key={index} style={{ color: color }}>
            {user.username} - {user.password}
          </li>
        );
      })}
    </ol>
  );
}


function CheckBoxSort({ isSorted, setIsSorted }) {
  return (
    <div className="checkboxsortdiv">
      <input
        type="checkbox"
        className="sortingCB"
        id="sortUsersAlph"
        checked={isSorted}
        onChange={() => setIsSorted(!isSorted)}
      />
      <label htmlFor="sortUsersAlph" className="sortingCBtext">
        Sort in alphabetical order
      </label>
    </div>
  );
}