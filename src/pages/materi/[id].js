import Layout from "@common/Layout";
import { ArrowLeft, ExpandMore } from "@mui/icons-material";
import { Container, Accordion, AccordionSummary, AccordionDetails, Grid, Card, CardHeader, CardContent, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import Link from 'next/link'

const MateriDetail = ({ materi }) => {
    const { materiID, img, name, status, rating, student, description, content } = materi

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
            <Container sx={{ marginTop: 1 }}>
                <Grid direction='column'>
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
            </Container>
        </>

    )
}

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3000/api/materi")
    const allMateri = await res.json()

    const paths = allMateri.list.map(materi => `/materi/${materi.id}`)
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3000/api/materi/${params.id}`)
    const materi = await res.json()

    return {
        props: {
            materi
        }
    }
}

export default MateriDetail