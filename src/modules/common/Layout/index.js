import BottomNav from "../../mobile/BottomNav";
import { PropTypes } from 'prop-types'
import styled from "@emotion/styled";


const RootStyles = styled("div")({
    paddingTop: 50,
    paddingBottom: 60,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 600,
    alignItems: 'center',
    margin: '0 auto',
    // background: '#E7EBF0'
    // border: '1px dotted gray',
    // height: 'calc(100% - 65px)'
})

const Layout = ({ children }) => {
    return (
        <>
            <RootStyles>
                { children }
            </RootStyles>
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