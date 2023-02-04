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
import Edit from "@mui/icons-material/Edit";
import { useState } from "react";
import Delete from "@mui/icons-material/Delete";
import { useUser } from "@contexts/user.context";
import DeleteDialog from "@common/Dialogs/DeleteDialog";

const MateriLabelStyled = styled(MateriLabel)`
    margin-bottom: 0px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const MateriCard = ({ name, img, status, rating, student, description, materiID, label, isEdit, isDelete }) => {
    // const [modalEdit, setModalEdit] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const { user, setUser } = useUser()

    return (
        <>

        <Card elevation={0} sx={{
            // p: 0,
            border: '1px solid lightgray',
            borderRadius: 3
        }}>
            <Box sx={{ position: 'relative', px: 1 }}>
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
                    <Grid container direction='row' gap={1}>
                        <StyledLink href={"/materi/[id]"} as={`materi/${materiID}`} >
                            <Button size="small" variant="contained" endIcon={<PlayArrow />}>Baca</Button>
                        </StyledLink>
                        {/* <Button size="small" variant="outlined" endIcon={<Share />}>Bagi</Button> */}
                        {(user?.role !== 'user' && user) && (
                            <>
                                <Button size="small" variant="outlined" endIcon={<Edit />} onClick={() => isEdit(true)}>Sunting</Button>
                                <Button size="small" variant="outlined" endIcon={<Delete />} onClick={() => setShowDeleteDialog(true)}>Hapus</Button>
                            </>
                        )}
                    </Grid>
                </CardContent>
            </Box>
        </Card>
            <DeleteDialog 
                open={showDeleteDialog}
                onDelete={isDelete}
                onClose={() => setShowDeleteDialog(false)}
                title={name}
            />
        </>

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