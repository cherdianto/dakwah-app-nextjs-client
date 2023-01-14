import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}))

const Header = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Link href={"/"}>
                        <Typography variant="h6">
                            Dakwah Bot
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header