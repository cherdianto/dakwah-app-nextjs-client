import React, { useState, useEffect } from 'react'
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
import axiosJWT from '@utils/axiosJWT'
import RegisterForm from '@common/RegisterForm'
import Link from 'next/link'
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import Button from "@mui/material/Button";
import ArrowRight from "@mui/icons-material/ArrowRight";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from "@mui/material/Alert";

const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD

const ContentStyle = styled("div")({
    padding: 20,
});

export default function UpdateProfile(props) {
    const { user, setUser } = useUser()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: user?.email || '',
            whatsapp: user?.whatsapp || '',
            fullname: user?.fullname || '',
            language: user?.language || '',
            // oldPassword: '',
            // newPassword: '',
        },
        onSubmit: async (values) => {
            const data = {
                email: values.email,
                fullname: values.fullname,
                whatsapp: values.whatsapp,
                language: values.language,
                // oldPassword: values.oldPassword,
                // newPassword: values.newPassword
            }
            try {
                const res = await axiosJWT.put(`${apiUrl}/auth/update-profile`, data)
                setUser(res.data.user)
                setError(null)
                setSuccess({
                    status: true,
                    message: "UPDATE PROFILE SUCCESS"
                })
            } catch (error) {
                setError({
                    status: true,
                    message: error.response.data.message
                })
                // alert(error.response.data.message)
            }

        }
    })

    const getUser = async () => {
        try {
            const res = await axiosJWT(`${apiUrl}/auth/user`, {
                withCredentials: true
            })
            
            setUser(res.data.user)
        } catch (error) {
            if(error.isAxiosError){
                setUser()
            }
            Router.push('/login')
        }
    }

    useEffect(() => {
        if(!user) getUser()
    }, [])

    if(!user){
        return (
            <Layout>
                <h2>loading...</h2>
            </Layout>
        )
    }
    
    return (
        <Layout>
            <AppBar position='fixed' color="inherit" elevation={2}>
                <Toolbar variant="dense" sx={{
                    width: '100%',
                    maxWidth: 600,
                    mx: 'auto'
                }}>
                    <Link href={"/account"}>
                        <IconButton edge='start' color="inherit" sx={{ mr: 2 }}>
                            <ArrowLeft />
                        </IconButton>
                    </Link>
                    <Typography variant="h5" color="inherit" component="div">Update Profile</Typography>
                </Toolbar>
            </AppBar>
            <ContentStyle>
                <Grid container direction='column'>
                    
                    <form
                        id="updateForm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false
                        }}
                    >
                        <TextField
                            fullWidth
                            id="fullname"
                            type="string"
                            label="Fullname"
                            value={validation.values.fullname}
                            onChange={validation.handleChange}
                            sx={{
                                pb: 2
                            }}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            value={validation.values.email}
                            onChange={validation.handleChange}
                            sx={{
                                pb: 2
                            }}
                        />
                        <TextField
                            fullWidth
                            id="whatsapp"
                            type="whatsapp"
                            label="Whatsapp"
                            value={validation.values.whatsapp}
                            onChange={validation.handleChange}
                            sx={{
                                pb: 2
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="language">Language</InputLabel>
                            <Select
                                fullWidth
                                id="language"
                                type='select'
                                name='language'
                                value={validation.values.language}
                                label='Language'
                                labelId='language'
                                onChange={validation.handleChange}
                                sx={{
                                    mb: 2
                                }}
                            >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'id'}>Indonesia</MenuItem>
                                <MenuItem value={'de'}>Deutch</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <TextField
                            fullWidth
                            id="oldPassword"
                            type="password"
                            label="Old Password"
                            value={validation.values.oldPassword}
                            onChange={validation.handleChange}
                            sx={{
                                pb: 2
                            }}
                        />
                        <TextField
                            fullWidth
                            id="newPassword"
                            type="password"
                            label="New Password"
                            value={validation.values.newPassword}
                            onChange={validation.handleChange}
                            sx={{
                                pb: 2
                            }}
                        /> */}
                        <Box>
                            <Button
                                variant="contained"
                                endIcon={<ArrowRight />}
                                fullWidth
                                type="submit"
                                sx={{
                                    mb: 2
                                }}
                            >
                                Update
                            </Button>
                        </Box>
                    </form>
                </Grid>
                {error && error.status === true ? <Alert severity='error'>{error.message}</Alert> : ''}
                    {success && success.status === true ? <Alert severity='success'>{success.message}</Alert> : ''}
            </ContentStyle>
        </Layout>
    )
}