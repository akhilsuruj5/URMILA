import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyCourses from "./pages/MyCourses";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="mycourses" element={<MyCourses />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
