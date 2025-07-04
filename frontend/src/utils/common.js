export const updateFavourite = (id, favourites) => {
  if (favourites?.includes(id)) {
    return favourites.filter((resId) => resId !== id);
  } else {
    return [...favourites, id];
  }
};

export const checkFavourites = (id, favourites) => {
  return favourites?.includes(id) ? "#8ac243" : "white";
};

// membuat validate untuk form county, city dan address
export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleast 3 characters"
    : null;
};
