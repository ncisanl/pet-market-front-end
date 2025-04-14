// export const URLBASE = "http://localhost:3000/pet-market"; //TODO: Local
export const URLBASE = "https://pet-market-back-end.onrender.com/pet-market"; //TODO: Prod

export const ENDPOINT = {
  regions: `${URLBASE}/regions`,
  communes: `${URLBASE}/communes`,
  petType: `${URLBASE}/pet-type`,
  category: `${URLBASE}/category`,
  login: `${URLBASE}/login`,
  register: `${URLBASE}/register`,
  profile: `${URLBASE}/user/profile`,
  profileUpdate: `${URLBASE}/user/profile/update`,
  postCategoryPetType: `${URLBASE}/posts/pet-type/:petTypeId/category/:categoryId`,
  postDetail: `${URLBASE}/post/:postId`,
  myPosts: `${URLBASE}/my-posts`,
  postsSales: `${URLBASE}/posts/sale`,
  post: `${URLBASE}/posts`,
  postDelete: `${URLBASE}/posts/:postId`,
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
