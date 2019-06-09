import logger from 'redux-logger'
import reducers from '@/store/reducers';
import { createStore ,applyMiddleware } from 'redux';

// import sagas from '@/store/sagas'
// import createSagaMiddleware from 'redux-saga';

import tasks from "@/store/tasks"
import reduxTask from "redux-tasks"

// console.log(sagas)

// const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,applyMiddleware(reduxTask(tasks),logger));
// const run = () => sagaMiddleware.run(sagas)

export {store}