import Axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

function* deleteWord(action){
  try {
    yield Axios.delete('/api/words/'+action.payload.id);
    yield put({type: 'UNFLAG_WORD', payload: action.payload})
  } catch (error) {
    console.log('error deleteing word', error)
  }
}

export default function* flagWordSaga(){
  yield takeLatest('REMOVE_WORD', deleteWord);
};