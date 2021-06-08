import React, { useState, useEffect } from "react";
import "./Customer.css";

import Loader from "../../Components/Loader/Loader";
import timestampConversion from "../../utils";
// import Button from "../../Components/Button/Button";

const customer = ({ customersData, customerLoader, fetchCustomers }) => {
  const [newCustomerForm, setNewCustomerForm] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const handleformSubmit = (e) => {
    e.preventDefault();
    fetch("https://rzp-training.herokuapp.com/team2/customers", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        contact: contact,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        fetchCustomers();
        setNewCustomerForm(!newCustomerForm);
        return response.json();
      })
      .then((json) => console.log());

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    let todaysDate = new Date(today);
    let timestamp =
      Date.UTC(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0) / 1000;
    let val = {
      name: name,
      contact: contact,
      email: email,
      created_at: timestamp,
    };
  };

  return (
    <div className="customer">
      {newCustomerForm && (
        <div className="customer__form">
          <h1>New Customer</h1>
          <form action="#">
            <div className="customer__formLineOne">
              <div className="customer__formName">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="customer__formPhone">
                <label for="contact">Contact</label>
                <input
                  type="tel"
                  id="contact"
                  onChange={(e) => setContact(e.target.value)}
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                />
              </div>
            </div>
            <div className="customer__formLineTwo">
              <div className="customer__formEmail">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="submit"
                onClick={(e) => handleformSubmit(e)}
                value="💾 Save Customer"
              />
            </div>
          </form>
        </div>
      )}
      {!newCustomerForm && (
        <>
          <div className="customer__header">
            <h1>Customers</h1>
            <button onClick={() => setNewCustomerForm(!newCustomerForm)}>
              + New Customer
            </button>
          </div>
          <div className="customer__content">
            {!customerLoader ? (
              <table className="customer__table">
                <tr>
                  <th>NAME</th>
                  <th>CONTACT</th>
                  <th>EMAIL</th>
                  <th>DATE</th>
                </tr>
                {customersData.map((customerData) => (
                  <tr key={customerData["id"]}>
                    <td>{customerData["name"]}</td>
                    <td>{customerData["contact"]}</td>
                    <td>{customerData["email"]}</td>
                    <td>{timestampConversion(customerData["created_at"])}</td>
                  </tr>
                ))}
              </table>
            ) : (
              <Loader />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default customer;
