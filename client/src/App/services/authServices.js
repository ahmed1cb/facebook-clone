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
        console.log(error)
        return {
            data: {},
            message: 'Fail',
            code: error ?? 500
        }
    }
}


export { register }