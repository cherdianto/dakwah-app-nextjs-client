import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD

const authOptions = (req, res) => {
    // console.log(res)
    return {
        providers: [
            CredentialsProvider({
                type: 'credentials',
                credentials: {},
                async authorize( credentials, req){
                    // const response = await fetch('http://localhost:3001/auth/login', {
                    //     method: 'POST',
                    //     body: JSON.stringify(credentials),
                    //     headers: { "Content-Type": "application/json"}
                    // })
                    const response = await axios.post(`${apiUrl}/auth/login`, credentials, {
                        withCredentials: true
                    })
                    
                    // try {
                        // console.log(cookies)
                        // } catch (error) {
                            //     console.log(error)
                            // }
                            
                    const cookies = response.headers['set-cookie']
                    res.setHeader('Set-Cookie', cookies)
                    // const user = await response.json()
                    const user = response.data
                    // console.log(user)
                            
                    if(user) {
                        return Promise.resolve(user)
                    }
                    
                    return Promise.resolve(null)
                }
            })
        ],
        events: {
            async signOut({ token }) {
                res.setHeader("Set-Cookie", "refreshToken=deleted, Max-Age=0;path=/")
            }
        },
        pages: {
            signIn: '/login'
        },
        callbacks: {
            async jwt(params){
                if(params.user?.role){
                    params.token.role = params.user.role
                    params.token.fullname = params.user.fullname
                    params.token.language = params.user.language
                    params.token.whatsapp = params.user.whatsapp
                    params.token.accessToken = params.user.accessToken
                }
    
                return params.token
            },
            async session({session, token, user}){
                session.user = token;
                return session
            }
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
    return NextAuth(req, res, authOptions(req, res))
}

// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//     // session: {
//     //     strategy: "jwt"
//     // },
//     providers: [
//         CredentialsProvider({
//             type: 'credentials',
//             credentials: {},
//             async authorize( credentials, req){
//                 const res = await fetch('http://localhost:3001/auth/login', {
//                     method: 'POST',
//                     body: JSON.stringify(credentials),
//                     headers: { "Content-Type": "application/json"}
//                 })

//                 const user = await res.json()

//                 if(res.ok && user) {
//                     return Promise.resolve(user)
//                 }
                
//                 return Promise.resolve(null)
//             }
//         })
//     ],
//     pages: {
//         signIn: '/login'
//     },
//     callbacks: {
//         async jwt(params){
//             if(params.user?.role){
//                 params.token.role = params.user.role
//                 params.token.fullname = params.user.fullname
//                 params.token.language = params.user.language
//                 params.token.whatsapp = params.user.whatsapp
//                 params.token.accessToken = params.user.accessToken
//             }

//             return params.token
//         },
//         async session({session, token, user}){
//             session.user = token;
//             return session
//         }
//     }
// }

// export default NextAuth(authOptions)