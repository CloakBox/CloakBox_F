import cloakbox_logo from "../assets/img/cloakbox_logo_transparent.png";
import {useState} from "react";
import axios from "axios";
import {useUserStore} from "../store/loginStore.ts";

/**
 *  첫 로그인 시도시, 추가정보 입력하는 창
 * @constructor
 */
export const FirstJoin = () => {
    const [nickName, setNickName] = useState('');
    const [gender, setGender] = useState('M');
    const [introduce, setIntroduce] = useState('');
    const {setAccessToken,setRefreshToken} = useUserStore();

    const onClickSave = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/v1/user/register`, {
            nickname: nickName,
            bio:introduce,
            gender: gender=='M'?'MAN':"WOMAN",
        }).then((res) => {
            if(res.status===200){
                setAccessToken(res.data.data.access_token);
                setRefreshToken(res.data.data.refresh_token);
            }
        })
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
                        <div className="login__box" style={{display: 'block'}}>
                            <div className={`info_rows`}>
                                <label className={'row_title'}>nickName</label>
                                <div className="row_content">
                                    <input type="text" placeholder="nickName" className="login__input" value={nickName} onChange={(e) => setNickName(e.target.value)}/>
                                </div>
                            </div>
                            <div className={`info_rows`}>
                                <label className={'row_title'}>gender</label>
                                <div className="row_content">
                                    <label className={'optionLabel'}>남성</label><input type="radio" value={'M'} checked={gender === "M"}  className="login_input_radio" name={'gender'} onChange={(e) => setGender(e.target.value)}/>
                                    <label className={'optionLabel'}>여성</label><input type="radio" value={'F'} checked={gender === "F"} className="login_input_radio" name={'gender'} onChange={(e) => setGender(e.target.value)}/>
                                </div>
                            </div>
                            <div className={`info_rows`}>
                                <label className={'row_title'}>Self -introduction</label>
                                <div className="row_content">
                                   <textarea className="login__input" placeholder="Self -introduction" value={introduce} onChange={(e) => setIntroduce(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <a className="login__button" onClick={onClickSave}>Save</a>
                    </form>
                </div>
            </div>
        </div>
    )
}