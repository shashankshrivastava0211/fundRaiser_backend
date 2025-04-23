const checkValid = (body) => {
  console.log("from check valid", body);
  const { title, description, goal, image, category } = body;
  if (!title || !description || !goal || !category) {
    return false;
  }
  return true;
};
module.exports = checkValid;
