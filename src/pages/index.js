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
import { useUser } from '@contexts/user.context'

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
            <Container maxWidth={'sm'}>
                <Carousel
                    height={200} sx={{ mb: 2 }}
                >
                    {items.map((item, i) => <PromoSlide key={i} item={item} />)}
                </Carousel>
                <Grid container direction='column' alignItems='center' justifyContent='center' sx={{
                    pb: 3
                }}>
                    {/* <Typography variant='body2'>Pilih Bahasa : </Typography> */}
                    <FormControl sx={{
                        pb: 3
                    }}>
                        <InputLabel id='bahasa'>Bahasa</InputLabel>
                        <Select
                            labelId='bahasa'
                            id='selectBahasa'
                            value={1}
                            label="Language"
                        // onChange={handleBahasaChange}
                        >
                            <MenuItem value={1}>Bahasa Indonesia</MenuItem>
                            <MenuItem value={2}>English</MenuItem>
                            <MenuItem value={3}>Dutch</MenuItem>
                            <MenuItem value={4}>Deutch</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography gutterBottom variant='h5'>Ahlan wa sahlan {user}</Typography>
                    <Typography variant='body1' align='center'>Selamat datang di website dakwah-bot.com. Disini kami berusaha untuk memberikan materi dakwah islam secara ringkas, mudah dipahami, dan berkelanjutan.</Typography>
                    <Typography gutterBottom variant='body1' align='center'>Anda dapat mengikuti materi di website ini dengan 3 cara, yaitu:
                    </Typography>
                    <Box sx={{ ml: 2 }}>
                        <Typography gutterBottom variant='body1' align='left'>1. Register dan mengaktifkan layanan whatsapp, dakwah-bot akan mengirimkan materi dakwah secara berkala (rekomendasi)</Typography>
                        <Typography gutterBottom variant='body1' align='left'>2. Register dan login untuk membaca materi dakwah dengan penyimpanan progres belajar</Typography>
                        <Typography gutterBottom variant='body1' align='left'>3. Anda dapat membaca materi dakwah tanpa perlu login</Typography>
                    </Box>
                    <StyledLink href={'/register'}>
                        <Button variant='outlined' sx={{ m: 3}}>Register</Button>
                    </StyledLink>
                    <Typography variant='body1' align='center'>Selamat belajar.</Typography>
                </Grid>
            </Container>
        </Layout>
    )
}



