import React, { useEffect, useState } from 'react'
import Layout from '../modules/common/Layout'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import MateriCard from '@common/MateriCard'
import { useUser } from '@contexts/user.context'
import MateriPopover from '@common/PopOver/MateriPopover.js/index.js'
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { addMateri, getMateries, updateMateri, deleteMateri } from '../apiQuery'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import MateriModal from '@common/Modals/AddMateriModal'
import axiosJWT from '@utils/axiosJWT'

const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD

export default function MateriPage() {
    const [modalMateri, setModalMateri] = useState(false)
    const [isModalEdit, setIsModalEdit] = useState(false)
    const [dataToEdit, setDataToEdit] = useState()
    const [list, setList] = useState([])
    const { status, data } = useQuery(['materi'], getMateries)
    const { user, setUser } = useUser()

    const getUser = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                },
                withCredentials: true
            }
            const res = await axiosJWT(`${apiUrl}/auth/user`, config)
            // console.log(res)
            setUser(res.data.user)
        } catch (error) {
            // console.log(error)
            // if (error.isAxiosError) {
            // }
            setUser()
        }
    }

    useEffect(() => {
        if (!user) getUser()
    }, [user])

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
                await editMateri.mutate({materiId: dataToEdit._id, accessToken: user.accessToken, formData})
                setModalMateri(false)
            } catch (error) {
                throw new Error(error)
            }
        } else {
            try {
                await addNewMateri.mutate({accessToken: user.accessToken, formData})
                setModalMateri(false)
            } catch (error) {
                console.log('unauthorized, please login')
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
            await removeMateri.mutate({accessToken: user.accessToken, materiId})
            setModalMateri(false)
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <Layout>
            <AppBar position='fixed' color="inherit" elevation={1}>
                <Toolbar sx={{
                    width: '100%',
                    maxWidth: 768,
                    mx: 'auto'
                }}>
                    <Typography variant="h5" color="inherit" component="div">Materi Aktif</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    { (user?.role === 'administrator' || user?.role === 'editor') && <MateriPopover onSelect={(selected) => handleMateriPopoverSelect(selected)} />}
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
        },
        revalidate: 10
    }
}