import React, { useEffect, useState } from 'react'
import Layout from '../modules/common/Layout'
import Carousel from 'react-material-ui-carousel'
import Paper from '@mui/material/Paper'
// import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import styled from '@emotion/styled'
// import Toolbar from '@mui/material/Toolbar'
// import AppBar from '@mui/material/AppBar'
import { fetchUser } from '../apiQuery'
import Router from 'next/router'
import { useUser } from '@contexts/user.context'
import LanguagePopover from '@common/PopOver/LanguagePopover'
// import useAuth from '@hooks/useAuth'
import { AppNavbar } from '@mobile/Header'
import Logo from '../../public/assets/logo-dark.svg'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Slide1 from '../../public/assets/slide1.png'
import Slide2 from '../../public/assets/slide2.png'
import { useSession, getSession } from 'next-auth/react'

const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD

const StyledLink = styled(Link)`
    text-decoration: none;
`;

function PromoSlide(props) {
    return (
        <Paper
            elevation={1}
            square={false}
            sx={{
                background: 'lightgray',
                height: 200,
                // width: 300
            }}
        >
            <Image src={props.item.image} alt={props.item.alt} fill />
        </Paper>
    )
}

export default function Homepage(props) {
    const { user, } = useUser()
    const {status} = useSession()
    const { t } = useTranslation('common')

    let sliderImage = [
        {
            image: Slide1,
            alt: 'slide 1'
        },
        {
            image: Slide2,
            alt: 'slide 2'
        }
    ]

    return (
        <>
            <Layout>
                <AppNavbar logo={Logo} popOver=<LanguagePopover /> />


                <Grid container >
                    <Grid container direction='column'>
                        <Carousel
                            height={200} sx={{ m: 1 }}
                        >
                            {sliderImage.map((item, i) => <PromoSlide key={i} item={item} />)}
                        </Carousel>
                    </Grid>

                    <Grid container direction='column' sx={{
                        p: 2
                    }}>
                        {/* {data && (
                            <Typography variant='h6' sx={{ w: '100%', display: 'block' }}>{data.user.email}</Typography>
                        )} */}
                        <Typography variant='h6' sx={{ w: '100%', display: 'block' }}>{t('greeting')}</Typography>
                        <Typography variant='body1' sx={{ w: '100%', display: 'block' }}>{t('app-description')}</Typography>

                        <Grid container sx={{
                            my: 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                            {(status === 'unauthenticated' ) ? (
                                <>
                                    <StyledLink href={'/login'}>
                                        <Button variant='contained' size='large' sx={{ m: 2, borderRadius: '15px', width: '80vw', maxWidth: '768px' }}>{t('login')}</Button>
                                    </StyledLink>
                                </>
                            ) : (
                                <>
                                    <StyledLink href={'/materi'}>
                                        <Button variant='contained' size='large' sx={{ m: 2, borderRadius: '15px', width: '80vw', maxWidth: '768px' }}>{t('continue-reading')}</Button>
                                    </StyledLink>
                                </>
                            )}
                        </Grid>
                        <Typography variant='body1' align='center' sx={{ w: '100%', display: 'block' }}>
                            <StyledLink href={'/policy'} sx={{ color: '#000' }}>Privacy Policy</StyledLink> | <StyledLink href={'/help'}>Need Help?</StyledLink>
                        </Typography>
                    </Grid>
                </Grid>

            </Layout>
        </>
    )
}


export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common'
            ]))
        }
    }
}
