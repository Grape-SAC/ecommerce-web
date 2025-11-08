import { configureStore } from '@reduxjs/toolkit';
import carritoReducer from './slices/carrito.slice';
import authReducer from './slices/autenticacion.slice';
import checkoutReducer from './slices/finaliza-compra.slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const configuracionPersistenciaCarrito = {
    key: "carrito",
    storage,
};

const configuracionPersistenciaAuth = {
    key: 'auth',
    storage,
};

const configuracionPersistenciaFinalizaCompra = {
    key: 'finaliza-compra',
    storage,
};

const carritoPersistido = persistReducer(configuracionPersistenciaCarrito, carritoReducer);
const authPersistido = persistReducer(configuracionPersistenciaAuth, authReducer);
const finalizaCompraPersistido = persistReducer(configuracionPersistenciaFinalizaCompra, checkoutReducer);

export const store = configureStore({
    reducer: {
        carrito: carritoPersistido, // Se pueden agregar más reducers aquí en el futuro
        auth: authPersistido,
        checkout: finalizaCompraPersistido
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