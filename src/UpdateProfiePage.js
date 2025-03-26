import { useState } from "react";
import { useUserContext } from "./UsersContext";
import { useNavigate } from "react-router-dom";
import './UpdateProfileCSS.css';



export default function UpdateProfilePage(){
  const { myUsers, setMyUsers } = useUserContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = () => {
    const userIndex = myUsers.findIndex((u) => u.username === username);
    if (userIndex === -1) {
      alert("Wrong username!!");
      return;
    }
    if (myUsers[userIndex].password !== oldPassword) {
      alert("The password is incorrect!!");
      return;
    }
    
    const updatedUsers = [...myUsers];
    updatedUsers[userIndex].password = newPassword;
    setMyUsers(updatedUsers);

    setUsername("");
    setOldPassword("");
    setNewPassword("");
  };

  const handleDelete = () => {
    if (!myUsers.some((user) => user.username === username)) {
      alert("Wrong username!!");
      return;
    }
    setMyUsers(myUsers.filter((user) => user.username !== username));
    alert("Account deleted successfully!");
    navigate("/home");
  };

    return(
        <div class="bodyUpdateProfile">
            <div>
                <TopBarUpPf />
                <WhiteBarUpPf />
                <div class="FormUpdate">
                    <UserNameInputUp username={username} setUsername={setUsername} />
                    <OldPasswordInputUp oldPassword={oldPassword} setOldPassword={setOldPassword} />
                    <NewPasswordInputUp newPassword={newPassword} setNewPassword={setNewPassword} />
                    <UpdateProfileButton onClick={handleUpdate} />
                    <DeleteProfileButton onClick={handleDelete} />
                </div>
            </div>
        </div>

    );
}

function TopBarUpPf(){
    return(
      <div class="toppfup">
        <ButtonToHomeFromUpPf />
        <header class="UpPfText">Update Profile</header>
      </div>
    );
  }
  
  function ButtonToHomeFromUpPf(){
    const navigate = useNavigate();
    return(
      <button class="buttonpfuphome" onClick={() => navigate("/home")}>🡠 Back</button>
    );
  }
  
  function WhiteBarUpPf(){
    return(
      <hr class="myLinepfup" />
  );
  }

  function UserNameInputUp({username,setUsername}) {
    return (
      <div>
        <br />
        <div className="UsernameTextUpdate">Username :</div>
        <div>
          <input
            className="inputUsernameUpdate"
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

  function OldPasswordInputUp({oldPassword, setOldPassword}) {
    return (
      <div>
        <br />
        <div className="UsernameTextUpdate">Old password :</div>
        <div>
          <input
            className="inputUsernameUpdate"
            type='text'
            placeholder='  Enter your old password...'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <br />
      </div>
    );
  }

  function NewPasswordInputUp({newPassword, setNewPassword}) {
    return (
      <div>
        <br />
        <div className="UsernameTextUpdate">New password :</div>
        <div>
          <input
            className="inputUsernameUpdate"
            type='text'
            placeholder='  Enter your new password...'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <br />
      </div>
    );
  }

  function UpdateProfileButton({onClick}){
    return (
        <div>
          <br />
          <button className="buttonUpdatePf" onClick={onClick}>Update</button>
        </div>
      );
  }

  function DeleteProfileButton({onClick}){
    return (
        <div>
          <br />
          <button className="buttonDeletePf" onClick={onClick}>Delete account</button>
        </div>
      );
  }