import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cart.slice';
import authReducer from './slices/auth.slice';
import checkoutReducer from './slices/checkout.slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "cart",
    storage,
};

const authPersistConfig = {
    key: 'auth',
    storage,
};

const checkoutPersistConfig = {
    key: 'checkout',
    storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCheckoutReducer = persistReducer(checkoutPersistConfig, checkoutReducer);

export const store = configureStore({
    reducer: {
        cart: persistedCartReducer, // Se pueden agregar más reducers aquí en el futuro
        auth: persistedAuthReducer,
        checkout: persistedCheckoutReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ignorar las acciones relacionadas con la persistencia
                ignoredPaths: ['register'], // Ignorar una parte específica del estado
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;