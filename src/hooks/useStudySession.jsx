

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useStudySession = () => {
    const{user}=useAuth();
    const axiosPublic = useAxiosPublic();

    const {data: session = [], isPending: loading, refetch} = useQuery({
        queryKey: ['session'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/sessions?email=${user.email}`);
            return res.data;
        }
    })


    return [session, loading, refetch]
}

export default useStudySession;
