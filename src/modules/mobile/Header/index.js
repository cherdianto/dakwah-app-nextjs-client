import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/icons-material/Menu";


const Header = () => {
    return (
        <Box sx={{ flex: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" aria-label="menu" sx={{ marginRight: theme.spacing(2) }}>
                        <Menu />
                    </IconButton>
                    <Link href={"/"}>
                        <Typography variant="h6">
                            Dakwah Bot
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header