export const URLBASE = "http://localhost:3000/pet-market";

export const ENDPOINT = {
  regions: `${URLBASE}/regions`,
  communes: `${URLBASE}/communes`,
  login: `${URLBASE}/login`,
  register: `${URLBASE}/register`,
  profile: `${URLBASE}/user/profile`,
  profileUpdate: `${URLBASE}/user/profile/update`,
  postCategoryPetType: `${URLBASE}/posts/pet-type/:petTypeId/category/:categoryId`,
  postDetail: `${URLBASE}/post/:postId`,
  favorites: `${URLBASE}/user/favorite`,
  addPostFavorite: `${URLBASE}/favorite`,
  deletePostFavorite: `${URLBASE}/favorite/:favoriteId`,
  createCart: `${URLBASE}/cart`,
  addPostCart: `${URLBASE}/cart/:cartId`,
  deleteCart: `${URLBASE}/cart/:cartId`,
};
