import AppBar from "@mui/material/AppBar";
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountPopover from "@common/AccountPopover.js";
// import MenuIcon from '@mui/icons-material/Menu';

export const AppNavbar = (props) => {
    return (
        <AppBar position="fixed" color='inherit' elevation={3}>
            <Toolbar variant="dense" sx={{
                width: '100%',
                maxWidth: 600,
                mx: 'auto'
            }}>
                <Typography variant='h6'>Profil</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <AccountPopover />
            </Toolbar>
        </AppBar>
    )
}