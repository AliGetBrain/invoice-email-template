const Handlebars = require("handlebars");

const registerHelpers = () => {
  Handlebars.registerHelper("formatValue", function (value) {
    if (typeof value === "number") {
      const isNegative = value < 0;
      const absValue = Math.abs(value);
      return isNegative ? `-$${absValue.toFixed(2)}` : `$${value.toFixed(2)}`;
    }
    return `$${value}`;
  });

  Handlebars.registerHelper("and", function (value1, value2) {
    if (value1 && value2) {
      return true;
    } else {
      return false;
    }
  });

  Handlebars.registerHelper("tripleOr", function (value1, value2, value3) {
    if (value1 || value2 || value3) {
      return true;
    } else {
      return false;
    }
  });

  Handlebars.registerHelper("equals", function (a, b) {
    return a === b;
  });

  Handlebars.registerHelper("notEquals", function (a, b) {
    return a !== b;
  });

  Handlebars.registerHelper("greaterThan", function (a, b) {
    return a > b;
  });

  Handlebars.registerHelper("startsWith", function (str, prefix) {
    if (typeof str !== "string") return false;
    return str.startsWith(prefix);
  });

  Handlebars.registerHelper("formatDate", function (date) {
    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) return date;

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${month}/${day}/${year}`;
  });

  Handlebars.registerHelper("hasServiceDate", function (lineItems) {
    return lineItems.some((item) => item.serviceDate);
  });

  Handlebars.registerHelper("checkOverDue", function (dueDate) {
    const dueDateObj = new Date(dueDate);
    const now = new Date();
    return now > dueDateObj;
  });

  Handlebars.registerHelper("contains", function (array, field) {
    if (!array || !Array.isArray(array)) {
      return false;
    }

    return array.some((item) => {
      return item[field] !== undefined && item[field] !== null;
    });
  });
};

module.exports = { registerHelpers };
