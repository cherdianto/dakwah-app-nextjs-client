import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    // maxWidth: 500,
    // bgcolor: 'background.paper',
    //   border: '2px solid #000',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const DeleteDialog = ({ open, onClose, onSave, onDelete, title }) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={style}
        >
            <DialogTitle id="alert-dialog-title">
                Konfirmasi hapus - {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Apakah Anda yakin akan menghapus materi ini?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Batal</Button>
                <Button onClick={onDelete} autoFocus>
                   Saya Yakin
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog