export const calculateAverageRating = (reviewsData) => {
    // Check if reviewsData is an array
    if (!Array.isArray(reviewsData)) {
      return 0;
    }
  
    // Check if any reviews exist
    if (reviewsData.length === 0) {
      return 0; // Return 0 for no reviews
    }
  
    // Calculate the total rating by summing individual ratings
    const totalRating = reviewsData.reduce((acc, review) => {
      // Check if each review object has a rating property
      if (typeof review.rating !== 'number') {
        throw new Error('Each review object must have a "rating" property');
      }
      return acc + review.rating;
    }, 0);
  
    // Calculate the average rating by dividing by the number of reviews
    return totalRating / reviewsData.length;
  }