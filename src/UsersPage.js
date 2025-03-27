import { useUserContext } from "./UsersContext";
import { useNavigate } from "react-router-dom";
import "./UsersPageCSS.css";
import { useState } from "react";

export default function UsersPage() {
  const { myUsers } = useUserContext();
  const [isSorted, setIsSorted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterLetter, setFilterLetter] = useState("");
  const usersPerPage = 10;

  let filteredUsers = myUsers;
  if (filterLetter) {
    filteredUsers = myUsers.filter(user =>
      user.username.toLowerCase().startsWith(filterLetter.toLowerCase())
    );
  }

  let sortedUsers = isSorted
    ? [...filteredUsers].sort((a, b) => a.username.localeCompare(b.username))
    : filteredUsers;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const sortedByPasswordLength = [...filteredUsers].sort((a, b) => b.password.length - a.password.length);
  const userWithLongestPassword = sortedByPasswordLength[0];
  const userWithSecondLongestPassword = sortedByPasswordLength[1];

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <div className="BodyUserPage">
      <div className="UP">
        <TopBarUsers />
        <WhiteBarUser />
        <div className="UserListDiv">
          <CheckBoxSort isSorted={isSorted} setIsSorted={setIsSorted} />
          <CheckBoxLetter filterLetter={filterLetter} setFilterLetter={setFilterLetter} />
          <UserListFunction
            users={currentUsers}
            userWithLongestPassword={userWithLongestPassword}
            userWithSecondLongestPassword={userWithSecondLongestPassword}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

function TopBarUsers() {
  return (
    <div className="topuser">
      <ButtonToHomeFromUsers />
      <header className="UsersText">Users</header>
      <ChartButton />
    </div>
  );
}

function ButtonToHomeFromUsers() {
  const navigate = useNavigate();
  return (
    <button className="buttonuserhome" onClick={() => navigate("/home")}>🡠 Back</button>
  );
}

function WhiteBarUser() {
  return <hr className="myLineUsers" />;
}

function UserListFunction({ users, userWithLongestPassword, userWithSecondLongestPassword }) {
  return (
    <ol className="myUserList">
      {users.map((user, index) => {
        let color = "black";
        if (user.username === userWithLongestPassword?.username) {
          color = "red";
        } else if (user.username === userWithSecondLongestPassword?.username) {
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

function CheckBoxLetter({ filterLetter, setFilterLetter }) {
  return (
    <div className="checkboxsortdiv">
      <label htmlFor="filterA" className="filteringAtext">
        Show only names starting with letter:
      </label>
      <input
        type="text"
        className="LetterInput"
        id="filterA"
        value={filterLetter}
        onChange={(e) => setFilterLetter(e.target.value)}
        maxLength={1}
      />
    </div>
  );
}

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button className="ButtonPage" onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span className="spanPage">
        Page {currentPage} of {totalPages}
      </span>
      <button className="ButtonPage" onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

function ChartButton() {
  const navigate = useNavigate();
  return (
    <button className="seeChartButton" onClick={() => navigate("/chart")}>Chart</button>
  );
}
