import BottomNav from "../../mobile/BottomNav";
import { PropTypes } from 'prop-types'
import styled from "@emotion/styled";


const RootStyles = styled("div")({
    marginTop: 20,
    marginBottom: 60 
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