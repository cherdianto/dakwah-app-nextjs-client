import React from 'react'
import Layout from '../modules/common/Layout'
import { Grid, Container } from '@mui/material'
import MateriCard from '@common/MateriCard'
import Materi from './api/materi/[id]'

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
                                    materiID = {lst.id}
                                    img={lst.img}
                                    name={lst.name}
                                    status={lst.status}
                                    rating={lst.rating}
                                    student={lst.student}
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
    const res = await fetch("http://localhost:3000/api/materi")

    const allMateri = await res.json();

    return {
        props: {
            allMateri
        }
    }
}