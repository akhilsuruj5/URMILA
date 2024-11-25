import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyCourses from "./pages/MyCourses";
import OurOfferings from "./pages/OurOfferings";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import EnrollmentConfirmation from "./pages/CourseConfirmation";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./pages/PageNotFound";
import MentorshipPage from "./pages/OneOnOneMentoship";
import InternshipSupport from "./pages/InternshipSupport";
import AssignmentMentorship from "./pages/Mentorship";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <BrowserRouter>
        <ScrollToTop />
        {/* <ScrollRestoration /> */}
      <Routes>
        {/* Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="ourofferings" element={<OurOfferings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="one-on-one-mentorship" element={<MentorshipPage />} />
          <Route path="mentorship" element={<AssignmentMentorship />} />
          <Route path="placementsupport" element={<InternshipSupport />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
        </Route>

        {/* Route without Layout */}
        
          <Route path="*" element={<NotFound />} />
        <Route path="enrollment-confirmed" element={<EnrollmentConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
