// Holds user info and clears it on logout
export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'REMOVE_USER':
      return {};
    default:
      return state;
  }
};