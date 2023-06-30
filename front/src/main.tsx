import CssBaseline from "@mui/material/CssBaseline";
import {createRoot} from 'react-dom/client'
import Router from './rooter/Router'
import './index.css'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import AuthProvider from "./providers/AuthProvider.tsx";
import {BrowserRouter, useLocation} from "react-router-dom";
import {StrictMode, useLayoutEffect} from "react";
import ModalProvider from "./providers/ModalProvider.tsx";
import SnackbarProvider from "react-mui-snackbar" ;


const theme = createTheme({
    palette: {
        primary: {
            main: '#FDFDFD',
            dark: '#FDFDFD',
        },
        secondary: {
            main: '#282C2B',
            dark: '#282C2B',
        },
        success: {
            main: '#00A99D',
            dark: '#00A99D',
        },
        info: {
            main: '#5B98D2',
            dark: '#5B98D276',
        },
        error: {
            main:'#E53F49',
            dark: '#E53F49',
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
    },
});

interface Props {
    children: Element | null
}

const Wrapper = ({children} : Props) => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <SnackbarProvider>
                    <ModalProvider>
                        <BrowserRouter>
                            <Wrapper>
                                <Router>
                                </Router>
                            </Wrapper>
                        </BrowserRouter>
                    </ModalProvider>
                </SnackbarProvider>
          </ThemeProvider>
      </AuthProvider>
  </StrictMode>,

)
