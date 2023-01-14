import Link from "next/link";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Menu } from "@mui/icons-material";


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