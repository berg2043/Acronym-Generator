import Axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Gets all the acronyms after the words have been stored in a session
function* getAcronyms(action){
  try {
    const response = yield Axios.get('/api/words/');
    yield put({type: "SET_ACRONYMS", payload: response.data.results})
    yield put({type: "COUNT", payload: response.data.count})
  } catch (error) {
    console.log('error getting acronyms', error)
  }
}

export default function* getAcronymsSaga(){
  yield takeLatest('GET_ACRONYMS', getAcronyms);
};