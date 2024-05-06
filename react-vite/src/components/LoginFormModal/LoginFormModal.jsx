import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(thunkLogin({
      email,
      password,
    }));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = () => {
    dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }))
      .then(() => closeModal());
  };

  return (
    <div className="login-modal-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">
            Email
            <input
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">
            Password
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Log In</button>
          <button type="button" onClick={handleDemoLogin} className="demo-button">Log In as Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
