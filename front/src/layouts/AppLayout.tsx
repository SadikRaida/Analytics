import {Outlet} from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";

export default function AppLayout(){
    return (
        <>
            {/*<Header/>*/}
            <Box sx={{
                paddingTop:'100px',
                minHeight:'100vh',
                mb:12
            }}>
                <Outlet/>
            </Box>
        </>
    )
}