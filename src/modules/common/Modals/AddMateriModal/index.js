import React, { useState, useEffect } from "react";
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
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 2
};

const MateriModal = ({ open, onClose, onSave, dataToEdit, isEdit }) => {

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: dataToEdit?.name || '',
            label: dataToEdit?.label || '',
            description: dataToEdit?.description || '',
            status: dataToEdit?.status || 'draft'
        },
        onSubmit: (values, { resetForm }) => {
            const formData = {
                description: values.description,
                name: values.title,
                label: values.label,
                status: values.status
            }

            // console.log(formData)

            resetForm({values: ''})
            onClose()
            onSave(formData)
        }
    })

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false
            }}>
                <Grid container direction='column' sx={style} gap={2}>

                    <Typography variant="h6" component="h2">
                        {isEdit ? 'EDIT MATERI' : 'ADD NEW MATERI'}
                    </Typography>
                    <TextField id="title" label="Title" variant="outlined" onChange={validation.handleChange} value={validation.values.title} sx={{ mt: 3 }} />
                    <TextField id="label" label="Label" variant="outlined" onChange={validation.handleChange} value={validation.values.label} />
                    <TextField id="description" label="Description" variant="outlined" onChange={validation.handleChange} value={validation.values.description} multiline maxRows={3} />
                    <FormControl fullWidth>
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                            fullWidth
                            id="status"
                            type='select'
                            name='status'
                            value={validation.values.status}
                            label='Status'
                            labelId='status'
                            onChange={validation.handleChange}
                            sx={{
                                mb: 2
                            }}
                        >
                            <MenuItem value={'active'}>Active</MenuItem>
                            <MenuItem value={'inactive'}>Inactive</MenuItem>
                            <MenuItem value={'draft'}>Draft</MenuItem>
                        </Select>
                    </FormControl>

                    {/* <ReactQuill value={description} onChange={setDescription} /> */}
                    <Button startIcon={<Cancel onClick={onClose} />}  >Cancel</Button>
                    <Button startIcon={<Save />} type="submit">Save</Button>
                </Grid>
            </form>
        </Modal>
    )
}

export default MateriModal