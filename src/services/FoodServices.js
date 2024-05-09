import axios from "axios";

const getAllFoods = async () => {
    const allDataUrl = `${import.meta.env.VITE_API_URL}/all-foods`;
    try {
        const response = await axios.get(allDataUrl);
        return response.data;
    } catch (error) {
        return {
            status: 'error',
            data: error.message
        };
    }
};

const getSingleFood = async (id) => {
    const singleDataUrl = `${import.meta.env.VITE_API_URL}/get-single-food/${id}`;
    try {
        const response = await axios.get(singleDataUrl);
        return response.data;
    } catch (error) {
        return {
            status: 'error',
            data: error.message
        };
    }
};

const foodCreate = async (data) => {
    const createUrl = `${import.meta.env.VITE_API_URL}/create-food-item`;
    try {
        const response = await axios.post(createUrl, data);
        return response.data;
    } catch (error) {
        return {
            status: 'error',
            data: error.message
        };
    }
};

const foodUpdateById = async (id, data) => {
    const updateUrl = `${import.meta.env.VITE_API_URL}/food-item-update/${id}`;
    try {
        const response = await axios.put(updateUrl, data);
        return response.data;
    } catch (error) {
        return {
            status: 'error',
            data: error.message
        };
    }
};

const foodDeleteById = async (id) => {
    const deleteUrl = `${import.meta.env.VITE_API_URL}/food-item-delete/${id}`;
    try {
        const response = await axios.delete(deleteUrl);
        return response.data;
    } catch (error) {
        return {
            status: 'error',
            data: error.message
        };
    }
};

export default ({
    getAllFoods, getSingleFood, foodCreate, foodUpdateById, foodDeleteById
})