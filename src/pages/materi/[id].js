// import Layout from "@common/Layout";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Link from 'next/link'
import MoreIcon from '@mui/icons-material/MoreVert';
import BottomSetting from "@mobile/BottomSetting";
import { usePersonalize } from "@contexts/personalize.context";
import { useEffect, useState } from "react";
import TextEditor from "@common/TextEditor";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Edit from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import Cancel from "@mui/icons-material/Cancel";
import ContentPopover from "@common/ContentPopover";


const MateriDetail = ({ materi, materiId }) => {
    console.log(materiId)
    const { personalize, setPersonalize } = usePersonalize()
    const [fontSize, setFontSize] = useState(personalize.fontSize)
    const { name, content } = materi
    const [isEdit, setIsEdit] = useState(false)
    const [targetContent, setTargetContent] = useState()
    const [masterContent, setMasterContent] = useState(materi)
    
    useEffect(() => {
        setFontSize(personalize.fontSize)
    }, [personalize])

    const handleEdit = (e) => {
        setIsEdit(true)
        setTargetContent(e.target.id)
    }

    const handleCancelEdit = (e) => {
        setIsEdit(false)
        setTargetContent()
    }

    const handleUpdateState = (content) => {
        console.log(content)
        setMasterContent(content)
    }

    const handleNewContent = (newContent) => {
        // console.log(content)
        setMasterContent([
            ...content,
            newContent
        ])
    }
    return (
        <>
            <AppBar position="static" color="inherit">
                <Toolbar variant="dense" sx={{
                    width: '100%',
                    maxWidth: 600,
                    mx: 'auto'
                }}>
                    <Link href={"/materi"}>
                        <IconButton edge='start' color="inherit" sx={{ mr: 2 }}>
                            <ArrowLeft />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>{name}</Typography>
                    <ContentPopover materiId={materiId} onNewContent={(data) => handleNewContent(data)} />
                </Toolbar>
            </AppBar>
            <Grid container justifyContent='center' sx={{
                pb: 8
            }}>
                <Grid container maxWidth={'sm'} direction='column' sx={{ p: 1 }} gap={1}>
                    {masterContent.content.map((ctn, id) => {
                        return (
                            <Accordion key={id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    id={id}
                                    sx={{
                                        background: '#f2f4f7',
                                        borderBottom: '1px solid darkgray'
                                    }}
                                >
                                    <Typography sx={{ fontSize, fontWeight: 500 }}>{ctn.subTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    { (isEdit && targetContent === ctn.id) ? (
                                        <TextEditor isEdit={true} handleUpdateState={handleUpdateState} materiId={materiId} matan={ctn.matan} subTitle={ctn.subTitle} contentid={ctn.id} handleCancelEdit={handleCancelEdit} />
                                    ) : (
                                        <Grid container direction='column'>
                                            <Box align="justify" dangerouslySetInnerHTML={{ __html: ctn.matan }} sx={{ fontSize }} />
                                            <Grid container direction='row' justifyContent='space-between' sx={{
                                                mt: 3
                                            }}>
                                                <Button startIcon={<Edit />} id={ctn.id} onClick={(e) => handleEdit(e)} >Edit</Button>
                                                <FormGroup>
                                                    <FormControlLabel control={<Switch />} label="Selesai Baca" />
                                                </FormGroup>
                                            </Grid>
                                        </Grid>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </Grid>
            </Grid>
            <BottomSetting />
            {/* </Container> */}
        </>

    )
}

// export async function getStaticPaths() {
//     const res = await fetch("http://localhost:3001/api/materi")
//     const allMateri = await res.json()

//     const paths = allMateri.list.map(materi => `/materi/${materi._id}`)
//     return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//     const res = await fetch(`http://localhost:3001/api/materi/${params.id}`)
//     const detailMateri = await res.json()

//     return {
//         props: {
//             materi: detailMateri.materi
//         }
//     }
// }

const apiUrl = process.env.ENV === 'vercel' ? process.env.API_URL_VERCEL : process.env.API_URL_LOCAL
const baseUrl = process.env.ENV === 'vercel' ? process.env.BASE_URL_VERCEL : process.env.BASE_URL_LOCAL

export async function getServerSidePaths() {
    const res = await fetch(`${apiUrl}/api/materi`)
    const allMateri = await res.json()

    const paths = allMateri.list.map(materi => `${baseUrl}/materi/${materi.id}`)
    return { paths, fallback: false }
}

export async function getServerSideProps({ params }) {
    // console.log(params)
    const res = await fetch(`${apiUrl}/api/materi/${params.id}`)
    // console.log(res)
    let detailMateri = await res.json()
    if (process.env.ENV === 'development') {
        detailMateri = detailMateri.materi
    }

    return {
        props: {
            materi: detailMateri,
            materiId: params.id
        }
    }
}

export default MateriDetail