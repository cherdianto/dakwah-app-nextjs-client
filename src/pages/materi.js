import React, { useEffect, useState } from 'react'
import Layout from '../modules/common/Layout'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import MateriCard from '@common/MateriCard'
import { useUser } from '@contexts/user.context'
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MateriPopover from '@common/MateriPopover.js'
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { addMateri, getMateries, updateMateri, deleteMateri } from '../apiQuery'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import MateriModal from '@common/AddMateriModal'


export default function MateriPage() {
    const [modalMateri, setModalMateri] = useState(false)
    const [isModalEdit, setIsModalEdit] = useState(false)
    const [dataToEdit, setDataToEdit] = useState()
    const [list, setList] = useState([])
    const { status, data } = useQuery(['materi'], getMateries)

    useEffect(() => {
        if (status === 'success') {
            setList(data)
        }
    }, [status, data])

    const handleMateriPopoverSelect = (selected) => {
        if (selected === 'add materi') {
            setModalMateri(true)
            setIsModalEdit(false)
        }
        // else console.log(selected)
    }

    const cache = useQueryClient()

    const addNewMateri = useMutation(addMateri, {
        onSuccess: () => {
            cache.invalidateQueries('materi')
        }
    })

    const editMateri = useMutation(updateMateri, {
        onSuccess: () => {
            cache.invalidateQueries('materi')
        }
    })

    const removeMateri = useMutation(deleteMateri, {
        onSuccess: () => {
            cache.invalidateQueries('materi')
        }
    })

    const handleSaveData = async (formData) => {
        if(isModalEdit){
            try {
                await editMateri.mutate({materiId: dataToEdit._id, formData})
                setModalMateri(false)
            } catch (error) {
                throw new Error(error)
            }
        } else {
            try {
                await addNewMateri.mutate(formData)
                setModalMateri(false)
            } catch (error) {
                throw new Error(error)
            }
        }
    }

    const handleOpenModalEdit = (lst) => {
        setDataToEdit(lst)
        setIsModalEdit(true)
        setModalMateri(true)
    }

    const handleCloseModal = () => {
        setModalMateri(false)
        setIsModalEdit(false)
        setDataToEdit()
    }

    const handleDeleteMateri = async ({materiId}) => {
        try {
            await removeMateri.mutate(materiId)
            setModalMateri(false)
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <Layout>
            <AppBar position='fixed' color="inherit" elevation={2}>
                <Toolbar variant="dense" sx={{
                    width: '100%',
                    maxWidth: 600,
                    mx: 'auto'
                }}>
                    <Typography variant="h5" color="inherit" component="div">Materi Aktif</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <MateriPopover onSelect={(selected) => handleMateriPopoverSelect(selected)} />
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid container sx={{ p: 1 }} gap={2}>
                    {list?.map((lst, id) => {
                        return (
                            <Grid key={id} item xs={12} sm={12}>
                                <MateriCard
                                    materiID={lst._id}
                                    img={lst.img}
                                    name={lst.name}
                                    status={lst.status}
                                    rating={lst.rating}
                                    student={lst.student}
                                    label={lst.label}
                                    description={lst.description}
                                    isEdit={() => handleOpenModalEdit(lst) }
                                    isDelete={() => handleDeleteMateri({materiId: lst._id})}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
            <MateriModal 
                open={modalMateri}
                onClose={() => handleCloseModal()} 
                onSave={(formData) => handleSaveData(formData)}
                isEdit={isModalEdit}
                dataToEdit={dataToEdit}
            />
        </Layout>
    )
}

export async function getStaticProps() {
    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['materi'], () => getMateries())

    return {
        props: {
            // allMateri
            dehydratedState: dehydrate(queryClient)
        }
    }
}