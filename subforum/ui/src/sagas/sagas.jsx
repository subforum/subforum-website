import { takeEvery, delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'


// Send invitation
export function* doSomething() {
    
}

// Our watcher Sagas
export function* watchSomething() {
    yield* takeEvery('DO_SOMETHING', doSomething)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        watchSomething()
    ]
}