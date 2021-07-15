import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

import Customer from "./Containers/Customer/Customer";
import Item from "./Containers/Item/Item";
import Invoice from "./Containers/Invoice/Invoice";

const App = () => {
  const [customerLoader, setCustomerLoader] = useState(true);
  const [itemLoader, setItemLoader] = useState(true);
  const [invoiceLoader, setInvoiceLoader] = useState(true);
  const [customersData, setCustomersData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);
  const [urlData, setUrlData] = useState("/customers");

  const fetchCustomers = () => {
    setCustomerLoader(true);
    fetch("https://rzp-training.herokuapp.com/team2/customers")
      .then((response) => {
        setCustomerLoader(false);
        return response.json();
      })
      .then((json) => {
        setCustomersData(json["items"]);
      });
  };
  const fetchItems = () => {
    setItemLoader(true);
    fetch("https://rzp-training.herokuapp.com/team2/items")
      .then((response) => {
        setItemLoader(false);
        return response.json();
      })
      .then((json) => {
        setItemsData(json["items"]);
      });
  };
  const fetchInvoices = () => {
    setInvoiceLoader(true);
    fetch("https://rzp-training.herokuapp.com/team2/invoices")
      .then((response) => {
        setInvoiceLoader(false);
        return response.json();
      })
      .then((json) => {
        setInvoicesData(json["items"]);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="body">
      <Router>
        <div className="container">
          <div className="left">
            <Link to="/customers">
              <h1
                className={urlData == "/customers" && "selected"}
                onClick={() => setUrlData("/customers")}
              >
                👨‍👧 Customers
              </h1>
            </Link>
            <Link to="/items">
              <h1
                className={urlData == "/items" && "selected"}
                onClick={() => setUrlData("/items")}
              >
                ★ Items
              </h1>
            </Link>
            <Link to="/invoices">
              <h1
                className={urlData == "/invoices" && "selected"}
                onClick={() => setUrlData("/invoices")}
              >
                📄 Invoices
              </h1>
            </Link>
          </div>
          <div className="right">
            <Switch>
              <Route path="/items">
                <Item
                  fetchItems={fetchItems}
                  itemsData={itemsData}
                  itemLoader={itemLoader}
                />
              </Route>
              <Route path="/invoices">
                <Invoice
                  fetchInvoices={fetchInvoices}
                  fetchItems={fetchItems}
                  fetchCustomers={fetchCustomers}
                  invoicesData={invoicesData}
                  itemsData={itemsData}
                  customersData={customersData}
                  invoiceLoader={invoiceLoader}
                />
              </Route>
              <Route path={["/", "/customers"]}>
                <Customer
                  fetchCustomers={fetchCustomers}
                  customersData={customersData}
                  customerLoader={customerLoader}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
