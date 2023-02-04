import React, { useEffect, useState } from 'react'
import Layout from '../modules/common/Layout'
import Carousel from 'react-material-ui-carousel'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import styled from '@emotion/styled'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import { fetchUser } from '../apiQuery'
import Router from 'next/router'
import { useUser } from '@contexts/user.context'
import LanguagePopover from '@common/PopOver/LanguagePopover'
import Divider from '@mui/material/Divider'

const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD

const StyledLink = styled(Link)`
    text-decoration: none;
`;

function PromoSlide(props) {
    return (
        <Paper
            elevation={1}
            square={false}
            sx={{
                background: 'lightgray',
                height: 200,
            }}
        >
            <Grid container direction='column' justifyContent='center' alignItems='center' sx={{
                p: 3
            }}>
                <h2>{props.item.nama}</h2>
                <p>{props.item.description}</p>

                <Button className='CheckButton'>
                    read more
                </Button>
            </Grid>
        </Paper>
    )
}

export default function Homepage(props) {
    const { user, setUser } = useUser()

    let items = [
        {
            nama: "slide 1",
            description: "description slide 1"
        },
        {
            nama: "slide 2",
            description: "description slide 2"
        },
        {
            nama: "slide 3",
            description: "description slide 3"
        }
    ]

    const getUser = async () => {
        try {
            const res = await fetchUser(user?.accessToken)
            setUser(res)
        } catch (error) {
            // if (error.isAxiosError) {
            // }
            setUser()
        }
    }

    useEffect(() => {
        if (!user) getUser()
    }, [])

    return (
        <Layout>
            <AppBar position="fixed" color="inherit" elevation={1}>
                <Toolbar sx={{
                    width: '100%',
                    maxWidth: 768,
                    mx: 'auto'
                }}>
                    <Typography variant='h5'>Hi, {user ? `${user.fullname}` : 'Guest'}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <LanguagePopover />
                </Toolbar>
            </AppBar>
            <Grid container >
                <Grid container direction='column'>
                    <Carousel
                        height={200} sx={{ m:1 }}
                    >
                        {items.map((item, i) => <PromoSlide key={i} item={item} />)}
                    </Carousel>
                </Grid>
                <Grid container direction='column' alignItems='center' sx={{
                    p: 2
                }}>
                    <Typography variant='body1' align='center' sx={{ w: '100%', display: 'block'}}>Ahlan wa sahlan</Typography>
                    <Typography variant='body1' align='center'>Disini kami berusaha untuk memberikan materi dakwah islam secara ringkas, mudah dipahami, dan berkelanjutan.</Typography>
                    <Divider variant="middle" sx={{
                        p: 1
                    }}/>
                    { (user === undefined || !user) && (
                        <>
                            <Typography gutterBottom variant='body1' align='center'>Untuk mendapatkan fasilitas belajar yang lebih maksimal, silakan login.</Typography>
                            <Divider variant="middle" sx={{
                                p: 1
                            }}/>
                            <Typography gutterBottom variant='body1' align='center'>Buat akun, klik tombol di bawah ini</Typography>
                            <StyledLink href={'/register'}>
                                <Button variant='outlined' sx={{ m: 2 }}>Register</Button>
                            </StyledLink>
                        </>
                    )}
                    <Typography variant='body1' align='center' sx={{ w: '100%', display: 'block'}}>Selamat belajar.</Typography>
                </Grid>
            </Grid>
        </Layout>
    )
}



