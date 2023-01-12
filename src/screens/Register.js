import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import "../assets/css/form.css";
import { baseURL } from "../components/constant";
import Header from "../components/Header";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toggle, setToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    }
    if (id === "surname") {
      setSurname(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      Nume: name,
      Prenume: surname,
      Email: email,
      Parola: password,
      Nr_Telefon: phoneNumber,
    };
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,})"
    );
    console.log(credentials);

    if (name.length < 3) {
      setErrorMessage("Your name must be at least 3 characters long.");
      setToggle(true);
    } else if (surname.length < 3) {
      setErrorMessage("Your surname must be at least 3 characters long.");
      setToggle(true);
    } else if (!strongRegex.test(password)) {
      setErrorMessage(
        "Your password must contain at least one digit, one special symbol, one lowercase letter and one uppercase letter."
      );
      setToggle(true);
    } else {
      axios
        .post(`${baseURL}/ControllerUtilizatori/register`, {
          ...credentials,
        })
        .then((response) => {
          console.log(response);
          setToggle(false);
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Header isLogged={true} />
      <div className="boxInfo">
        <Form onSubmit={handleSubmit} id="my-form">
          {toggle ? (
            <Alert id="alert" key="danger" variant="danger">
              {errorMessage}
            </Alert>
          ) : (
            <></>
          )}
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter name"
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter surname"
              required={true}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => handleInputChange(e)}
              placeholder="Phone Number"
              required={true}
            />
          </Form.Group>
          <Button variant="primary" type="submit" id="my-button">
            Submit
          </Button>
          <br />
          Already have an account? 😅
          <br /> No problem! We have just the right place for you. Go to
          <Button
            variant="primary"
            type="button"
            onClick={navigateToLogin}
            className="pressButtons"
          >
            Login
          </Button>
          .
        </Form>
      </div>
    </>
  );
}
