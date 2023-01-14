import {
    createTheme
} from "@mui/material/styles";
import {
    red
} from '@mui/material/colors';

const theme = createTheme({
    pallete: {
        primary: {
            main: '#00e676',
            light: '#66ffa6',
            dark: '#00b248'
        },
        secondary: {
            main: '#ff3d00',
            light: '#ff7539',
            dark: '#c30000',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fafafa',
        },
    }
});

export default theme;