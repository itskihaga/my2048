import requreDir from "@/util/require-dir-js";
import { all } from 'redux-saga/effects';
const sagas = requreDir(require.context(".",false,/saga\.js$/));
export default function* (){
    yield all(sagas);
};