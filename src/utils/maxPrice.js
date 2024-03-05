export const getMaxPrice = (properties) => {
  let maxPrice = 0;

  properties.forEach((property) => {
    if (property.price > maxPrice) {
      maxPrice = property.price;
    }
  });

  return maxPrice;
};
