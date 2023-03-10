import React, { useState, useEffect, cache } from 'react'
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
// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchUser, updateProfile } from '../apiQuery'
// import { useQuery } from '@tanstack/react-query';
// import Router from 'next/router'
import useAuth from '@hooks/useAuth'


const ContentStyle = styled("div")({
    padding: 20,
});

export default function UpdateProfile(props) {
    const { user, setUser } = useUser()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [status, setStatus] = useState()
    const currentUser = useAuth({ redirect: 'login'})


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
                setStatus('loading')
                const res = await updateProfile({data, accessToken: user?.accessToken})
                setUser(res)
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
            }

            setStatus()

        }
    })

    // const getUser = async () => {
    //     try {
    //         const res = await fetchUser(user?.accessToken)
    //         setUser(res)
    //     } catch (error) {
    //         setUser()
    //         Router.push('/login')
    //     }
    // }

    // useEffect(() => {
    //     if (!user) getUser()
    // }, [user])

    if (!user || status === 'loading') {
        return (
            <Layout>
                <h2>loading...</h2>
            </Layout>
        )
    }

    return (
        <Layout>
            <AppBar position='fixed' color="inherit" elevation={1}>
                <Toolbar sx={{
                    width: '100%',
                    maxWidth: 768,
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
                        {/* <FormControl fullWidth>
                            <InputLabel id="role">Role</InputLabel>
                            <Select
                                fullWidth
                                id="role"
                                type='select'
                                name='role'
                                value={validation.values.role}
                                label='Role'
                                labelId='role'
                                onChange={validation.handleChange}
                                sx={{
                                    mb: 2
                                }}
                            >
                                <MenuItem value={'user'}>user</MenuItem>
                                <MenuItem value={'editor'}>editor</MenuItem>
                                <MenuItem value={'translator'}>translator</MenuItem>
                                <MenuItem value={'administrator'}>administrator</MenuItem>
                            </Select>
                        </FormControl> */}
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
                                    mb: 2,

                                    borderRadius: '15px'
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