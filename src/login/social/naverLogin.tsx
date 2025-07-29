import {useEffect} from "react";
import axios from "axios";
import {useUserStore} from "../../store/loginStore.ts";
import {useAxios} from "../../common/axiosService.ts";

/**
 * 네이버 소셜로그인 처리
 * @constructor
 */
export const NaverLogin = () => {

    const {setAccessToken,setRefreshToken,setLoginType} = useUserStore();
    const {postResponse} = useAxios();

    useEffect(() => {
        (async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const authorizationCode = urlParams.get("code");
                const state = urlParams.get("state");


                const res = await axios.post(`${import.meta.env.VITE_API_URL}/v1/naver/callback`, {
                    code: authorizationCode,
                    state:state
                });

                if (res.status === 200 && res.data.status === 'success') {
                    const accessToken = res.headers['x-access-token'];
                    const refreshToken = res.headers['x-refresh-token'];
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                    setLoginType('naver');
                    if(res.data.data.is_need_info){
                        window.location.href = '/first';
                    }else{
                        window.location.href = '/main';
                    }
                }
            } catch (error) {
                console.error("Naver login failed:", error);
            }
        })();
    }, []);

    return null
}