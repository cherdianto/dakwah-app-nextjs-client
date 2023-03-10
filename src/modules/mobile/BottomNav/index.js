import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import AccountBox from "@mui/icons-material/AccountBox";
import Book from "@mui/icons-material/Book";
import Home from "@mui/icons-material/Home";
import { useState } from "react";
import { useRouter } from "next/router";

const BottomNav = (props) => {
    const menuPos = props.menuPos || 0
    const router = useRouter()
    const [value, setValue] = useState(router.pathname)

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
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