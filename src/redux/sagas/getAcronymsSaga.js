import Axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Gets all the acronymns after the words have been stored in a session
function* getAcronyms(action){
  try {
    const results = yield Axios.get('/api/words');
    yield put({type: "SET_ACRONYMS", payload: results.data})
  } catch (error) {
    console.log('error getting acronyms', error)
  }
}

export default function* getAcronymsSaga(){
  yield takeLatest('GET_ACRONYMS', getAcronyms);
};