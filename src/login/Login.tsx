import {useState} from "react";
import '../assets/css/login.scss';
import cloakbox_logo from '../assets/img/cloakbox_logo_transparent.png'

/**
 * 로그인 화면
 * @constructor
 */
export const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpToggle = () => {
    setSignUp(!signUp);
  };

    return (
        <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img src={cloakbox_logo} alt="user login" style={{width: '80%', height: '80%',marginTop: '10%'}}/>
                </div>
                <div className="login__forms">
                    <form action="" className="login__register" id="login-in">
                        <h1 className="login__title">Sign In</h1>
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="text" placeholder="Username" className="login__input" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div className="login__box">
                            <i className='bx bx-lock login__icon'></i>
                            <input type="text" placeholder="Password" className="login__input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <a href="#" className="login__forgot">Forgot Password? </a>

                        <a href="#" className="login__button">Sign In</a>

                        <div>
                            <span className="login__account login__account--account">Don't Have an Account?</span>
                            <span className="login__signin login__signin--signup" id="sign-up" onClick={handleSignUpToggle}>Sign Up</span>
                        </div>
                    </form>

                  {signUp && <form action="" className="login__create none" id="login-up">
                        <h1 className="login__title">Create Account</h1>
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="text" placeholder="Username" className="login__input" />
                        </div>

                        <div className="login__box">
                            <i className='bx bx-at login__icon'></i>
                            <input type="text" placeholder="Email" className="login__input"/>
                        </div>

                        <div className="login__box">
                            <i className='bx bx-lock login__icon'></i>
                            <input type="text" placeholder="Password" className="login__input"/>
                        </div>

                        <a href="#" className="login__button">Sign Up</a>

                        <div>
                            <span className="login__account login__account--account">Already have an Account?</span>
                            <span className="login__signup login__signup--signup" id="sign-in" onClick={handleSignUpToggle}>Sign In</span>
                        </div>

                        <div className="login__social">
                            <a href="#" className="login__social--icon"><i className='bx bxl-facebook'></i></a>
                            <a href="#" className="login__social--icon"><i className='bx bxl-twitter'></i></a>
                            <a href="#" className="login__social--icon"><i className='bx bxl-google'></i></a>
                            <a href="#" className="login__social--icon"><i className='bx bxl-github'></i></a>
                        </div>
                    </form>
                  }
                </div>
            </div>
        </div>
    )
}