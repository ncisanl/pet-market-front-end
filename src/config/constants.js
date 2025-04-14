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
  myPosts: `${URLBASE}/my-posts`,
  favorites: `${URLBASE}/user/favorite`,
  addPostFavorite: `${URLBASE}/favorite`,
  deletePostFavorite: `${URLBASE}/favorite/:favoriteId`,
  cart: `${URLBASE}/cart`,
  createCart: `${URLBASE}/cart`,
  deleteCart: `${URLBASE}/cart/:cartId`,
  addPostCart: `${URLBASE}/cart/:cartId`,
  deletePostCart: `${URLBASE}/cart/:cartId/post/:postId`,
  modifyPostCart: `${URLBASE}/cart/:cartId/post/:postId/quantity/:quantity`,
};
