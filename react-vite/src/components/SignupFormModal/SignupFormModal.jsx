import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Passwords must match.",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-modal">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-field">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-field">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-field">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-field">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
