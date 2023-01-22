import { useState } from 'react';
import MoreIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';

// ----------------------------------------------------------------------

const ACCOUNTMENU = [
    {
        value: 'edit',
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

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
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
                        <MenuItem key={option.value} selected={option.value === ACCOUNTMENU[0].value} onClick={() => handleClose()}>
                            {/* <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}

                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>
            </Popover>
        </>
    );
}