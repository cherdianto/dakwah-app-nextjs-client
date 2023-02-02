import Modal from '@mui/material/Modal'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import SentimentVerySatisfied from '@mui/icons-material/SentimentVerySatisfied'
import SentimentSatisfied from '@mui/icons-material/SentimentSatisfied'
import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied'
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentSatisfiedAlt from '@mui/icons-material/SentimentSatisfiedAlt'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxWidth: 300,
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const ModalReadingResponse = ({ open, onClose, onReadingResponse }) => {

    const handleSubmit = (feeling) => {
        onReadingResponse(feeling)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Grid container sx={style} direction='column'>
                <p>Bagaimana perasaan Anda setelah membaca sub ini?</p>
                <Grid container direction='column' gap={1}>
                    <Grid item>
                        <IconButton onClick={() => handleSubmit("very sad")}>
                            <SentimentVeryDissatisfied />
                        </IconButton>
                        <Typography>Saya tidak paham</Typography>
                    </Grid>
                    <Grid item>

                        <IconButton onClick={() => handleSubmit("sad")}>
                            <SentimentDissatisfied />
                        </IconButton>
                        <Typography>Saya kurang paham</Typography>
                    </Grid>
                    <Grid item>

                        <IconButton onClick={() => handleSubmit("understand")}>
                            <SentimentSatisfied />
                        </IconButton>
                        <Typography>Saya paham</Typography>
                    </Grid>
                    <Grid item>

                        <IconButton onClick={() => handleSubmit("happy")}>
                            <SentimentSatisfiedAlt />
                        </IconButton>
                        <Typography>Saya sudah tahu</Typography>
                    </Grid>
                    <Grid item>

                        <IconButton onClick={() => handleSubmit("very happy")}>
                            <SentimentVerySatisfied />
                        </IconButton>
                        <Typography>Saya sangat paham</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default ModalReadingResponse