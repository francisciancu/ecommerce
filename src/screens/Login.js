import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/css/form.css";
import Header from "../components/Header";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate("/register");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      Nume: "nume",
      Prenume: "surname",
      Email: email,
      Parola: password,
      Nr_Telefon: "phoneNumber",
    };
    axios
      .post("https://localhost:7292/api/ControllerUtilizatori/login", {
        ...credentials,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode === 200) {
          setToggle(false);
          navigate("/", {
            state: { isLogged: true, customer: response.data.statusMessage },
          });
        } else {
          setToggle(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header isLogged={false} />
      <div className="boxInfo">
        <Form onSubmit={handleSubmit} id="my-form">
          {toggle ? (
            <Alert id="alert" key="danger" variant="danger">
              Incorrect email or password. Please try again.
            </Alert>
          ) : (
            <></>
          )}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter email"
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
              required={true}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br />
          Do you not have an account already? 😅
          <br />
          It's ok. You can check out{" "}
          <Button
            variant="primary"
            type="button"
            onClick={navigateToRegister}
            className="pressButtons"
          >
            Register
          </Button>{" "}
          for that. We can help you get your account up and running so you can
          be on your way.
        </Form>
      </div>
    </>
  );
}
