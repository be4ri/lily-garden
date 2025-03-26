import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { useUserContext } from "./UsersContext"; 

export function UserList({ myUsers }) {
  return (
    <div className="userList">
      <h2>User List</h2>
      <ul>
        {myUsers.map((user, index) => (
          <li key={index}>{user.username} - {user.password}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SignUpPage() {
  const { myUsers, setMyUsers } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const navigate = useNavigate();

  const addUser = (username, password) => {
    setMyUsers([...myUsers, { username, password }]);
  };

  const handleSubmit = () => {
    if (password === rePassword) {
      if (password !== "" && rePassword !== "" && username !== "") {
        if (myUsers.some((user) => user.username === username)){
          alert("The username is taken!!");
        }else{

          addUser(username, password);
          setUsername("");
          setPassword("");
          setRePassword("");
          //console.log("User signed up:", { username, password });
  
          navigate("/home");
        }

      } else {
        alert("You must fill in all of the fields!!");
      }
    } else {
      alert("Passwords do not match!!");
    }
  };

  return (
    <div class="BodySignUpPage">
    <div className="LPage">
      <header class="welcomeText">Welcome</header>
      <br />
      <br />
      <UserNameInput username={username} setUsername={setUsername} />
      <EnterPassInput password={password} setPassword={setPassword} />
      <ReEnterPassInput rePassword={rePassword} setRePassword={setRePassword} />
      <SignUpButton onClick={handleSubmit} />
    </div>
    </div>
  );
}

function SignUpButton({ onClick }) {
  return (
    <div>
      <br />
      <button className="buttonSignUp" onClick={onClick}>Sign up</button>
    </div>
  );
}

function UserNameInput({ username, setUsername }) {
  return (
    <div>
      <br />
      <div className="UsernameText">Username :</div>
      <div>
        <input
          className="inputUsername"
          type='text'
          placeholder='  Enter your username...'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
    </div>
  );
}

function EnterPassInput({ password, setPassword }) {
  return (
    <div>
      <br />
      <div className="UsernameText">Password :</div>
      <div>
        <input
          className="inputUsername"
          type='password'
          placeholder='  Enter your password...'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
    </div>
  );
}

function ReEnterPassInput({ rePassword, setRePassword }) {
  return (
    <div>
      <br />
      <div className="UsernameText">Re-enter password :</div>
      <div>
        <input
          className="inputUsername"
          type='password'
          placeholder='  Enter your password again...'
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
      </div>
      <br />
    </div>
  );
}
