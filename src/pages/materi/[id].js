// import Layout from "@common/Layout";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Link from 'next/link'
import BottomSetting from "@mobile/BottomSetting";
import { usePersonalize } from "@contexts/personalize.context";
import { useEffect, useState } from "react";
import TextEditor from "@common/TextEditor";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Edit from "@mui/icons-material/Edit";
import ContentPopover from "@common/PopOver/ContentPopover";
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { addContent, getMateries, showMateri, updateContent, deleteContent } from '../../apiQuery'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ModalReadingResponse from "@common/Modals/ReadingResponseModal";
import { useUser } from "@contexts/user.context";
import Delete from "@mui/icons-material/Delete";
import DeleteDialog from "@common/Dialogs/DeleteDialog";

const MateriDetail = ({ materiId }) => {
    const { personalize, setPersonalize } = usePersonalize()
    const [fontSize, setFontSize] = useState(personalize.fontSize)
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [targetContent, setTargetContent] = useState()
    const [masterContent, setMasterContent] = useState()
    const [openModalReadingResponse, setOpenModalReadingResponse] = useState(false)
    const [idReadingResponse, setIdReadingResponse] = useState()
    const { status, data } = useQuery(['content', materiId], () => showMateri(materiId))
    const { user, setUser } = useUser()

    useEffect(() => {
        if (status === 'success') {
            setMasterContent(data)
        }
    }, [status, data])

    useEffect(() => {
        setFontSize(personalize.fontSize)
    }, [personalize])

    const handleClickEdit = (e) => {
        setIsEdit(true)
        setTargetContent(e.target.id)
    }

    const handleClickDelete = (e) => {
        setIsDelete(true)
        setTargetContent(e.target.id)
    }

    const handleDelete = async (contentId) => {
        try {
            await removeContent.mutate({
                accessToken: user?.accessToken,
                materiId,
                contentId
            })
        } catch (error) {
            throw new Error(error)

        }
        setIsDelete(false)
        setTargetContent()
    }

    const handleCancelEdit = (e) => {
        setIsEdit(false)
        setTargetContent()
    }
    const cache = useQueryClient()

    const editContent = useMutation(updateContent, {
        onSuccess: () => {
            cache.invalidateQueries('materi')
        }
    })

    const addNewContent = useMutation(addContent, {
        onSuccess: () => {
            cache.invalidateQueries('materi')
        }
    })

    const removeContent = useMutation(deleteContent, {
        onSuccess: () => {
            cache.invalidateQueries('materi')
        }
    })

    const handleSave = async ({ contentId, matan, subTitle }) => {
        if (isEdit) {
            try {
                await editContent.mutate({
                    accessToken: user?.accessToken,
                    materiId,
                    contentId,
                    formData: { matan, subTitle }
                })
            } catch (error) {
                throw new Error(error)

            }
            setIsEdit(false)
            setTargetContent()
        } else {
            try {
                await addNewContent.mutate({
                    accessToken: user?.accessToken,
                    materiId,
                    formData: { matan, subTitle }
                })
            } catch (error) {
                throw new Error(error)

            }
            setTargetContent()
        }
    }

    const handleOpenModalReadingResponse = (e) => {
        if (e.target.checked) {
            setIdReadingResponse(e.target.id)
            setOpenModalReadingResponse(true)
        }
    }

    const handleReadingResponse = (resp) => {
        console.log(resp + ' ' + idReadingResponse)
    }

    const handleChangeAccordion = (id) => (e, isExpanded) => {
        setExpanded(isExpanded ? id : false)
    }

    return (
        <>
            <AppBar position="static" color="inherit" elevation={1}>
                <Toolbar sx={{
                    width: '100%',
                    maxWidth: 768,
                    mx: 'auto'
                }}>
                    <Link href={"/materi"}>
                        <IconButton edge='start' color="inherit" sx={{ mr: 2 }}>
                            <ArrowLeft />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>{masterContent?.name}</Typography>
                    { (user?.role === 'administrator' || user?.role === 'editor') && <ContentPopover onSave={(formData) => handleSave(formData)} />}
                </Toolbar>
            </AppBar>
            <Grid container justifyContent='center' sx={{
                pb: 8,
                maxWidth: 768,
                mx: 'auto'
            }}>
                <Grid container direction='column' sx={{ p: 1 }} gap={1}>
                    {masterContent?.content?.map((ctn, id) => {
                        return (
                            <Accordion key={id} expanded={expanded === `${id}`} onChange={handleChangeAccordion(`${id}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    id={id}
                                    sx={{
                                        background: '#f2f4f7',
                                        borderBottom: '1px solid darkgray'
                                    }}
                                >
                                    <Typography sx={{ fontSize, fontWeight: 500 }}>{ctn.subTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {(isEdit && targetContent === ctn.id) ? (
                                        <TextEditor
                                            onSave={(formData) => handleSave(formData)}
                                            onCancel={handleCancelEdit}
                                            matan={isEdit && ctn.matan}
                                            subTitle={isEdit && ctn.subTitle}
                                            contentId={ctn.id}
                                        />
                                    ) : (
                                        <Grid container direction='column'>
                                            <Box align="justify" dangerouslySetInnerHTML={{ __html: ctn.matan }} sx={{ fontSize }} />
                                            <Grid container direction='row' justifyContent='space-between' sx={{
                                                mt: 3
                                            }}>
                                                { (user?.role === 'administrator' || user?.role === 'editor') && <Button startIcon={<Edit />} id={ctn.id} onClick={(e) => handleClickEdit(e)} >Edit</Button>}
                                                { user?.role === 'administrator' && <Button startIcon={<Delete />} id={ctn.id} onClick={(e) => handleClickDelete(e)} >Delete</Button>}
                                                <FormGroup>
                                                    <FormControlLabel control={<Switch id={ctn.id} onChange={(e) => handleOpenModalReadingResponse(e)} />} label="Selesai Baca" />
                                                </FormGroup>
                                            </Grid>
                                        </Grid>
                                    )}
                                </AccordionDetails>
                                <DeleteDialog
                                    open={isDelete}
                                    onClose={() => setIsDelete(false)}
                                    onDelete={() => handleDelete(ctn.id)}
                                    title={ctn.subTitle}
                                />
                            </Accordion>
                        )
                    })}
                </Grid>
                <ModalReadingResponse open={openModalReadingResponse} onClose={() => setOpenModalReadingResponse(false)} onReadingResponse={(resp) => handleReadingResponse(resp)} />
            </Grid>
            <BottomSetting />

            {/* </Container> */}
        </>

    )
}

// export async function getStaticPaths() {
//     const res = await fetch("http://localhost:3001/api/materi")
//     const allMateri = await res.json()

//     const paths = allMateri.list.map(materi => `/materi/${materi._id}`)
//     return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//     const res = await fetch(`http://localhost:3001/api/materi/${params.id}`)
//     const detailMateri = await res.json()

//     return {
//         props: {
//             materi: detailMateri.materi
//         }
//     }
// }

// const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD
// const baseUrl = process.env.ENV === 'dev' ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD

export async function getStaticPaths() {
    const allMateri = await getMateries()
    // const allMateri = await res.json()

    const paths = allMateri.map(materi => `/materi/${materi._id}`)
    return { paths, fallback: true }
    // fallback true = when we add new materi, then it will not return 404
    // falback false = it will render 404 when there is no path found on the build time path
    // return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    const id = params.id
    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['content', id], () => showMateri(id))

    return {
        props: {
            materiId: id,
            dehydratedState: dehydrate(queryClient)
        }
    }
}

export default MateriDetail