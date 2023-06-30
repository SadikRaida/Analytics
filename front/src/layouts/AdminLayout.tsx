import Header from "./Header.tsx";
import Box from "@mui/material/Box";
import {Outlet} from "react-router-dom";

export default function AdminLayout() {
    return (
        <>
            <Header/>
            <Box sx={{
                paddingTop:'100px',
                minHeight:'100vh',
            }}>
                <Outlet/>
            </Box>
        </>
    )
}