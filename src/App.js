import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UsersContext";
import SignUpPage from "./SignUpPage";
import HomePage from "./HomePage";
import UsersPage from "./UsersPage";
import UpdateProfilePage from "./UpdateProfiePage";
import ChartPage from "./ChartPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/updateprofile" element={<UpdateProfilePage />}></Route>
          <Route path="/chart" element={<ChartPage />}></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
