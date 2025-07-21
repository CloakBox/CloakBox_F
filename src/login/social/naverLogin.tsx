import {useEffect} from "react";
import axios from "axios";
import {useUserStore} from "../../store/loginStore.ts";

/**
 * 네이버 소셜로그인 처리
 * @constructor
 */
export const NaverLogin = () => {

    const {setAccessToken,setRefreshToken} = useUserStore();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");

        axios.post(`${import.meta.env.VITE_API_URL}/v1/naver/callback`, {
            "code": authorizationCode,
        }).then((res) => {
            if(res.status===200){
                if(res.data.status=='success'){
                    setAccessToken(res.data.data.access_token);
                    setRefreshToken(res.data.data.refresh_token);
                }
            }
        })
    }, []);

    return null
}