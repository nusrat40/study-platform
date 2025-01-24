import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useBookedSession = () => {
    const{user}=useAuth();
    const axiosPublic = useAxiosPublic();

    const {data: sessions = [], isPending: loading, refetch} = useQuery({
        queryKey: ['sessions'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/bookedSession?email=${user.email}`);
            return res.data;
        }
    })


    return [sessions, loading, refetch]
}

export default useBookedSession;
