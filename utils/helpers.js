module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    // return date.toLocaleDateString();
  },
  truncate_text: (passedString) => {
    // Truncates text to 100 characters max
    var theString = passedString.substring(0, 100);
    return theString;
  },
  compare: function (a, b, opts) {
    if (a === b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  }
};


