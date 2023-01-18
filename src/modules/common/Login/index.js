import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import styled from "@emotion/styled";
import ArrowRight from "@mui/icons-material/ArrowRight";

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

const Login = () => {
    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle>
                        <Typography sx={{ color: "text.secondary", mb: 5 }} >
                            Login to your account
                        </Typography>
                    </HeadingStyle>

                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >

                        <TextField
                            fullWidth
                            autoComplete="whatsapp"
                            type="string"
                            label="Whatsapp Number"
                        />
                        <TextField
                            fullWidth
                            autoComplete="username"
                            type="password"
                            label="Password"
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
                                Login
                            </Button>
                        </Box>
                    </Box>
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}

export default Login