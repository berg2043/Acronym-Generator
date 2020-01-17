import Axios from "axios";
import { takeLatest, takeEvery, put } from "redux-saga/effects";

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
    yield put({type: 'GET_FAVORITES'});
  } catch (error) {
    console.log('error deleting favorites', error)
  }
}

function* getFavorites(action){
  try{
    const favorites = yield Axios.get('/api/favorites');
    yield put({type: 'SET_FAVORITES', payload: favorites.data});
  } catch (error) {
    console.log('error getting favorites', error)
  }
}

function* updateFavorite(action){
  try {
    yield Axios.put('/api/favorites', action.payload);
    yield put({type: 'GET_FAVORITES'});
  } catch (error) {
    console.log('error updating favorites', error)
  }
}

export default function* favoritesSaga(){
  yield takeLatest('ADD_FAVORITE', addFavorite);
  yield takeLatest('REMOVE_FAVORITE', removeFavorite);
  yield takeEvery('GET_FAVORITES', getFavorites);
  yield takeLatest('UPDATE_FAVORITE', updateFavorite);
};