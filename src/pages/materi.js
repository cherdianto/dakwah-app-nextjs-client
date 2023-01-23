import React from 'react'
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



export default function MateriPage({ allMateri }) {
    const { list } = allMateri
    const { user, setUser } = useUser()

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
                {/* <LanguagePopover /> */}
                <IconButton color="inherit">
                    <MoreIcon />
                </IconButton>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid container sx={{ p: 1 }} gap={2}>
                    {list.map((lst, id) => {
                        return (
                            <Grid key={id} item xs={12} sm={12}>
                                <MateriCard
                                    materiID={lst.id} //ini untuk sementara
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

export async function getStaticProps() {
    const res = await fetch("https://dakwah-bot.vercel.app/api/materi")
    const allMateri = await res.json();

    return {
        props: {
            allMateri
        }
    }
}