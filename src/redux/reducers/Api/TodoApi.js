import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const todoApi = createApi({
    reducerPath:'todoApi',
    baseQuery:fetchBaseQuery({
        baseUrl: `${SUPABASE_URL}/rest/v1`,
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
        getAllTodos:builder.query({
            query:()=>'/todos',
           
        }),


        // getTodos:builder.query({
        //     query:(user_id)=>{
        //         console.log('Fetching todos for user_id:', user_id);
        //         return `/todos?user_id=eq.${user_id}&select=*`},
        //         transformResponse: (response) => {
        //             console.log('API Response:', response);
        //             return response;
        //           },
        // }),
        addTodo:builder.mutation({
            query:(newTodo)=>({
                url:`/todos`,
                method:'POST',
                body:newTodo
            })
        }),
        deleteTodo:builder.mutation({
            query:(id)=>({
                url:`/todos?id=eq.${id}`,
                method:'DELETE'
            })
        }),
        updateTodo:builder.mutation({
            query:(updatedTodo)=>({
                url:`/todos?id=eq.${updatedTodo.id}`,
                method:'PATCH',
                body:updatedTodo
            })
        })
    })
})
export const { 
    // useGetTodosQuery
    useAddTodoMutation,useDeleteTodoMutation,useUpdateTodoMutation,useGetAllTodosQuery } = todoApi