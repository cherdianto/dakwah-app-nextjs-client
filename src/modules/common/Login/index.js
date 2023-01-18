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
import Router from "next/router";

axios.defaults.withCredentials = true;

const RootStyle = styled("div")({
    // background:,
    // height: '100vh',
    height: '80vh',
    display: 'grid',
    placeItems: 'center'
});

const ContentStyle = styled("div")({
    maxWidth: 358,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff"
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
            email: 'user2@email.com',
            password: 'password'
        },
        onSubmit: async (values) => {
            const cred = {
                email : values.email,
                password : values.password
            }
            console.log('submit nih ' + cred)
            try {
                const res = await axios.post('http://localhost:3001/auth/login', cred)
                setUser(res.data.fullname)
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
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle>
                        <Typography sx={{ color: "text.secondary", mb: 1 }} >
                            Login to your account {user}
                        </Typography>
                        {error && error.status === true ? <Alert severity='error'>{error.message}</Alert> : ''}
                    </HeadingStyle>

                    <Grid
                        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
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
                                >
                                    Login
                                </Button>
                            </Box>
                        </form>
                    </Grid>
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}

export default Login