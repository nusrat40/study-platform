
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllStudySession = () => {

    const axiosPublic = useAxiosPublic();

    const {data: session = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['session'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/sessions');
            return res.data;
        }
    })


    return [session, loading, refetch]
}

export default useAllStudySession;
