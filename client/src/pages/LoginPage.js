import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login } from "../api/api";
import "./css/formReLo.css";
function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(formData);
      console.log(user);
      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: user.id, accessToken: user.accessToken })
        );
        setAuth(user);
        navigate("/home/page/1");
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
  return (
    <section className="main_section">
      <form className="form" onSubmit={onSubmit}>
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
        <button className="submit-btn">login</button>
      </form>
    </section>
  );
}

export default LoginPage;
