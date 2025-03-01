"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./index";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    typography: {
        fontSize: 13,
    },
    palette: {
        primary: {
            main: "#03A9F4", // Define el color primario
            light: "#E1F5FE",
            contrastText: "white",
        },
    },
    components: {
        // MuiInputLabel: {
        //     styleOverrides: {
        //         root: {
        //             fontSize: "14px", // Tamaño inicial del label
        //         },
        //         shrink: {
        //             fontSize: "15px", // Tamaño cuando se eleva
        //         },
        //     },
        // },
        // MuiInputBase: {
        //     styleOverrides: {
        //         root: {
        //             fontSize: "14px",
        //         },
        //     },
        // },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "14px", // Ajusta el tamaño de fuente en botones
                },
            },
        },
    },
});

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
