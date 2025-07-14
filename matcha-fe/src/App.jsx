import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
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
      </Provider>
    </div>
  );
}

export default App;
