import {useState} from "react";
import '../assets/css/Login.scss';
import cloakbox_logo from '../assets/img/cloakbox_logo_transparent.png'
import google_icon from '../assets/img/login_icon/google_login_icon.png'
import kakao_icon from '../assets/img/login_icon/kakao_login_medium.png'
import naver_icon from '../assets/img/login_icon/naver_login_icon.png'

/**
 * 로그인 화면
 * @constructor
 */
export const Login = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState<'input' | 'vaild'>('input');
    const [showText, setShowText] = useState(false);

    const onClickSignUp = () => {
        setStep('vaild');
        const timer = setTimeout(() => setShowText(true), 100); // 약간의 지연 줌
        return () => clearTimeout(timer);
    }

    const onClickValid = () => {
        setStep('input');
        const timer = setTimeout(() => setShowText(false), 100); // 약간의 지연 줌
        return () => clearTimeout(timer);
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
                            <form action="" className="login__register" id="login-in">
                                <h1 className="login__title">Sign In</h1>
                                <div className="login__box">
                                    <i className='bx bx-user login__icon'></i>
                                    <input type="text" placeholder="Username" className="login__input" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                                </div>
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
                step == 'vaild' && (
                    <div className="login">
                        <div className="login__content">
                            <div className="login__img">
                                <img src={cloakbox_logo} alt="user login" style={{width: '80%', height: '80%', marginTop: '10%'}}/>
                            </div>
                            <div className="login__forms">
                                <form action="" className="login__register" id="login-in">
                                    <h1 className="login__title">Vaild Check</h1>
                                    <div className={`valid_email fade-in-scale  ${showText ? 'show' : ''} `}>{userName}</div>
                                    <div className="login__box">
                                        <input type="text" placeholder="Authentication code" className="login__input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <a className="login__button" onClick={onClickValid}>Vaild</a>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )

}