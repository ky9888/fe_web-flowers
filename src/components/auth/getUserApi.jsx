'use client'
import axios from "axios";
export const getApiUser = async (id) => {
 const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/api/auth/getDetailUser/${id}`)
 return res.data
 
};

