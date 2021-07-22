import {applyMiddleware,compose,createStore,combineReducers} from 'redux'
import thunk from 'redux-thunk'

import AuthReducer from './reducers/auth'

const reducers = combineReducers({
    auth:AuthReducer
})

const storeConfig = () => {
    return createStore(reducers,compose(applyMiddleware(thunk)))
}

export default storeConfig