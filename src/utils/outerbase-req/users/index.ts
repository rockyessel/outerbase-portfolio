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


export const findUserById = async (userId: string) => {
    const { data } = await axios.get(`${baseURL}/users/id?userId=${userId}`)
    return data
}


export const findUserByUsername = async (username: string) => {
    const { data } = await axios.get(`${baseURL}/users/username?username=${username}`);
    return data
}

export const findUserByEmail = async (email: string) => {
    const { data } = await axios.get(`${baseURL}/users/email?email=${email}`)
    return data
}

export const validateUser = async (user: any) => {
    const { data } = await axios.post(`${baseURL}/users/validate`, { ...user })
    return data
}

