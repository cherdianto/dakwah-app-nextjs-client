import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Save from "@mui/icons-material/Save";
import Cancel from "@mui/icons-material/Cancel";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import axiosJWT from '@utils/axiosJWT';
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false
});

const TextEditor = ({ matan, materiId, contentid, subTitle, handleCancelEdit, handleUpdateState }) => {
    const [value, setValue] = useState(matan)
    const [newSubtitle, setNewSubtitle] = useState(subTitle)

    const handleSave = async () => {
        // const apiUrl = process.env.ENV === 'vercel' ? process.env.API_URL_VERCEL : process.env.API_URL_LOCAL

        const res = await axiosJWT.put(`http://localhost:3001/api/materi/${materiId}/content/${contentid}`, {
            matan: value,
            subTitle: newSubtitle
        }, { withCredentials: true })

        if (!res) {
            console.log('error')
        }

        console.log('success')
        console.log(res.data.content)
        handleUpdateState(res.data.content)
        handleCancelEdit()
    }
    return (
        <Grid container direction='column' gap={2}>
            <TextField id="subtitle" label="Subtitle" variant="outlined" onChange={e => setNewSubtitle(e.target.value)} value={newSubtitle} sx={{ mt:3 }}/>
            <ReactQuill value={value} onChange={setValue} />
            <Button startIcon={<Cancel onClick={handleCancelEdit} />}  >Cancel</Button>
            <Button startIcon={<Save />} onClick={() => handleSave()} >Save</Button>
        </Grid>
    )
}

export default TextEditor