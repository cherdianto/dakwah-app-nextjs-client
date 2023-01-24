import { useState } from 'react';
import MoreIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import Router from 'next/router'
import axiosJWT from '@utils/axiosJWT';
import { useUser } from '@contexts/user.context';
import MateriModal from '@common/AddMateriModal';

// ----------------------------------------------------------------------

const MATERIMENU_ADMIN = [
    {
        value: 'add materi',
        label: 'Add Materi',
        icon: '/assets/icons/ic_flag_de.svg',
    },
    {
        value: 'sequence',
        label: 'Edit Sequence',
        icon: '/assets/icons/ic_flag_en.svg',
    }
];

// ----------------------------------------------------------------------

export default function MateriPopover({ onNewMateri }) {
    const [open, setOpen] = useState(null);
    const { user, setUser } = useUser()
    const [modalOpen, setModalOpen] = useState(false)

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = async (e) => {
        const target = e.target.id
        // console.log(e.target.id)
        setOpen(null);
        
        

        if(target === 'add materi') {
            // Router.push('/update-profile')
            console.log('add materi')
            setOpen(null)
            setModalOpen(true)
        } else if ( target === 'sequence'){
            console.log('sequence')
        }
    };

    const handleAddMateriSuccess = (res) => {
        console.log('handle add materi success')
        console.log(res)
        onNewMateri(res.data.newMateri)
    }

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
                    {MATERIMENU_ADMIN.map((option) => (
                        <MenuItem key={option.value} id={option.value} onClick={(e) => handleClose(e)}>
                            {/* <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}

                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>
            </Popover>
            <MateriModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={(data) => handleAddMateriSuccess(data)} />
        </>
    );
}