import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image'

export const AppNavbar = ({ text, logo, popOver }) => {

    return (
        <AppBar position="fixed" color='primary' elevation={1}>
            <Toolbar sx={{
                width: '100%',
                maxWidth: 768,
                mx: 'auto'
            }}>
                { logo && (
                    <Image src={logo} alt="logo" width={170}/>
                )}
                { text && (
                    <Typography variant='h5'>{text}</Typography>
                )}
                <Box sx={{ flexGrow: 1 }} />
                {popOver}
                
            </Toolbar>
        </AppBar>
    )
}
