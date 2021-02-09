import { combineReducers, configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
}
const store: Store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({})),
  middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), logger],
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
