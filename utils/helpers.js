module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  truncate_text: (passedString) => {
    // Truncates text to 100 characters max
    var theString = passedString.substring(0, 100);
    return theString;
  },
  compare: function (a, b, opts) {
    // Compares two variables
    if (a === b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
  random_image: () => {
    // Sends a random image path
    let array = [
      '/alexandra-tran-_ieSbbgr3_I-unsplash.jpg',
      '/angelica-echeverry-iZlMuVu9luM-unsplash.jpg',
      '/annie-spratt-CQ2YvMAN7zE-unsplash.jpg',
      '/AYU_002.jpeg',
      '/johanne-kristensen-XYkc3MfT7b4-unsplash.jpg',
      '/karly-jones-jaV6cvSEqao-unsplash.jpg',
      '/laura-chouette-0uO0m798HmU-unsplash.jpg',
      '/MM3_002.jpeg',
      '/MM3_019C.jpeg',
      '/nati-melnychuk-I-6Ap7JXHq8-unsplash.jpg',
      '/valeriia-miller-_42NKYROG7g-unsplash.jpg',
    ];
    getImagePath = array[Math.floor(Math.random() * array.length)];
    return getImagePath;
  },
  limit: (arr, limit) => {
    if (!Array.isArray(arr)) {
      return [];
    }
    // Reverses array and limits varibles to a specific number to get the latest reviews
    return arr.reverse().slice(0, limit);
  },
  latest: (arr) => {
    // Reverses array to get the latest reviews
    return arr.reverse();
  },
};
