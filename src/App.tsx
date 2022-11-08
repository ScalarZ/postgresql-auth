import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Signin from "./routes/signin";
import Signup from "./routes/signup";

function App() {
  return (
    <div className="py-8 min-h-screen">
      <nav className="mb-8 flex justify-center">
        <ul className="text-lg flex gap-x-8">
          <li className="cursor-pointer">
            <Link to={"/"}>home</Link>
          </li>
          <li className="cursor-pointer">
            <Link to={"/signin"}>sign in</Link>
          </li>
          <li className="cursor-pointer">
            <Link to={"/signup"}>sign up</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
