import cloakbox_logo from "../assets/img/cloakbox_logo_transparent.png";
import {useState} from "react";

/**
 *  첫 로그인 시도시, 추가정보 입력하는 창
 * @constructor
 */
export const FirstJoin = () => {
    const [nickName, setNickName] = useState('');
    const [gender, setGender] = useState('M');

    const onClickSave = () => {

    }

    return (
        <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img src={cloakbox_logo} alt="user login" style={{width: '80%', height: '80%', marginTop: '10%'}}/>
                </div>
                <div className="login__forms">
                    <form className="login__register" id="login-in" onSubmit={(e) => e.preventDefault()}>
                        <h1 className="login__title">More Information</h1>
                        <div className="login__box">
                            <div className={`rows`}>
                                <label className={'row_title'}>nickName</label>
                                <input type="text" placeholder="nickName" className="login__input" value={nickName} onChange={(e) => setNickName(e.target.value)}/>
                            </div>
                            <div className={`rows`}>
                                <label className={'row_title'}>gender</label>
                                <label className={'optionLabel'}>남성</label><input type="radio" value={'M'} checked={gender === "M"}  className="login__input" name={'gender'} onChange={(e) => setGender(e.target.value)}/>
                                <label className={'optionLabel'}>여성</label><input type="radio" value={'F'} checked={gender === "F"} className="login__input" name={'gender'} onChange={(e) => setGender(e.target.value)}/>
                            </div>
                        </div>
                        <a className="login__button" onClick={onClickSave}>Save</a>
                    </form>
                </div>
            </div>
        </div>
    )
}