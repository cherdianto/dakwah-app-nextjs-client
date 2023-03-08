import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme'
import { UserProvider } from 'src/contexts/user.context'
import { PersonalizeProvider } from '@contexts/personalize.context'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@utils/react-query-config'
import { appWithTranslation } from 'next-i18next'

const MyApp = (props) => {
    const { Component, pageProps } = props

    const [queryClient] = useState(() => new QueryClient(config))

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Moslem Guide</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <UserProvider initialUser={pageProps?.user}>
                <ThemeProvider theme={theme}>
                    <PersonalizeProvider initialPersonalize={pageProps?.personalize || ''}>
                        <QueryClientProvider client={queryClient}>
                            <Hydrate state={pageProps.dehydratedState}>
                                <CssBaseline />
                                <Component {...pageProps} />
                            </Hydrate>
                        </QueryClientProvider>
                    </PersonalizeProvider>
                </ThemeProvider>
            </UserProvider>
        </>
    )
}

export default appWithTranslation(MyApp)
