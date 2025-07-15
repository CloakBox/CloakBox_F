import cloakbox_logo from "../assets/img/cloakbox_logo_transparent.png";
import {useEffect, useState} from "react";
import axios from "axios";

interface ValidProps {
     setStep: (step:'input'|'valid'|'first'|'continue') => void;
     userName: string;
}

export const Valid =({setStep,userName}:ValidProps) =>{
    /*** 인증번호*/
    const [code,setCode] = useState('');
    /** 이벤트 용 Text 표출 여부*/
    const [showText,setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowText(true), 100); // 약간의 지연 줌
        return () => clearTimeout(timer);
    }, [userName]);

    /*** 인증 버튼 클릭 이벤트*/
    const onClickValid = () => {
        setStep('input');
        axios.post(`${import.meta.env.VITE_API_URL}/v1/certification/verify-certification-code`, {
            email: userName,
            code: code,
        }).then((res) => {
            console.log(res)
            if(res.data.verified===true){
                setStep('input');
            }
        })
    }

    return  (
        <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img src={cloakbox_logo} alt="user login" style={{width: '80%', height: '80%', marginTop: '10%'}}/>
                </div>
                <div className="login__forms">
                    <form  className="login__register" id="login-in" onSubmit={(e) => e.preventDefault()}>
                        <h1 className="login__title">Valid Check</h1>
                        <div className={`valid_email fade-in-scale  ${showText ? 'show' : ''} `}>{userName}</div>
                        <div className="login__box">
                            <input type="text" placeholder="Authentication code" className="login__input" value={code} onChange={(e) => setCode(e.target.value)}/>
                        </div>
                        <a className="login__button" onClick={onClickValid}>Valid</a>
                    </form>
                </div>
            </div>
        </div>
    )
}