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

const Login = () => {
    const { user, setUser } = useUser()
    const [error, setError] = useState(null)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const cred = {
                email : values.email,
                password : values.password
            }
            try {
                const res = await axios.post(`${apiUrl}/auth/login`, cred)
                setUser(res.data)
                setError(null)
            } catch (error) {
                setError({
                    status: true,
                    message:error.response.data.message
                })
                // alert(error.response.data.message)
            }

        }
    })
    return (
        <RootStyle>
            <Container >
                <ContentStyle>
                    <HeadingStyle>
                        <Typography sx={{ color: "text.secondary", mb: 1 }} >
                            Login to your account
                        </Typography>
                        {error && error.status === true ? <Alert severity='error'>{error.message}</Alert> : ''}
                    </HeadingStyle>

                    <Grid container direction='column' gap={2}>
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
                                // autoComplete="email"
                                id="email"
                                type="email"
                                label="Email Address"
                                value={validation.values.email}
                                onChange={validation.handleChange}
                                sx={{
                                    pb: 3
                                }}
                            />
                            <TextField
                                fullWidth
                                // autoComplete="username"
                                id="password"
                                type="password"
                                label="Password"
                                value={validation.values.password}
                                onChange={validation.handleChange}
                            />
                            <Box>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ my: 2 }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox />
                                        }
                                        label="Remember me"
                                    />
                                </Stack>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowRight />}
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        mb: 2
                                    }}
                                >
                                    Login
                                </Button>
                                <Typography variant="body2" align="center">New user?  
                                        <Link href={'/register'}>
                                             Register
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

export default Login