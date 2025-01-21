import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useNotes = () => {
    const{user}=useAuth();
    const axiosPublic = useAxiosPublic();

    const {data: notes = [], isPending: loading, refetch} = useQuery({
        queryKey: ['notes'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/notes?email=${user.email}`);
            return res.data;
        }
    })


    return [notes, loading, refetch]
}

export default useNotes;
