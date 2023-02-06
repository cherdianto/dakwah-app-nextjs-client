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

const ForgetPassword = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: ''
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.get(`${apiUrl}/auth/reset-password?email=${values.email}`)
                setSuccess(res.status)
                setError(null)
            } catch (error) {
                
                if (error.response.status === 429) {
                    // rate limiter error
                    setError({
                        status: true,
                        message: error.response.data
                    })
                } else {
                    // other errors
                    setError({
                        status: true,
                        message: error.response.data.message
                    })
                }
            }

        }
    })
    return (
        <RootStyle>
            <Container >
                <ContentStyle>
                    <HeadingStyle>
                        <Typography sx={{ color: "text.secondary", mb: 1 }} >
                            Reset Password
                        </Typography>
                        {error && error.status === true ? <Alert severity='error'>{error.message}</Alert> : ''}
                    </HeadingStyle>

                    <Grid container direction='column' gap={2}>
                        {!success ? (

                            <form
                                id="resetForm"
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
                                        Reset Password
                                    </Button>
                                    <Typography variant="body2" align="center">Already have an account?
                                        <Link href={'/login'}>
                                            Login
                                        </Link>
                                    </Typography>
                                </Box>
                            </form>
                        ) : (
                            <Typography variant="body2">We have sent a link to your email.</Typography>
                        )}
                    </Grid>
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}

export default ForgetPassword