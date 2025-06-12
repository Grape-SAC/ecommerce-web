import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../app/(checkout)/cart/slices/cart.slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "cart",
    storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        cart: persistedCartReducer, // Se pueden agregar más reducers aquí en el futuro
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