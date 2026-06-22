import axios from "axios";

const instance = axios.create({
   baseURL: 'https://smart-deals-server-backend.onrender.com'
})

const useAxios = () => {
   return instance
};

export default useAxios;