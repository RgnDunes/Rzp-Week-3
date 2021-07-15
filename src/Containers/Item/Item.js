import React, { useState, useEffect } from "react";

import Loader from "../../Components/Loader/Loader";
import "./Item.css";
import timestampConversion from "../../utils";

let firstLoad = true;

const Item = ({ itemsData, itemLoader, fetchItems }) => {
  const [newItemForm, setNewItemForm] = useState(false);
  const [name, setName] = useState("");
  const [amount, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (firstLoad) {
      fetchItems();
      firstLoad = false;
    }
  }, []);

  const handleformSubmit = (e) => {
    e.preventDefault();
    fetch("https://rzp-training.herokuapp.com/team2/items", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        amount: amount,
        currency: "INR",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        fetchItems();
        setNewItemForm(!newItemForm);
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
      description: description,
      amount: amount,
      created_at: timestamp,
    };
  };

  return (
    <div className="item">
      {newItemForm && (
        <div className="item__form">
          <h1>New Item</h1>
          <form action="#">
            <div className="item__formName">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="item__formPrice">
              <label for="amount">Amount</label>
              <input
                type="text"
                id="amount"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="item__formDesc">
              <label for="description">Description</label>
              <textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <input
              type="submit"
              onClick={(e) => handleformSubmit(e)}
              value="💾 Save Item"
            />
          </form>
        </div>
      )}
      {!newItemForm && (
        <>
          <div className="item__header">
            <h1>Items</h1>
            <button onClick={() => setNewItemForm(!newItemForm)}>
              + New Item
            </button>
          </div>
          <div className="item__content">
            {!itemLoader ? (
              <table className="item__table">
                <tr>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>AMOUNT</th>
                  <th>ADDED ON</th>
                </tr>
                {itemsData.map((itemData) => (
                  <tr key={itemData["id"]}>
                    <td>{itemData["name"]}</td>
                    <td>{itemData["description"]}</td>
                    <td>₹{itemData["amount"]}</td>
                    <td>{timestampConversion(itemData["created_at"])}</td>
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

export default Item;
