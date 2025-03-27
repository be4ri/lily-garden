import './ChartPageCSS.css';
import { useUserContext } from "./UsersContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartPage = () => {
  const { myUsers, setMyUsers } = useUserContext(); // Use setMyUsers to update the users
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Username Length',
      data: [],
      borderColor: 'rgb(249, 91, 149)',
      fill: false,
    }]
  });

  useEffect(() => {
    const usernameLengths = myUsers.map(user => user.username.length);
    const usernames = myUsers.map(user => user.username);

    setChartData({
      labels: usernames,
      datasets: [{
        label: 'Username Length',
        data: usernameLengths,
        borderColor: 'rgb(249, 91, 149)',
        fill: false,
      }]
    });
  }, [myUsers]);

  const navigate = useNavigate();

  // Add a new random user
  const addRandomUser = () => {
    const newUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    // Update the myUsers state with the new user
    setMyUsers(prevUsers => [...prevUsers, newUser]);
  };

  return (
    <div className="chartPage">
      <button className="chartButton" onClick={() => navigate("/users")}>🡠 Back</button>
      
      {/* Add Random User Button */}
      <button className="addUserButton" onClick={addRandomUser}>Add Random User</button>
      
      {/* Chart */}
      <Line className="myChart" data={chartData} />
    </div>
  );
};

export default ChartPage;
