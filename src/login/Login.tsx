import {useState} from "react";
import '../assets/css/login.scss';
import cloakbox_logo from '../assets/img/cloakbox_logo_transparent.png'
import google_icon from '../assets/img/login_icon/google_login_icon.png'
import kakao_icon from '../assets/img/login_icon/kakao_login_medium.png'
import naver_icon from '../assets/img/login_icon/naver_login_icon.png'
import {validEmail} from "../common/valid.ts";
import * as React from "react";
import {Valid} from "./Valid.tsx";
import axios from "axios";

/**
 * 로그인 화면
 * @constructor
 */
export const Login = () => {

    /** 이메일 */
    const [userName, setUserName] = useState('');
    /** 이메일 에러 text */
    const [errorEmail, setErrorEmail] = useState<string | null>(null);
    /** 로그인 단계 구분용 */
    const [step, setStep] = useState<'input'|'valid'|'first'|'continue'>('input');

    /**
     * 로그인 버튼 클릭 이벤트
     */
    const onClickSignUp = () => {
        //이메일 유효성 검사
        const valid = validEmail(userName);
        setErrorEmail('');
        if(valid){
            axios.post(`${import.meta.env.VITE_API_URL}/v1/certification/send-certification-code`, {
                email: userName,
            }).then((res) => {
               if(res.status===200){
                   setStep('valid');
               }
            })
        }else{
            setErrorEmail('Invalid email address');
        }
    }

    /**
     * 엔터키 이벤트 (로그인)
     * @param e
     */
    const handleLoginEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickSignUp();
            console.log(e)
        }
    }

    return (
        <>
            {step == 'input' && (
                <div className="login">
                    <div className="login__content">
                        <div className="login__img">
                            <img src={cloakbox_logo} alt="user login" style={{width: '80%', height: '80%', marginTop: '10%'}}/>
                        </div>
                        <div className="login__forms">
                            <form className="login__register" id="login-in" onSubmit={(e) => e.preventDefault()}>
                                <h1 className="login__title">Sign In</h1>
                                <div className="login__box">
                                    <i className='bx bx-user login__icon'></i>
                                    <input type="text" placeholder="Email" className="login__input" value={userName} onChange={(e) => setUserName(e.target.value)} onKeyUp={handleLoginEnter}/>
                                </div>
                                <div className="login__error">{errorEmail}</div>
                                <a className="login__button" onClick={onClickSignUp}>Sign In</a>
                                <div className="login_account">
                                    <a><img className={'small_icon'} src={google_icon}/></a>
                                    <a><img className={'small_icon'} src={naver_icon}/></a>
                                    <a><img className={'middle_icon'} src={kakao_icon}/></a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
            }

            {
                step == 'valid' && (
                   <Valid userName={userName} setStep={setStep} />
                )
            }
        </>

    )

}