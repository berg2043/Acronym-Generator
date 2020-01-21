import Axios from "axios";
import { takeLatest } from "redux-saga/effects";

// Flags a word for admin review on the DB
function* flagWord(action){
  try {
    const toFlag = action.payload[Object.keys(action.payload)[0]].id
    yield Axios.post('/api/admin', {id: toFlag})
  } catch (error) {
    console.log('error posting flag', error)
  }
}

// Unflags a word on the DB
function* unflagWord(action){
  try {
    yield Axios.delete('/api/admin/'+action.payload.id);
  } catch (error) {
    console.log('error deleteing flag', error)
  }
}

export default function* flagWordSaga(){
  yield takeLatest('FLAG_WORD', flagWord);
  yield takeLatest('UNFLAG_WORD', unflagWord);
};