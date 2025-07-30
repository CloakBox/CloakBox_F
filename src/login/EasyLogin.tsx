import google_icon from "../assets/img/login_icon/google_login_icon.png";
import naver_icon from "../assets/img/login_icon/naver_login_icon.png";
import kakao_icon from "../assets/img/login_icon/kakao_login_medium.png";
import axios from "axios";
import {useEffect} from "react";

export const EasyLogin = () => {

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");
        console.log(authorizationCode);
    },[])

    /** google 간편로그인 클릭 이벤트 */
    const onClickGoogle = () => {
        console.log(`${import.meta.env.VITE_API_URL}`);
        console.log("clicked");
        axios.post(`${import.meta.env.VITE_API_URL}/v1/google/auth`, {
            "scope": "email profile",
            "prompt": "consent select_account"
        }).then((res) => {
            if(res.status===200){
                if(res.data.status=='success'){
                    const url= res.data.data.auth_url;
                    window.location.href=url;
                }
            }
        })
    }

    /** 네이버 간편로그인 클릭 이벤트 */
    const onClickNaver = () => {
        console.log(`${import.meta.env.VITE_API_URL}`);
        axios.post(`${import.meta.env.VITE_API_URL}/v1/naver/auth`, {
            "state": "random_state_string",
            "scope": "profile,email"
        }).then((res) => {
            if(res.status===200){
                if(res.data.status=='success'){
                    const url= res.data.data.auth_url;
                    window.location.href=url;
                }
            }
        })
    }


    /** 카카오 간편로그인 클릭 이벤트 */
    const onClickKakao = () => {
        console.log(`${import.meta.env.VITE_API_URL}`);
        axios.post(`${import.meta.env.VITE_API_URL}/v1/kakao/auth`, {
            "scope": "account_email,profile_nickname",
            "prompt": "consent,login"
        }).then((res) => {
            if(res.status===200){
                if(res.data.status=='success'){
                    const url= res.data.data.auth_url;
                    window.location.href=url;
                }
            }
        })
    }


    return (
        <div className="login_account">
            <a onClick={onClickGoogle}><img className={'small_icon'} src={google_icon}/></a>
            <a onClick={onClickNaver}><img className={'small_icon'} src={naver_icon}/></a>
            <a onClick={onClickKakao}><img className={'middle_icon'} src={kakao_icon}/></a>
        </div>
    )
}