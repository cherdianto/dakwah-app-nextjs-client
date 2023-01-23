import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import AccountBox from "@mui/icons-material/AccountBox";
import Book from "@mui/icons-material/Book";
import Home from "@mui/icons-material/Home";
import { useState } from "react";
import { useRouter } from "next/router";
import TextIncrease from "@mui/icons-material/TextIncrease";
import TextDecrease from "@mui/icons-material/TextDecrease";
import { usePersonalize } from "@contexts/personalize.context";

const BottomSetting = (props) => {
    const menuPos = props.menuPos || 0
    const router = useRouter()
    const { personalize, setPersonalize } = usePersonalize()
    // const [value, setValue] = useState(router.pathname)

    const handleClick = (e) => {
        const id = e.target.id
        let fontSize = personalize.fontSize || 17

        if(id === 'zoomIn'){
            setPersonalize({ 
                ...personalize,
                fontSize: fontSize + 1
            })
        } else if( id === 'zoomOut'){
            setPersonalize({ 
                ...personalize,
                fontSize: fontSize - 1
            })
        }

        // console.log(personalize)
    }
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                // showLabels
                // // value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue)
                // }}
            >
                <BottomNavigationAction 
                    // value="/materi"
                    // label="Zoom Out" 
                    id="zoomOut"
                    icon={<TextDecrease fontSize="small"/>} 
                    onClick={(e) => handleClick(e)} 
                />
                <BottomNavigationAction 
                    // value="/"
                    id="zoomIn"
                    // label="Zoom In" 
                    icon={<TextIncrease fontSize="medium"/>} 
                    onClick={(e) => handleClick(e)} 
                />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomSetting