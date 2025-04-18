const Handlebars = require("handlebars");

const registerHelpers = () => {
  Handlebars.registerHelper("format", function (value) {
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
    return new Date(date).toLocaleDateString();
  });

  Handlebars.registerHelper("hasServiceDate", function (lineItems) {
    return lineItems.some((item) => item.serviceDate);
  });
};

module.exports = { registerHelpers };
