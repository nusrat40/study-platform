
import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://study-platform-server-gold.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
