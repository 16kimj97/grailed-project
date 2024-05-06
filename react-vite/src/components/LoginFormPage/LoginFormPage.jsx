import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  const login = async (email, password) => {
    const serverResponse = await dispatch(thunkLogin({ email, password }));
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const handleDemoLogin = () => {
    login("demo@aa.io", "password");
  };

  return (
    <>
      <h1>Log In</h1>
      {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Log In</button>
        <button type="button" onClick={handleDemoLogin} style={{ background: 'red', color: 'white' }}>Test Demo Login</button>
      </form>
    </>
  );
}

export default LoginFormPage;
