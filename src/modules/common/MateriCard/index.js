import { Button, Card, CardMedia, CardHeader, CardActions, Typography, Grid, CardContent, Box } from "@mui/material";
import Link from 'next/link'
import PropTypes from 'prop-types'

const MateriCard = ({ name, img, status, rating, student, description, materiID }) => {

    return (
        <>
            <Link href={"/materi/[id]"} as={`materi/${materiID}`} >
                <Card>
                    <Box sx={{ maxWidth: 368 }}>
                        <Box sx={{ position: 'relative' }}>
                            <CardHeader
                                title={name}
                            />
                            <CardMedia
                                image={img}
                                title={name}
                                sx={{ height: 88 }}
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
                        </Box>
                    </Box>
                </Card>
            </Link>
        </>
    )

}

MateriCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    rating: PropTypes.number,
    student: PropTypes.number,
    description: PropTypes.string.isRequired,
}

export default MateriCard