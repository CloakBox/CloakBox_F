import {useEffect} from "react";
import axios from "axios";
import {useUserStore} from "../../store/loginStore.ts";
import {useAxios} from "../../common/axiosService.ts";

/**
 * 구글 소셜 로그인 처리
 * @constructor
 */
export const GoogleLogin = () => {

    const {setAccessToken, setRefreshToken, setLoginType} = useUserStore();
    const {postResponse} = useAxios();

    useEffect(() => {
        (async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const authorizationCode = urlParams.get("code");

                const res = await postResponse(`/v1/google/callback`, {
                    code: authorizationCode,
                });

                console.log(res);

                if (res.status === 200 && res.data.status === 'success') {
                    const accessToken = res.headers['X-Access-Token'];
                    const refreshToken = res.headers['X-Refresh-Token'];
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                    setLoginType('google');
                    if(res.data.data.is_need_info){
                        window.location.href = '/main';
                    }else{
                        window.location.href = '/first';
                    }
                }
            } catch (error) {
                console.error("Google login failed:", error);
            }
        })();
    }, []);

    return null
}