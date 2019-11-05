//helper to capitalize string
exports.capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// helper to flatten array:
exports.flatten = arr => {
  return [].concat(...arr);
};
