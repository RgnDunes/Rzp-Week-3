import React, { useState, useEffect } from "react";

import Loader from "../../Components/Loader/Loader";
import "./Invoice.css";
import timestampConversion from "../../utils";
import dateToTimestampConversion from "../../utils";

let firstLoad = true;

const invoice = ({
  invoicesData,
  itemsData,
  customersData,
  invoiceLoader,
  fetchInvoices,
  fetchItems,
  fetchCustomers,
}) => {
  const [newInvoiceForm, setNewInvoiceForm] = useState(false);
  const [customerChosen, setCustomerChosen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([]);
  const [itemAdded, setItemAdded] = useState("");
  const [itemChosing, setItemChosing] = useState(false);
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("0");
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      fetchInvoices();
      firstLoad = false;
    }
  }, []);

  const openAddInvoiceForm = () => {
    fetchCustomers();
    fetchItems();
    setNewInvoiceForm(!newInvoiceForm);
  };

  const dateToTimestampConversion = (date) => {
    var yyyymmdd = date.split("-");
    var months = new Array(
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    );
    var _date =
      yyyymmdd[2].toString() +
      "-" +
      months[parseInt(yyyymmdd[1]) - 1] +
      "-" +
      yyyymmdd[0].toString();
    return new Date(_date).getTime() / 1000;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var _contact = "";
    var _email = "";
    customersData.map((customerData) => {
      if (customerData["name"] == customer) {
        _contact = customerData["contact"];
        _email = customerData["email"];
      }
    });
    var _items = [];
    var temp = {};
    items.map((item) => {
      temp = { item_id: item["id"], quantity: item["quantity"] };
      _items.push(temp);
    });
    fetch("https://rzp-training.herokuapp.com/team2/invoices", {
      method: "POST",
      body: JSON.stringify({
        customer: {
          name: customer,
          contact: _contact,
          email: _email,
        },
        comment: description,
        date: dateToTimestampConversion(issueDate),
        expire_by: dateToTimestampConversion(dueDate),
        line_items: _items,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        fetchInvoices();
        setNewInvoiceForm(!newInvoiceForm);
        return response.json();
      })
      .then((json) => console.log());

    let val = {
      customer_details: {
        customer_name: customer,
      },
      status: "issued",
      date: dateToTimestampConversion(issueDate),
      amount: totalAmount,
      amount_due: totalAmount,
    };
  };

  const handleQuantityUpdate = (quantity, itemName) => {
    var _items = [...items];
    var _total = 0;
    _items.map((_item) => {
      if (_item["name"] == itemName) {
        _item["quantity"] = quantity;
      }
      _total =
        _total + parseInt(_item["quantity"] || 0) * parseInt(_item["amount"]);
    });

    setItems(_items);
    setTotalAmount(_total);
  };

  const handleItemSelected = (e, value) => {
    e.preventDefault();
    setItemAdded(value);
    var seletedItemData = {};
    itemsData.map((itemData) => {
      if (itemData["name"] == value)
        seletedItemData = { ...itemData, quantity: "1" };
    });
    setItems([...items, seletedItemData]);

    var _total = parseInt(totalAmount);
    _total = _total + parseInt(seletedItemData["amount"]);
    setTotalAmount(_total);
    setSelectedItem([...selectedItem, value]);
    setItemChosing(false);
  };

  return (
    <div class="invoice">
      {newInvoiceForm && (
        <div class="invoice__form">
          <form action="#">
            <div class="invoice__formHeader">
              <h1>New Invoice</h1>
              <input
                type="submit"
                onClick={(e) => handleSubmit(e)}
                value="💾 Save Invoice"
              />
            </div>

            <div class="invoice__formRow">
              <div class="invoice__formRowCols invoice__custBill">
                <span class="custBill__header">Bill to</span>
                {customerChosen && (
                  <div class="custBill__select">
                    <select
                      name="customers"
                      onChange={(e) => setCustomer(e.target.value)}
                    >
                      <option value="">Choose a Customer</option>
                      {customersData.map((customerData) => (
                        <option
                          key={customerData["name"]}
                          value={customerData["name"]}
                        >
                          {customerData["name"]}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {!customerChosen && (
                  <div class="custBill__option">
                    <div class="custBill__optionLeft">No Customer Chosen</div>
                    <div
                      class="custBill__optionRight"
                      onClick={() => setCustomerChosen(!customerChosen)}
                    >
                      Choose
                    </div>
                  </div>
                )}
              </div>
              <div class="invoice__formRowCols">
                <div class="invoice__formData">
                  <label for="issue">Issued At</label>
                  <input
                    type="date"
                    id="issue"
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>
              </div>
              <div class="invoice__formRowCols">
                <div class="invoice__formData">
                  <label for="due">Due Date</label>
                  <input
                    type="date"
                    id="due"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div class="invoice__formRow">
              <table class="invoice__formTable">
                {items.length > 0 ? (
                  <>
                    <tr>
                      <th>Items</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                    {items.map((item) => (
                      <tr key={item["name"]}>
                        <td>{item["name"]}</td>
                        <td>
                          <input
                            type="number"
                            value={item["quantity"]}
                            onChange={(e) =>
                              handleQuantityUpdate(e.target.value, item["name"])
                            }
                          />
                        </td>
                        <td>{item["amount"]}</td>
                        <td>
                          {parseInt(item["amount"]) *
                            parseInt(item["quantity"]) || 0}
                        </td>
                        <td>🗑</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  ""
                )}
                {itemChosing ? (
                  <div class="custBill__select">
                    <select
                      name="items"
                      onChange={(e) => handleItemSelected(e, e.target.value)}
                    >
                      <option value="">Select Items</option>
                      {itemsData.map((itemData) => {
                        if (!selectedItem.includes(itemData["name"])) {
                          return (
                            <option
                              key={itemData["name"]}
                              value={itemData["name"]}
                            >
                              {itemData["name"]}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                ) : (
                  <tr>
                    <td colSpan="5" onClick={() => setItemChosing(true)}>
                      🧺 Add Item
                    </td>
                  </tr>
                )}
              </table>
            </div>

            <div class="invoice__formRow">
              <div class="invoice__formRowCols">
                <label for="notes">Notes</label>
                <textarea
                  name="notes"
                  id="notes"
                  placeholder="Write a description here"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div class="invoice__totalBill">
                {items.map((item) => (
                  <div class="totalBill__desc" key={item["name"]}>
                    <div class="totalBill__descLeft">{item["name"]}</div>
                    <div class="totalBill__descMiddle">
                      x{item["quantity"] || "0"}
                    </div>
                    <div class="totalBill__descRight">
                      {parseInt(item["quantity"]) * parseInt(item["amount"]) ||
                        "0"}
                    </div>
                  </div>
                ))}
                <div class="total__amount">
                  <div class="total__amountLeft">TOTAL AMOUNT</div>
                  <div class="total__amountRight">{totalAmount || "0"}</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {!newInvoiceForm && (
        <>
          <div class="invoice__header">
            <h1>Invoices</h1>
            <button onClick={openAddInvoiceForm}>+ New Invoice</button>
          </div>

          <div class="invoice__content">
            {!invoiceLoader ? (
              <table class="invoice__table">
                <tr>
                  <th>DATE</th>
                  <th>CUSTOMER</th>
                  <th>PAID STATUS</th>
                  <th>AMOUNT</th>
                  <th>AMOUNT DUE</th>
                </tr>

                {invoicesData.map((invoiceData) => (
                  <tr key={invoiceData["id"]}>
                    <td>{timestampConversion(invoiceData["date"])}</td>
                    <td>{invoiceData["customer_details"]["customer_name"]}</td>
                    <td>
                      <span
                        class={
                          invoiceData["status"] == "paid"
                            ? "status__paid"
                            : "status__issued"
                        }
                      >
                        {invoiceData["status"]}
                      </span>
                    </td>
                    <td>₹{invoiceData["amount"]}</td>
                    <td>₹{invoiceData["amount_due"]}</td>
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

export default invoice;
