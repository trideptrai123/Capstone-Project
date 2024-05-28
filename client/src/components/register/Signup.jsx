import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import "./register.css";
const Register = () => {
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [userType, setUserType] = useState("Student university");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister= (e)=>{
    e.preventDefault();
    const newUser = {
      email: email,
      password:password,
      username:username,
      userType: userType,
    };
    registerUser(newUser,dispatch,navigate);
  }
  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form onSubmit={handleRegister}>
        <label>EMAIL</label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e)=>setUsername(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e)=>setPassword(e.target.value)}
        />
         <label >USER TYPE</label>
        <select onChange={(e) => setUserType(e.target.value)} value={userType}>
          <option value="Student university">Student university</option>
          <option value="Student highschool">Student highschool</option>
        </select>
        <button type="submit"> Create account </button>
        <div className="signup-register"> You have an account ? </div>
        <Link className="signup-register-link" to="/login">
          Login
      </Link>

      </form>
    </section>
  );
};

export default Register;