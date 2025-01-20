import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useMaterials = () => {
    const{user}=useAuth();
    const axiosPublic = useAxiosPublic();

    const {data: materials = [], isPending: loading, refetch} = useQuery({
        queryKey: ['materials'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/materials?email=${user.email}`);
            return res.data;
        }
    })


    return [materials, loading, refetch]
}

export default useMaterials;
