import React, { useEffect, useState } from 'react'
import Layout from '../modules/common/Layout'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import MateriCard from '@common/MateriCard'
import { useUser } from '@contexts/user.context'
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MateriPopover from '@common/MateriPopover.js'
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getMateries } from '../apiQuery'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function MateriPage() {
    // const { list } = allMateri

    const { status, data } = useQuery(['materi'], getMateries)

    useEffect(() => {
        console.log(status)
        if (status === 'success') {
            setList(data)
        }
    }, [status, data])

    const cache = useQueryClient()

    const addMateri = useMutation(getMateries, {
        onSuccess: () => {
            cache.invalidateQueries('materi')
        }
    })

    // console.log(data)
    const [list, setList] = useState([])
    const { user, setUser } = useUser()

    const handleGetNewMateriFromModal = (newMateri) => {
        // setList([
        //     ...list,
        //     { ... newMateri }
        // ])
        addMateri.mutate()
        console.log('set new materi manualy')

    }
    return (
        <Layout>
            <AppBar position='fixed' color="inherit" elevation={2}>
                <Toolbar variant="dense" sx={{
                    width: '100%',
                    maxWidth: 600,
                    mx: 'auto'
                }}>
                    <Typography variant="h5" color="inherit" component="div">Materi Aktif</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <MateriPopover onNewMateri={(newMateri) => handleGetNewMateriFromModal(newMateri)} />
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid container sx={{ p: 1 }} gap={2}>
                    {list?.map((lst, id) => {
                        return (
                            <Grid key={id} item xs={12} sm={12}>
                                <MateriCard
                                    materiID={process.env.ENV === 'development' ? `${lst.id}` : `${lst._id}`} //ini untuk sementara
                                    // materiID={lst._id} // ini untuk production
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
            </Grid>
        </Layout>
    )
}

// export async function getStaticProps() {
//     const res = await fetch("http://localhost:3001/api/materi")
//     const allMateri = await res.json();

//     return {
//         props: {
//             allMateri
//         }
//     }
// }

export async function getServerSideProps() {
    // const apiUrl = process.env.ENV === 'vercel' ? process.env.API_URL_VERCEL : process.env.API_URL_LOCAL
    // const getMateri = async () => {
    //     const res = await fetch(`${apiUrl}/api/materi`)
    //     const allMateri = await res.json();

    //     console.log(allMateri)
    //     return allMateri
    // }
    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['materi'], getMateries)

    return {
        props: {
            // allMateri
            dehydratedState: dehydrate(queryClient)
        }
    }
}