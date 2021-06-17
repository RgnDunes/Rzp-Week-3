import React from "react";
import Customer from "../Customer";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// afterEach(() => {
//   cleanup(); //gets specified by default
// });

describe("Customer Component", () => {
  const checkCustomerNameValidation = (name) => {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(name)) {
      return false;
    } else {
      return true;
    }
  };

  const checkContactValidation = (contact) => {
    var regContactNumber =
      /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    if (!regContactNumber.test(contact.toString())) {
      return false;
    } else {
      return true;
    }
  };

  const checkEmailValidation = (email) => {
    const regEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(String(email).toLowerCase())) {
      return false;
    } else {
      return true;
    }
  };

  describe("Name Input Field Test", () => {
    test("'Divyansh' is false", () => {
      expect(checkCustomerNameValidation("Divyansh")).toEqual(false);
    });

    test("'Divyansh Singh' is true", () => {
      expect(checkCustomerNameValidation("Divyansh Singh")).toEqual(true);
    });

    test("'alpha@razorpay.com' is false", () => {
      expect(checkCustomerNameValidation("alpha@razorpay.com")).toEqual(false);
    });

    test("'1234567890' is false", () => {
      expect(checkCustomerNameValidation("1234567890")).toEqual(false);
    });

    test("12345 is false", () => {
      expect(checkCustomerNameValidation(12345)).toEqual(false);
    });

    test("'(Divyansh Singh' is false", () => {
      expect(checkCustomerNameValidation("(Divyansh Singh")).toEqual(false);
    });
  });

  describe("Contact Input Field Test", () => {
    test("'Divyansh' is false", () => {
      expect(checkContactValidation("Divyansh")).toEqual(false);
    });

    test("'Divyansh Singh' is false", () => {
      expect(checkContactValidation("Divyansh Singh")).toEqual(false);
    });

    test("'alpha@razorpay.com' is false", () => {
      expect(checkContactValidation("alpha@razorpay.com")).toEqual(false);
    });

    test("'1234567890' is true", () => {
      expect(checkContactValidation("1234567890")).toEqual(true);
    });

    test("12345 is false", () => {
      expect(checkContactValidation(12345)).toEqual(false);
    });

    test("'1234512345' is true", () => {
      expect(checkContactValidation(1234512345)).toEqual(true);
    });

    test("'(Divyansh Singh' is false", () => {
      expect(checkContactValidation("(Divyansh Singh")).toEqual(false);
    });
  });

  describe("Email Input Field Test", () => {
    test("'Divyansh' is false", () => {
      expect(checkEmailValidation("Divyansh")).toEqual(false);
    });

    test("'Divyansh Singh' is false", () => {
      expect(checkEmailValidation("Divyansh Singh")).toEqual(false);
    });

    test("'alpha@razorpay.com' is true", () => {
      expect(checkEmailValidation("alpha@razorpay.com")).toEqual(true);
    });

    test("'alpha@razorpay' is false", () => {
      expect(checkEmailValidation("alpha@razorpay")).toEqual(false);
    });

    test("'alpharazorpay.com' is false", () => {
      expect(checkEmailValidation("alpharazorpay.com")).toEqual(false);
    });

    test("'1234567890' is false", () => {
      expect(checkEmailValidation("1234567890")).toEqual(false);
    });

    test("12345 is false", () => {
      expect(checkEmailValidation(12345)).toEqual(false);
    });

    test("'1234512345' is false", () => {
      expect(checkEmailValidation(1234512345)).toEqual(false);
    });

    test("'(Divyansh Singh' is false", () => {
      expect(checkEmailValidation("(Divyansh Singh")).toEqual(false);
    });
  });
});

test("Page Header with correct text", () => {
  const { getByTestId } = render(<Customer />);
  const headerEl = getByTestId("custTableHeader");

  expect(headerEl.textContent).toBe("Customers");
});

