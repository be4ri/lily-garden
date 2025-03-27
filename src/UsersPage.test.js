import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "./UsersContext";
import UsersPage from "./UsersPage";

// Mock user data
const mockUsers = [
  { username: "Alice", password: "password123" },
  { username: "Alex", password: "securepass" },
  { username: "Bob", password: "testpass" },
  { username: "Charlie", password: "charliepass" }
];

describe("UsersPage Component", () => {
  it("filters users by letter input", () => {
    // Render component with mock context
    render(
      <UserContext.Provider value={{ myUsers: mockUsers }}>
        <UsersPage />
      </UserContext.Provider>
    );

    // Ensure all users are initially displayed
    expect(screen.getByText("Alice - password123")).toBeInTheDocument();
    expect(screen.getByText("Alex - securepass")).toBeInTheDocument();
    expect(screen.getByText("Bob - testpass")).toBeInTheDocument();
    expect(screen.getByText("Charlie - charliepass")).toBeInTheDocument();

    // Type 'A' into the filter input
    const filterInput = screen.getByLabelText("Show only names starting with letter:");
    fireEvent.change(filterInput, { target: { value: "A" } });

    // Expect only names starting with 'A' to be shown
    expect(screen.getByText("Alice - password123")).toBeInTheDocument();
    expect(screen.getByText("Alex - securepass")).toBeInTheDocument();
    expect(screen.queryByText("Bob - testpass")).not.toBeInTheDocument();
    expect(screen.queryByText("Charlie - charliepass")).not.toBeInTheDocument();
  });
});
