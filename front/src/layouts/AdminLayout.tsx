import Box from "@mui/material/Box";
import {Outlet} from "react-router-dom";
import {Table} from "./Components/Table";
import Header from "./Header";

export default function AdminLayout() {
    return (
        <>
            <Box sx={{
                paddingTop:'100px',
                minHeight:'100vh',
            }}>
                <Outlet/>
            </Box>
        </>
    )
}