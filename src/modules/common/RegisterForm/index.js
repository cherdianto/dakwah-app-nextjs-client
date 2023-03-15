import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useFormik } from 'formik'
import { useUser } from '@contexts/user.context'

import styled from "@emotion/styled";
import ArrowRight from "@mui/icons-material/ArrowRight";
import axios from "axios";
import Link from "next/link";

axios.defaults.withCredentials = true;

const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD

const RootStyle = styled("div")({
    height: 'calc(100vh - 110px)',
    display: 'grid',
    placeItems: 'center'
});

const ContentStyle = styled("div")({
    padding: 5,
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
    marginBottom: 35
})

const RegisterForm = () => {
    const { user, setUser } = useUser()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
            whatsapp: '',
            fullname: ''
        },
        onSubmit: async (values) => {
            const data = {
                email: values.email,
                fullname: values.fullname,
                whatsapp: values.whatsapp,
                password: values.password
            }

            try {
                const res = await axios.post(`${apiUrl}/auth/register`, data)
                // console.log(res)
                setUser(res.data.user)
                setError(null)
                setSuccess({
                    status: true,
                    message: "REGISTER SUCCESS"
                })
            } catch (error) {
                setError({
                    status: true,
                    message: error.response.data.message
                })
            }

        }
    })
    return (
        <RootStyle>
            <Container >
                <ContentStyle>
                    <HeadingStyle>
                        <Typography sx={{ color: "text.secondary", mb: 1 }} >
                            Create new account
                        </Typography>
                        {error && error.status === true ? <Alert severity='error'>{error.message}</Alert> : ''}
                        {success && success.status === true ? <Alert severity='success'>{success.message}</Alert> : ''}
                    </HeadingStyle>

                    <Grid direction='column' gap={2}>
                        <form
                            id="loginForm"
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

                            <TextField
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                value={validation.values.password}
                                onChange={validation.handleChange}
                                sx={{
                                    pb: 2
                                }}

                            />
                            <Box>
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowRight />}
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        mb: 2,
                                        borderRadius: "15px"
                                    }}
                                >
                                    Register
                                </Button>
                                <Typography variant="body2" align="center">Already have an account?<span> </span>
                                    <Link href={'/login'}>
                                        Login
                                    </Link>
                                </Typography>
                            </Box>
                        </form>
                    </Grid>
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}

export default RegisterForm