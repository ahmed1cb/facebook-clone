
import Cookie from "../Cookie/Cookie";
import api from "./api"

const request = async (id) => {

    try {
        const response = await api.post(`/requests/${id}/toggle`, {}, {
            headers: {
                Authorization: Cookie.get('authorization'),
            }
        });
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


export { request }