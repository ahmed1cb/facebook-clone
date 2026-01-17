import Cookie from "../Cookie/Cookie";
import api from "./api"

const like = async (postId) => {

    try {
        const response = await api.post(`/posts/${postId}/like`, {}, {
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



const DeletePost = async (postId) => {

    try {
        const response = await api.delete(`/posts/${postId}`, {
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



export { like, DeletePost }