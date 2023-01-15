import Layout from "@common/Layout";
import { ArrowLeft, ExpandMore } from "@mui/icons-material";
import { Container, Accordion, AccordionSummary, AccordionDetails, Grid, Card, CardHeader, CardContent, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import Link from 'next/link'

const MateriDetail = ({ materi }) => {
    const { name, content } = materi

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Link href={"/materi"}>
                        <IconButton edge='start' color="inherit" sx={{ mr: 2 }}>
                            <ArrowLeft />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" color="inherit" component="div">{name}</Typography>
                </Toolbar>
            </AppBar>
            {/* <Container sx={{ marginTop: 1 }}> */}
                <Grid direction='column' sx={{ p: 1 }}>
                    {content.map((ctn, id) => {
                        return (
                            <Accordion key={id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    id={id}
                                >
                                    <Typography>{ctn.subTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2" paragraph="true" sx={{ whiteSpace: 'pre-line' }}>
                                        {ctn.matan}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </Grid>
            {/* </Container> */}
        </>

    )
}

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3001/api/materi")
    const allMateri = await res.json()

    const paths = allMateri.list.map(materi => `/materi/${materi._id}`)
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3001/api/materi/${params.id}`)
    const detailMateri = await res.json()

    return {
        props: {
            materi : detailMateri.materi
        }
    }
}

export default MateriDetail