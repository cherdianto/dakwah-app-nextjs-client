import React from 'react'
import Layout from '../modules/common/Layout'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MateriCard from '@common/MateriCard'

export default function MateriPage({ allMateri }) {
    const { list } = allMateri

    return (
        <Layout>
            <Container maxWidth='sm'>
                <Grid container spacing={2}>
                    {list.map((lst, id) => {
                        return (
                            <Grid key={id} item xs={12} sm={12}>
                                <MateriCard 
                                    materiID = {lst._id}
                                    img={lst.img}
                                    name={lst.name}
                                    status={lst.status}
                                    rating={lst.rating}
                                    student={lst.student}
                                    label={lst.label}
                                    description={lst.description}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch("http://localhost:3001/api/materi")
    const allMateri = await res.json();

    return {
        props: {
            allMateri
        }
    }
}