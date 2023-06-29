import {createRoot} from 'react-dom/client'
import Router from './rooter/Router'
import {BrowserRouter, useLocation} from "react-router-dom";
import React, {StrictMode, useLayoutEffect} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme} from "@mui/material";

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
        {/*<AuthProvider>*/}
            <ThemeProvider theme={theme}>
                {/*<SnackbarProvider>*/}
                <CssBaseline/>
                        <BrowserRouter>
                            <Wrapper>
                                <Router>
                                </Router>
                            </Wrapper>
                        </BrowserRouter>
                {/*</SnackbarProvider>*/}
          </ThemeProvider>
      {/*</AuthProvider>*/}
  </StrictMode>,

)
