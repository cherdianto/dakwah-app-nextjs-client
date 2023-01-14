// import Link from "next/link";
// import { makeStyles } from "@mui/styles";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { AccountBox, Book, CleaningServices, Home, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/router";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flex: 1
//     },
//     menuButton: {
//         marginRight: theme.spacing(2)
//     }
// }))

const BottomNav = (props) => {
    const menuPos = props.menuPos || 0
    const router = useRouter()
    const [value, setValue] = useState(router.pathname)
    // const classes = useStyles()

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setValue(newValue)
                    // console.log(value)
                }}
            >
                <BottomNavigationAction 
                    value="/"
                    label="Home" 
                    icon={<Home />} 
                    onClick={() => router.push('/')} 
                />
                <BottomNavigationAction 
                    value="/materi"
                    label="Materi" 
                    icon={<Book />} 
                    onClick={() => router.push('/materi')} 
                />
                <BottomNavigationAction 
                    value="/account"
                    label="Account" 
                    icon={<AccountBox />} 
                    onClick={() => router.push('/account')} 
                />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNav