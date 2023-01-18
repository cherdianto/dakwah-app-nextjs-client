import MateriLabel from "@common/MateriLabel";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from "@emotion/styled";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Share from "@mui/icons-material/Share";

const MateriLabelStyled = styled(MateriLabel)`
    margin-bottom: 0px;
`;

const MateriCard = ({ name, img, status, rating, student, description, materiID, label }) => {
    return (
        <Card>
            <Box sx={{ position: 'relative', maxWidth: 368, padding: 1 }}>
                <CardContent >
                    <Grid container direction='column' sx={{ paddingBottom: 1, paddingTop: 0 }}>
                        <Grid container direction='row' justifyContent='stretch'>
                            <MateriLabelStyled label={label} />
                            {/* <StarBorderPurple500 />    */}
                        </Grid>

                        <Typography gutterBottom variant='h5' component="h2" sx={{
                            paddingTop: 1,
                            paddingBottom: 0
                        }} >
                            {name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>

                    </Grid>
                    <Grid container direction='row' gap={2}>
                        <Link href={"/materi/[id]"} as={`materi/${materiID}`} >
                            <Button size="small" variant="contained" endIcon={<PlayArrow />}>Mulai Baca</Button>
                        </Link>
                        <Button size="small" variant="outlined" endIcon={<Share />}>Bagikan</Button>
                    </Grid>
                </CardContent>
            </Box>
        </Card>
    )

}

MateriCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    rating: PropTypes.number,
    student: PropTypes.number,
    label: PropTypes.array,
    description: PropTypes.string.isRequired,
}

export default MateriCard