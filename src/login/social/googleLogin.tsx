import {useEffect} from "react";
import axios from "axios";

export const GoogleLogin = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");

        axios.post(`${import.meta.env.VITE_API_URL}/v1/google/callback`, {
            "code": authorizationCode,
        }).then((res) => {
            console.log(res);
            if(res.status===200){
                if(res.data.status=='success'){
                    const token = res.data.data.access_token;
                    console.log(token);
                }
            }
        })
    }, []);

    return null
}