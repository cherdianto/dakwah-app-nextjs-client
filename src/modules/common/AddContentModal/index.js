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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 600,
    height: '70%',
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const ContentModal = ({ open, onClose, onSuccess, materiId, contentId, matan }) => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [label, setLabel] = useState()
    
    const handleSave = async () => {
        // const apiUrl = process.env.ENV === 'vercel' ? process.env.API_URL_VERCEL : process.env.API_URL_LOCAL

        const res = await axiosJWT.post(`http://localhost:3001/api/materi/add`, {
            description: description,
            name: title,
            label: label
        }, { withCredentials: true })

        if (!res) {
            console.log('error')
        }

        console.log('success')
        console.log(res)
        // handleUpdateState(res.data.content)
        onSuccess(res)
        onClose()
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <TextEditor materiId={materiId} style={style} isEdit={false}/>
            </Modal>
        </>
    )
}

export default ContentModal