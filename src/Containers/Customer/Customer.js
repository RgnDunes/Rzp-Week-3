import React, { useState, useEffect } from "react";
import "./Customer.css";

import Loader from "../../Components/Loader/Loader";
import timestampConversion from "../../utils";

const customer = ({ customersData, customerLoader, fetchCustomers }) => {
  const [newCustomerForm, setNewCustomerForm] = useState(false);
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [contact, setContact] = useState("");
  const [validContact, setValidContact] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const checkCustomerNameValidation = () => {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(name)) {
      setValidName(false);
    } else {
      setValidName(true);
    }
  };

  const checkEmailValidation = () => {
    const regEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(String(email).toLowerCase())) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const checkContactValidation = () => {
    var regContactNumber =
      /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    if (!regContactNumber.test(contact.toString())) {
      setValidContact(false);
    } else {
      setValidContact(true);
    }
  };

  useEffect(() => {
    checkCustomerNameValidation();
  }, [name]);

  useEffect(() => {
    checkEmailValidation();
  }, [email]);

  useEffect(() => {
    checkContactValidation();
  }, [contact]);

  const handleformSubmit = (e) => {
    e.preventDefault();
    if (validName && validEmail && validContact) {
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
    } else {
      alert("Please enter valid details .");
    }
  };

  return (
    <div className="customer">
      {newCustomerForm && (
        <div className="customer__form">
          <h1 data-testid="custFormHeader">New Customer</h1>
          <form action="#">
            <div className="customer__formLineOne">
              <div className="customer__formName">
                <label for="name">
                  Name{" "}
                  {name.length > 0 && !validName && (
                    <span className="errorMessage">[Invalid Name]*</span>
                  )}
                </label>
                <input
                  data-testid="custNameInput"
                  className={`${
                    name.length > 0
                      ? validName
                        ? "validInput"
                        : "invalidInput"
                      : ""
                  }`}
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="customer__formPhone">
                <label for="contact">
                  Contact{" "}
                  {contact.toString().length > 0 && !validContact && (
                    <span className="errorMessage">
                      [Invalid Contact Number]*
                    </span>
                  )}
                </label>
                <input
                  data-testid="custContactInput"
                  className={`${
                    contact.toString().length > 0
                      ? validContact
                        ? "validInput"
                        : "invalidInput"
                      : ""
                  }`}
                  type="tel"
                  id="contact"
                  onChange={(e) => setContact(e.target.value)}
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  value={contact}
                />
              </div>
            </div>
            <div className="customer__formLineTwo">
              <div className="customer__formEmail">
                <label for="email">
                  Email{" "}
                  {email.length > 0 && !validEmail && (
                    <span className="errorMessage">[Invalid Email]*</span>
                  )}
                </label>
                <input
                  data-testid="custEmailInput"
                  className={`${
                    email.length > 0
                      ? validEmail
                        ? "validInput"
                        : "invalidInput"
                      : ""
                  }`}
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <input
                data-testid="newCustSubmitBtn"
                type="submit"
                onClick={(e) => handleformSubmit(e)}
                value="Save Customer"
              />
            </div>
          </form>
        </div>
      )}
      {!newCustomerForm && (
        <>
          <div className="customer__header">
            <h1 data-testid="custTableHeader">Customers</h1>
            <button
              data-testid="newCustBtn"
              onClick={() => setNewCustomerForm(!newCustomerForm)}
            >
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
                {customersData?.map((customerData) => (
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
