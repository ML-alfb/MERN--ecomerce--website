import React, { useEffect, useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./css/formReLo.css";

function SingupPage() {
  const usernameRegex =
    /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordC: "",
    email: "",
  });
  const { username, password, passwordC, email } = formData;
  const [validName, setValidName] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password.length > 7 || !usernameRegex.test(username)) {
      //do something if btn enbaled from js back
    }
    try {
      const x = await register(formData);

      if (x) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const userID = localStorage.getItem("user");
    if (userID) {
      setAuth(userID);
    }
  }, []);
  useEffect(() => {
    if (usernameRegex.test(username)) {
      setValidName(true);
    } else {
      setValidName(false);
    }
  }, [username]);
  useEffect(() => {
    if (password.length > 7) {
      setValidPass(() => true);
    } else {
      setValidPass(false);
    }
  }, [password]);

  useEffect(() => {
    if (validPass && passwordC === password) {
      setValidMatch(true);
    } else {
      setValidMatch(false);
    }
  }, [passwordC]);
  useEffect(() => {
    if (emailRegex.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);
  return (
    <section className="main_section">
      <form className="form" onSubmit={onSubmit} method="POST">
        <dev className="input_container">
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={onChange}
            required
          ></input>
        </dev>
        <dev className="input_container">
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your email "
            name="email"
            value={email}
            onChange={onChange}
            required
          ></input>
        </dev>
        <dev className="input_container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={onChange}
            required
          ></input>
        </dev>
        <dev className="input_container">
          <label htmlFor="passwordC">Password</label>
          <input
            id="passwordC"
            type="password"
            placeholder="Confirm your password"
            name="passwordC"
            value={passwordC}
            onChange={onChange}
            required
          ></input>
        </dev>
        <button
          className="submit-btn"
          disabled={
            validName && validPass && validMatch && validEmail ? false : true
          }
        >
          Singup
        </button>
      </form>
    </section>
  );
}

export default SingupPage;
