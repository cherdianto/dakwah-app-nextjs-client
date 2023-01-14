import React from "react";
import { Container, Typography, Link, Box, TextField, Stack, FormControlLabel, Checkbox, Button } from "@mui/material";
import styled from "@emotion/styled";
import { ArrowRight } from "@mui/icons-material";

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
    textAlign: "center"
})

const Register = () => {
    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle>
                        <Typography sx={{ color: "text.secondary", mb: 5 }} >
                            Create new account
                        </Typography>
                    </HeadingStyle>

                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                        <TextField
                            fullWidth
                            autoComplete="name"
                            type="text"
                            label="Full Name"
                            required
                        />
                        <TextField
                            fullWidth
                            autoComplete="email"
                            type="email"
                            label="Email Address"
                            required
                        />
                        <TextField
                            fullWidth
                            autoComplete="whatsapp"
                            type="number"
                            label="Whatsapp Number"
                            required
                        />
                        <TextField
                            fullWidth
                            autoComplete="username"
                            type="password"
                            label="Password"
                            required
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
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}

export default Register