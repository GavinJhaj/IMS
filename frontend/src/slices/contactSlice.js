import {CONTACT_URL} from '../constants'
import { apiSlice } from './apiSlice'

export const contactApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
    getContactDetails:builder.query({
        query:()=>({
            url:CONTACT_URL,
        }),
        keepUnusedDataFor:5,
    }),
    createContact:builder.mutation({
        query:(data)=>({
            url:CONTACT_URL,
            method:'POST',
            body:data,
        }),
        invalidatesTags:['contact'],
       
    }),
    getMessageDetails: builder.query({
        query: (id) => ({
          url: `${CONTACT_URL}/${id}`,
        }),
      }),
      

})
})
 
export const {
    useGetContactDetailsQuery,
    useCreateContactMutation,
    useGetMessageDetailsQuery,
} = contactApiSlice




