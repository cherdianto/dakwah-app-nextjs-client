import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Save from "@mui/icons-material/Save";
import Cancel from "@mui/icons-material/Cancel";
import axiosJWT from '@utils/axiosJWT';
import TextEditor from "@common/TextEditor";

const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -5%)',
    width: '100%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 2,
};

const ContentModal = ({ open, onClose, onSave }) => {
    const handleSaveAndCloseModal = (formData) => {
        onSave(formData)
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }
    return (
        <>
            <Modal open={open} onClose={onClose} sx={{
                overflow: 'scroll',
                // maxHeight: '100%'
                display: 'block'
            }}>
                <TextEditor style={style} isEdit={false} onCancel={() => handleCancel()} onSave={(formData) => handleSaveAndCloseModal(formData)} />
            </Modal>
        </>
    )
}

export default ContentModal