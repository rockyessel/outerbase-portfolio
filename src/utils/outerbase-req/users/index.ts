import axios from "axios"


const baseURL = `https://minimum-aqua.cmd.outerbase.io`;

export const createUserWithProvider = async (user: any) => {
    const { data } = await axios.post(`${baseURL}/users/create`, { ...user })
    return data
}

export const createUserWithCredentials = async (user: any) => {
    const { data } = await axios.post(`${baseURL}/users/create`, { ...user })
    return data
}


export const findUserById = async (user: any) => {
    const { data } = await axios.post(`${baseURL}/users/create`, { ...user })
    return data
}


export const findUserByUsername = async (user: any) => {
    const { data } = await axios.post(`${baseURL}/users/create`, { ...user })
    return data
}

export const validateUser = async (user: any) => {
    const { data } = await axios.post(`${baseURL}/users/create`, { ...user })
    return data
}

