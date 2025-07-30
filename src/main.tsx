import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./login/Login.tsx";
import {GoogleLogin} from "./login/social/googleLogin.tsx";
import {KakaoLogin} from "./login/social/kakaoLogin.tsx";
import {NaverLogin} from "./login/social/naverLogin.tsx";
import {FirstJoin} from "./login/FirstJoin.tsx";
import {MainContent} from "./main/mainContent.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/google/callback" element={<GoogleLogin/>}></Route>
                <Route path="/kakao/callback" element={<KakaoLogin/>}></Route>
                <Route path="/naver/callback" element={<NaverLogin/>}></Route>
                <Route path="/first" element={<FirstJoin/>}></Route>
                <Route path="/main" element={<MainContent/>}></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
