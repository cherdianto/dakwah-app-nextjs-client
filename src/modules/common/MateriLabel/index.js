import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

const MateriLabel = ({ className, label }) => {
    return (
        <Grid container spacing={1} className={className}>
            {label.length > 0 && label.map((item, id) => {
                return (
                    <Grid item key={id}>
                        <Chip
                            color='secondary'
                            size='small'
                            label={item.toUpperCase()}
                            sx={{
                                fontSize: 10,
                                fontWeight: 900,
                                paddingLeft: '0 !important'
                            }}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}

MateriLabel.propTypes = {
    label: PropTypes.array.isRequired
}

export default MateriLabel