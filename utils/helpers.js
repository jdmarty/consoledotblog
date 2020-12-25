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
  first_sentence: (content) => {
    // get the first sentence of a post
    const firstSentence = content.match(/^.*?[\.!\?]/);
    if (firstSentence) return firstSentence[0]
    return content
  },
};
