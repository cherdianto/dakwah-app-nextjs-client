import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import TextIncrease from "@mui/icons-material/TextIncrease";
import TextDecrease from "@mui/icons-material/TextDecrease";
import { usePersonalize } from "@contexts/personalize.context";

const BottomSetting = (props) => {
    const { personalize, setPersonalize } = usePersonalize()

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
    }
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
            >
                <BottomNavigationAction 
                    id="zoomOut"
                    icon={<TextDecrease fontSize="small"/>} 
                    onClick={(e) => handleClick(e)} 
                />
                <BottomNavigationAction
                    id="zoomIn"
                    icon={<TextIncrease fontSize="medium"/>} 
                    onClick={(e) => handleClick(e)} 
                />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomSetting