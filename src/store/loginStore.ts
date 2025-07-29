import {create} from "zustand";
import { persist } from "zustand/middleware";


interface LoginStore {
 /** 제한 시간 */
 limitTime: string;
 /** 토큰 정보 */
 token: string;
 /** 전송한 시간 */
 pressTime:string;
 /** 제한시간 세팅 */
 setLimitTime: (limitTime: string) => void;
 /** 토큰 세팅 */
 setToken: (token: string) => void;
 /** 전송시간 세팅 */
 setPressTime: (pressTime: string) => void;
}

export const useLoginStore =create<LoginStore>((set) => ({
    limitTime: '',
    token: "",
    pressTime: "",
    setLimitTime: (time: string) => set(() => ({
        limitTime: time,
    })),
    setToken: (token: string) => set(() => ({
        token: token,
    })),
    setPressTime: (time: string) => set(() => ({
        pressTime: time,
    }))
}));


interface UserStore {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    refreshToken: string;
    setRefreshToken: (refreshToken: string) => void;
    loginType:string;
    setLoginType: (loginType: string) => void;
}

export const useUserStore = create(
    persist<UserStore>((set) => ({
            accessToken: "",
            refreshToken: "",
        loginType: "",
            setAccessToken: (value) => set({ accessToken: value }),
            setRefreshToken: (value) => set({ refreshToken: value}),
            setLoginType: (loginType) => set({ loginType }),
        }),
        {
            name: "userStorage"
        }
    )
);

export const getAccessToken = () => useUserStore.getState().accessToken;