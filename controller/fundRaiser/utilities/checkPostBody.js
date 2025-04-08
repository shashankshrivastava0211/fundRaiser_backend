const checkValid = (body) => {
  const { title, description, goal, image, category, location } = body;
  if (!title || !description || !goal || !image || !category || !location) {
    return false;
  }
  return true;
};
module.exports = checkValid;
