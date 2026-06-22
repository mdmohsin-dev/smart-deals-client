import axios from "axios";

const instance = axios.create({
   baseURL: 'https://smart-deals-server-teal.vercel.app/'
})

const useAxios = () => {
   return instance
};

export default useAxios;