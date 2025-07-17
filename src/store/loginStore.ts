import {create} from "zustand";

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