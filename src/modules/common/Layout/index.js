import BottomNav from "../../mobile/BottomNav";
import { makeStyles } from "@mui/styles";
import { PropTypes } from 'prop-types'
// import MobileHeader from '../../mobile/Header'

const useStyles = makeStyles({
    content: {
        marginTop: 20,
        marginBottom: 60
    }
})

const Layout = ({ children }) => {
    const classes = useStyles()

    return (
        <>
            {/* <MobileHeader /> */}
            <div className={classes.content}>
                { children }
            </div>
            <BottomNav />
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Layout