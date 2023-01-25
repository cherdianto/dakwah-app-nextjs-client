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
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const MateriModal = ({ open, onClose, onSave, title, description, label, isEdit }) => {
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    const [newLabel, setNewLabel] = useState(label)

    const handleSave = async () => {
        const formData = {
            description: newDescription,
            name: newTitle,
            label: newLabel
        }
        console.log('success')
        resetForm()
        onClose()
        onSave(formData)
    }

    const resetForm = () => {
        setNewDescription()
        setNewTitle()
        setNewLabel()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Grid container direction='column' sx={style} gap={2}>
                <Typography variant="h6" component="h2">
                    {isEdit ? 'EDIT MATERI' : 'ADD NEW MATERI'}
                </Typography>
                <TextField id="title" label="Title" variant="outlined" onChange={e => setNewTitle(e.target.value)} value={newTitle} sx={{ mt: 3 }} />
                <TextField id="label" label="Label" variant="outlined" onChange={e => setNewLabel(e.target.value)} value={newLabel} />
                <TextField id="description" label="Description" variant="outlined" onChange={e => setNewDescription(e.target.value)} value={newDescription} multiline maxRows={3} />
                {/* <ReactQuill value={description} onChange={setDescription} /> */}
                <Button startIcon={<Cancel onClick={onClose} />}  >Cancel</Button>
                <Button startIcon={<Save />} onClick={() => handleSave()} >Save</Button>
            </Grid>
        </Modal>
    )
}

export default MateriModal