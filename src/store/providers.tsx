"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./index";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from '@/theme';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <CssBaseline /> {/* Resetea estilos base */}
                    {children}
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
