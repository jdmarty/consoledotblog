module.exports = {
  format_date: (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    // Format date as MM/DD/YYYY
    return date.toLocaleString(undefined, options);
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};
