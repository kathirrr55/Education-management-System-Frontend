import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Home/Home";
import Signup from "./components/user/signup/Form";
import Login from "./components/user/Login/Form";
import Userhome from "./components/user/Course/Home";
import Adminlogin from "./components/Admin/Login/Form";
import Home from "./components/Admin/Home/Home";
import Addcourse from "./components/Admin/Courses/addcourse";
import Editcourse from "./components/Admin/Courses/editcourse";
import Mysubscription from "./components/user/Subscription/Mysubscription";
import Certificate from "./components/user/Certificate/Certificate";
import { Viewquiz } from "./components/Admin/Quiz/viewquiz";
import Addquiz from "./components/Admin/Quiz/addquiz";
import Updatequiz from "./components/Admin/Quiz/updatequiz";
import { Viewcategoryquiz } from "./components/user/Quiz/Viewquiz";
import Question from "./components/user/Questions/Question";
import Result from "./components/user/Result/Result";
import Viewlearning from "./components/Admin/Learning/Learning";
import Receipt from "./components/user/Receipt/Receipt";
import Payment from "./components/user/Payment/Payment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/adminlogin" element={<Adminlogin />} />
        <Route exact path="/adminhome" element={<Home />} />
        <Route exact path="/addcourse" element={<Addcourse />} />
        <Route exact path="/addquiz" element={<Addquiz />} />
        <Route exact path="/editcourse" element={<Editcourse />} />
        <Route exact path="/editquiz" element={<Updatequiz />} />
        <Route exact path="/userhome" element={<Userhome />} />
        <Route exact path="/Mysubscription" element={<Mysubscription />} />
        <Route exact path="/Certificate" element={<Certificate />} />
        <Route exact path="/Viewquiz" element={<Viewquiz />} />
        <Route exact path="/Viewcategoryquiz" element={<Viewcategoryquiz />} />
        <Route exact path="/question" element={<Question />} />
        <Route exact path="/result" element={<Result />} />
        <Route exact path="/Learnings" element={<Viewlearning />} />
        <Route exact path="/receipt" element={<Receipt />} />
        <Route exact path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
