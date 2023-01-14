import { Button, Card, CardMedia, CardHeader, CardActions, Typography, Grid, CardContent } from "@mui/material";
import Link from 'next/link'
import PropTypes from 'prop-types'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    card: {
        maxWidth: 368
    },
    image: {
        height: 88
    },
    relative: {
        position: 'relative'
    }
})

const MateriCard = ({ name, img, status, rating, student, description, materiID }) => {
    const classes = useStyles()

    return (
        <>
            <Link href={"/materi/[id]"} as={`materi/${materiID}`} >
                <Card>
                    <div className={classes.card}>
                        <div className={classes.relative}>
                            <CardHeader 
                                title={name}
                            />
                            <CardMedia
                                className={classes.image}
                                image={img}
                                title={name}
                            />
                            <CardContent>
                                <Grid container direction='column'>
                                    {/* <Typography gutterBottom variant='subtitle1' component="h2">
                                        {name}
                                    </Typography> */}
                                    <Typography variant="body2" color="text.secondary">
                                        {description}
                                    </Typography>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </div>
                    </div>
                </Card>
            </Link>
        </>
    )

}

MateriCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    rating: PropTypes.number,
    student: PropTypes.number,
    description: PropTypes.string.isRequired,
}

export default MateriCard