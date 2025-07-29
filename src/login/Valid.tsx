import cloakbox_logo from "../assets/img/cloakbox_logo_transparent.png";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLoginStore, useUserStore} from "../store/loginStore.ts";
import dayjs from "dayjs";

interface ValidProps {
     setStep: (step:'input'|'valid'|'first'|'continue') => void;
     userName: string;
}

export const Valid =({setStep,userName}:ValidProps) =>{
    /*** 인증번호 */
    const [code,setCode] = useState('');
    /*** 제한시간 */
    const [limitTime,setLimitTime] = useState(300);
    /** 이벤트 용 Text 표출 여부*/
    const [showText,setShowText] = useState(false);

    /** 로그인 관련 store */
    const{limitTime:limitTimeStore,pressTime,setPressTime,setLimitTime:setLimitTimeStore} = useLoginStore();
    const {setAccessToken, setRefreshToken, setLoginType} = useUserStore();

    useEffect(() => {
        const timer = setTimeout(() => setShowText(true), 100); // 약간의 지연 줌
        return () => clearTimeout(timer);
    }, [userName]);

    /*** 인증 버튼 클릭 이벤트*/
    const onClickValid = () => {
        if(code.length===0){alert('인증번호를 입력해주세요'); return;}
        axios.post(`${import.meta.env.VITE_API_URL}/v1/certification/verify-certification-code`, {
            email: userName,
            code: code,
        }).then((res) => {
            const accessToken = res.headers['x-access-token'];
            const refreshToken = res.headers['x-refresh-token'];
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            if(res.data.data.verified===true){
                if(res.data.data.user_exists===true){
                    location.href='/main';
                }else{
                    location.href='/first';
                }
            }
        })
    }

    /** 재발급 이벤트 */
    const onClickResend = () => {
        setCode("");
        console.log(dayjs(dayjs()).diff(dayjs(pressTime), 'second'))
        if(dayjs(dayjs()).diff(dayjs(pressTime), 'second')>60){
            axios.post(`${import.meta.env.VITE_API_URL}/v1/certification/send-certification-code`, {
                email: userName,
            }).then((res) => {
                if(res.status===200){
                    const accessToken = res.headers['x-access-token'];
                    const refreshToken = res.headers['x-refresh-token'];
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                    setLimitTimeStore(res.data.data.expires_at)
                    setPressTime(dayjs().toString())
                    alert('재발급 되었습니다.');
                    const limit = dayjs(res.data.data.expires_at);
                    setLimitTime(dayjs(limit).diff(dayjs(), 'second'))
                }
            })
        }else{
            alert((60-Math.abs(dayjs(dayjs()).diff(dayjs(pressTime), 'second')))+'초 후에 시도 가능합니다');
        }
    }

    /** 시간 세팅 이벤트 */
    useEffect(() => {
        const limit = dayjs(limitTimeStore);
        setLimitTime(dayjs(limit).diff(dayjs(), 'second'))

        const timer = setInterval(() => {
            const diff = dayjs(limit).diff(dayjs(), 'second');
            setLimitTime((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return diff;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [limitTimeStore]);

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
                        <div className="login__box" style={{padding:'0.125rem 0.5rem' }}>
                            <div className={"login_input"}  style={{width:'98%' }} >
                                <input type="text" style={{width:'70%' ,fontSize:'10px' }} placeholder="인증코드" className="login__input" value={code} onChange={(e) => setCode(e.target.value)} onKeyUp={onClickValid}/>
                                <div className="login__time">{'0'+Math.floor(limitTime/60)} : {Math.floor(limitTime%60)<10?'0'+Math.floor(limitTime%60):Math.floor(limitTime%60) }</div>
                            </div>
                            <button className="login__button" style={{margin:'0.2rem 0' }} onClick={onClickResend}>재전송</button>
                        </div>
                        <a className="login__button" onClick={onClickValid}>Valid</a>
                    </form>
                </div>
            </div>
        </div>
    )
}