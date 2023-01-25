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

const TextEditor = ({ contentId, matan, subTitle, onCancel, style, onSave }) => {
    const [value, setValue] = useState(matan)
    const [newSubtitle, setNewSubtitle] = useState(subTitle)

    const handleSave = async () => {
        const formData = {
            matan: value,
            subTitle: newSubtitle,
            contentId
        }
        // const apiUrl = process.env.ENV === 'vercel' ? process.env.API_URL_VERCEL : process.env.API_URL_LOCAL
        onSave(formData)
    }
    return (
        <Grid container direction='column' gap={2} sx={style}>
            <TextField id="subtitle" label="Subtitle" variant="outlined" onChange={e => setNewSubtitle(e.target.value)} value={newSubtitle} sx={{ mt:3 }}/>
            <ReactQuill value={value} onChange={setValue} />
            <Button startIcon={<Cancel onClick={onCancel} />}  >Cancel</Button>
            <Button startIcon={<Save />} onClick={() => handleSave()} >Save</Button>
        </Grid>
    )
}

export default TextEditor