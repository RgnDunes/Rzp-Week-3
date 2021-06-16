import React from "react";
import "./Button.css";

const Button = ({ color, value }) => {
  return <button style={{ color }} value={value} />;
};

export default Button;
