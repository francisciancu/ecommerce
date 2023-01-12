import React from "react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Home(props) {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const [customer, setCustomer] = useState("");
  useEffect(() => {
    if (location.state && location.state.isLogged) {
      setIsLogged(location.state.isLogged);
    }
    if (location.state && location.state.customer) {
      setCustomer(location.state.customer);
    }
  }, [location]);
  return <Header isLogged={isLogged} customer={customer} />;
}
