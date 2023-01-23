// import Layout from "@common/Layout";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Link from 'next/link'
import MoreIcon from '@mui/icons-material/MoreVert';
import BottomSetting from "@mobile/BottomSetting";
import { usePersonalize } from "@contexts/personalize.context";
import { useEffect, useState } from "react";


const MateriDetail = ({ materi }) => {
    const { personalize, setPersonalize} = usePersonalize()
    const [fontSize, setFontSize] = useState(personalize.fontSize)
    const { name, content } = materi

    useEffect(() => {
        setFontSize(personalize.fontSize)
    }, [personalize])


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
                    <IconButton color="inherit">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid container justifyContent='center'>
                <Grid container maxWidth={'sm'} direction='column' sx={{ p: 1 }} gap={1}>
                    {content.map((ctn, id) => {
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
                                    <Typography sx={{ fontSize }}>{ctn.subTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction='column'>
                                        <Typography align="justify" sx={{ whiteSpace: 'pre-line', fontSize }}>
                                            {ctn.matan}
                                        </Typography>
                                        <Grid container direction='row' justifyContent='flex-end'>
                                            <FormGroup>
                                                <FormControlLabel control={<Switch />} label="Selesai Baca" />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
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
    if(process.env.ENV === 'development'){
        detailMateri = detailMateri.materi
    }

    return {
        props: {
            materi: detailMateri
        }
    }
}

export default MateriDetail