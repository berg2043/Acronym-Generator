import Axios from "axios";
import { takeLatest } from "redux-saga/effects";

function* addFavorite(action){
  try {
    yield Axios.post('/api/favorites', action.payload)
  } catch (error) {
    console.log('error posting favorites', error)
  }
}

function* removeFavorite(action){
  try {
    yield Axios.delete('/api/favorites', {data: action.payload})
  } catch (error) {
    console.log('error deleting favorites', error)
  }
}

export default function* favoritesSaga(){
  yield takeLatest('ADD_FAVORITE', addFavorite);
  yield takeLatest('REMOVE_FAVORITE', removeFavorite);
};