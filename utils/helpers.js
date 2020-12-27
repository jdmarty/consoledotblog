module.exports = {
  format_date: (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString(undefined, options);
  },

  format_dateShort: (date) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleString(undefined, options);
  },
  first_sentence: (content) => {
    // get the first sentence of a post
    const firstSentence = content.match(/^.*?[\.!\?]/);
    if (firstSentence) return firstSentence[0]
    return content
  },
};
