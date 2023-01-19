import React from 'react'
import Layout from '../modules/common/Layout'
import Carousel from 'react-material-ui-carousel'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import styled from '@emotion/styled'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';



import { useUser } from '@contexts/user.context'
import LanguagePopover from '@common/LanguagePopover'

const StyledLink = styled(Link)`
    text-decoration: none;
`;

function PromoSlide(props) {
    return (
        <Paper
            elevation={1}
            square={false}
            sx={{
                background: 'red',
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

    return (
        <Layout>
            <AppBar position="fixed" color="inherit" elevation={2}>
                <Toolbar variant="dense" sx={{
                    width: '100%',
                    maxWidth: 600,
                    mx: 'auto'
                }}>
                    <Typography variant='h6'>Welcome</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <LanguagePopover />
                </Toolbar>
            </AppBar>
            <Grid container >
                <Grid container direction='column'>
                    <Carousel
                        height={200} sx={{ mb: 2 }}
                    >
                        {items.map((item, i) => <PromoSlide key={i} item={item} />)}
                    </Carousel>
                </Grid>
                <Grid container direction='column' alignItems='center' sx={{
                    p: 2
                }}>
                    <Typography variant='body1' align='center'>Selamat datang di website dakwah-bot.com. Disini kami berusaha untuk memberikan materi dakwah islam secara ringkas, mudah dipahami, dan berkelanjutan.</Typography>
                    <Typography gutterBottom variant='body1' align='center'>Anda dapat mengikuti materi di website ini dengan 3 cara, yaitu:
                    </Typography>
                    <Box sx={{ ml: 2 }}>
                        <Typography gutterBottom variant='body1' align='left'>1. Register dan mengaktifkan layanan whatsapp, dakwah-bot akan mengirimkan materi dakwah secara berkala (rekomendasi)</Typography>
                        <Typography gutterBottom variant='body1' align='left'>2. Register dan login untuk membaca materi dakwah dengan penyimpanan progres belajar</Typography>
                        <Typography gutterBottom variant='body1' align='left'>3. Anda dapat membaca materi dakwah tanpa perlu login</Typography>
                    </Box>
                    <StyledLink href={'/register'}>
                        <Button variant='outlined' sx={{ m: 3 }}>Register</Button>
                    </StyledLink>
                    <Typography variant='body1' align='center'>Selamat belajar.</Typography>
                </Grid>
            </Grid>
        </Layout>
    )
}



