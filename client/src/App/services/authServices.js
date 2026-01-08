import api from "./api"

const register = async (data) => {

    try {
        const response = await api.post('/auth/register', data);
        return {
            data: response.data,
            message: "Success",
            code: response.status
        }
    } catch (error) {
        return {
            data: {},
            message: 'Fail',
            code: error?.status ?? 500,
            error: error

        }
    }
}



const login = async (data) => {

    try {
        const response = await api.post('/auth/login', data);
        return {
            data: response.data,
            message: "Success",
            code: response.status
        }
    } catch (error) {
        return {
            data: {},
            message: 'Fail',
            code: error?.status ?? 500,
            error: error
        }
    }
}


export { register, login }