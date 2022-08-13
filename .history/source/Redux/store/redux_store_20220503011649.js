import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore , applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../Reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        "reducer"
    ],
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(ReduxThunk),
);

let persistor = persistStore(store);

export {
    store,
    persistor,
};