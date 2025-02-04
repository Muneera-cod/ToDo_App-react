import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl: `${SUPABASE_URL}/auth/v1`,
        prepareHeaders: (headers) => {
            const tokenString = localStorage.getItem('sb-rvxgndcsrrhkmglgmgvv-auth-token');
            const token = tokenString ? JSON.parse(tokenString).access_token : null;
            // console.log('Token:', token);
            headers.set('apikey', SUPABASE_ANON_KEY);
            headers.set('Content-Type', 'application/json');
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints:(builder)=>({
        signUp:builder.mutation({
            query:(newUser)=>({
                url:`/signup`,
                method:'POST',
                body:newUser
            })
        }),
        signIn:builder.mutation({
            query:(user)=>({
                url:`/signin`,
                method:'POST',
                body:user
            })
        }),
        signOut:builder.mutation({
            query:()=>({
                url:`/logout`,
                method:'POST',
            })
        }),
        getUser:builder.query({
            query:()=>`/user`
        })
    })
})
export const { useSignUpMutation,useSignInMutation,useSignOutMutation,useGetUserQuery } = authApi