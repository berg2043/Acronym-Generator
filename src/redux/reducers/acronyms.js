export default (state = [], action) => {
  switch (action.type) {
    case 'SET_ACRONYMS':
      return action.payload;
    default:
      return state;
  }
};