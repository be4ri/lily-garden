import './HomeCSS.css';
import { useNavigate } from "react-router-dom";



export default function HomePage() {

    return (
    <div class="BodyHomePage">
      <div>
        <TopBar />
        <WhiteLine />
      </div>
      </div>
    );
  }

  function TopBar(){
    return (
        <div class="topBar">
            <YourProfileButton />
            <LilyGardenTopText />
            <UsersButton />
        </div>
    );
  }

  function YourProfileButton(){
    const navigate = useNavigate();
     return(
        <button class="profileButton" onClick={() => navigate("/updateprofile")}>Your profile</button>
    );
  }

  function LilyGardenTopText(){
    return(
        <header class="LilyText">🌸 Lily Garden 🌸</header>
    );
  }

  function UsersButton(){
    const navigate = useNavigate();
    return(
        <button class="usersButton" onClick={() => navigate("/users")}>Users</button>
    )
  }

  function WhiteLine(){
    return(
        <hr class="myLine" />
    );
  }





  