test("New Customer Btn with correct text", () => {
  const { getByTestId } = render(<Customer />);
  const NewCustBtn = getByTestId("newCustBtn");

  expect(NewCustBtn.textContent).toBe("+ New Customer");
});

test("Form Page Header with correct text", () => {
  const { getByTestId } = render(<Customer />);
  const newCustBtn = getByTestId("newCustBtn");
  fireEvent.click(newCustBtn);
  const headerEl = getByTestId("custFormHeader");

  expect(headerEl.textContent).toBe("New Customer");
});

test("changing name input value", () => {
  const { getByTestId } = render(<Customer />);
  const newCustBtn = getByTestId("newCustBtn");
  fireEvent.click(newCustBtn);
  const custNameInput = getByTestId("custNameInput");

  expect(custNameInput.value).toBe("");

  fireEvent.change(custNameInput, {
    target: {
      value: "Divyansh Singh",
    },
  });

  expect(custNameInput.value).toBe("Divyansh Singh");
});

test("changing contact input value", () => {
  const { getByTestId } = render(<Customer />);
  const newCustBtn = getByTestId("newCustBtn");
  fireEvent.click(newCustBtn);
  const custContactInput = getByTestId("custContactInput");

  expect(custContactInput.value).toBe("");

  fireEvent.change(custContactInput, {
    target: {
      value: "1234567890",
    },
  });

  expect(custContactInput.value).toBe("1234567890");
});

test("changing email input value", () => {
  const { getByTestId } = render(<Customer />);
  const newCustBtn = getByTestId("newCustBtn");
  fireEvent.click(newCustBtn);
  const custEmailInput = getByTestId("custEmailInput");

  expect(custEmailInput.value).toBe("");

  fireEvent.change(custEmailInput, {
    target: {
      value: "divyansh.singh@razorpay.com",
    },
  });

  expect(custEmailInput.value).toBe("divyansh.singh@razorpay.com");
});

describe("customer input forme text has correct classnames", () => {
  test("customer name input has correct classname", () => {
    const { getByTestId } = render(<Customer />);
    const newCustBtn = getByTestId("newCustBtn");
    fireEvent.click(newCustBtn);
    const custNameInput = getByTestId("custNameInput");
    expect(custNameInput.textContent).toBe("");
    expect(custNameInput.className).toBe("");

    fireEvent.change(custNameInput, {
      target: {
        value: "Divyansh",
      },
    });
    expect(custNameInput.className).toBe("invalidInput");

    fireEvent.change(custNameInput, {
      target: {
        value: "Divyansh Singh",
      },
    });
    expect(custNameInput.className).toBe("validInput");
  });

  test("customer contact input has correct classname", () => {
    const { getByTestId } = render(<Customer />);
    const newCustBtn = getByTestId("newCustBtn");
    fireEvent.click(newCustBtn);
    const custContactInput = getByTestId("custContactInput");
    expect(custContactInput.textContent).toBe("");
    expect(custContactInput.className).toBe("");

    fireEvent.change(custContactInput, {
      target: {
        value: "123",
      },
    });
    expect(custContactInput.className).toBe("invalidInput");

    fireEvent.change(custContactInput, {
      target: {
        value: "1234567890",
      },
    });
    expect(custContactInput.className).toBe("validInput");
  });

  test("customer email input has correct classname", () => {
    const { getByTestId } = render(<Customer />);
    const newCustBtn = getByTestId("newCustBtn");
    fireEvent.click(newCustBtn);
    const custEmailInput = getByTestId("custEmailInput");
    expect(custEmailInput.textContent).toBe("");
    expect(custEmailInput.className).toBe("");

    fireEvent.change(custEmailInput, {
      target: {
        value: "divyanshsinghrazorpay.com",
      },
    });
    expect(custEmailInput.className).toBe("invalidInput");

    fireEvent.change(custEmailInput, {
      target: {
        value: "divyansh.singh@razorpay.com",
      },
    });
    expect(custEmailInput.className).toBe("validInput");
  });
});
