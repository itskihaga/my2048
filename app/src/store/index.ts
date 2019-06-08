import logger from 'redux-logger'
import sagas from '@/store/sagas'
import reducers from '@/store/reducers';
import { createStore ,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

console.log(sagas)

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,applyMiddleware(sagaMiddleware,logger));
const run = () => sagaMiddleware.run(sagas)

export {store,run}