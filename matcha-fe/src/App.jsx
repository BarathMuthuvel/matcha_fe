import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Add more routes as needed */}
          <Route
            path="*"
            element={<h1 className="text-4xl">404 Not Found</h1>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
