import { useState } from 'react';
import MoreIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import Router from 'next/router'
import axiosJWT from '@utils/axiosJWT';
import axios from 'axios';
import { useUser } from '@contexts/user.context';

// ----------------------------------------------------------------------
const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD
const ACCOUNTMENU = [
    {
        value: 'edit profile',
        label: 'Edit Profile',
        icon: '/assets/icons/ic_flag_de.svg',
    },
    {
        value: 'logout',
        label: 'Logout',
        icon: '/assets/icons/ic_flag_en.svg',
    }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const [open, setOpen] = useState(null);
    const { user, setUser } = useUser()

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };
    const handleClose = async (e) => {
        const target = e.target.id
        setOpen(null);
        
        

        if(target === 'edit profile') {
            Router.push('/update-profile')
        } else if ( target === 'logout'){
            try {
                const res = await axios.get(`${apiUrl}/auth/logout`, {withCredentials: true})
                
                if(res.data.status === true){
                    Router.push('/login')
                }
                
            } catch (error) {
                // console.log(error)
            }

            setUser()
        }
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    padding: 0,
                      width: 44,
                      height: 44,
                    ...(open && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                    }),
                }}
            >
                <MoreIcon />
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 1,
                        },
                    },
                }}
            >
                <Stack spacing={0.75}>
                    {ACCOUNTMENU.map((option) => (
                        <MenuItem key={option.value} id={option.value} onClick={(e) => handleClose(e)}>
                            {/* <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}

                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>
            </Popover>
        </>
    );
}