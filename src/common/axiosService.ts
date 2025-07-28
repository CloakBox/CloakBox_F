import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from "axios";
import {getAccessToken, useUserStore} from "../store/loginStore.ts";


export const useAxios = () => {

    const {setAccessToken,loginType} = useUserStore();

    /**
     * axios 인스턴스 생성
     */
    const instance: AxiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}`,
        // 다른 도메인(Cross Origin)에 요청을 보낼 때 요청에 인증(credential) 정보를 담아서 보낼 지를 결정하는 항목
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
        }
    });


    /**
     * 요청 인터셉터 추가
     */
    instance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const authToken = getAccessToken();
            if (authToken) {
                const newConfig: AxiosRequestConfig = {...config};

                if (!newConfig.headers) {
                    newConfig.headers = {};
                }

                newConfig.headers['Content-Type'] = 'application/json';
                newConfig.headers['Authorization'] = `Bearer ${authToken}`;

                return newConfig;
            }
            return config;
        }
    )

    instance.interceptors.response.use((response: AxiosResponse) => response,
        async (error) => {
            if (error.response?.status === 401) {
                // 토큰 만료 시 자동 갱신 시도
                try {
                    await refreshToken();
                    // 원래 요청 재시도
                    return instance.request(error.config);
                } catch (refreshError) {
                    // 갱신 실패 시 로그인 페이지로 이동
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    )

    /**
     * access token이 만료되었을 때 refresh token을 이용해 새 access token을 발급받는다.
     * - 실패 시 사용자에게 알림 후 로그인 페이지로 강제 이동
     * - 성공 시 새 access token을 저장하고 이후 요청 처리를 위해 axios 인스턴스를 반환
     *
     * @returns instance.request - 이후 실패했던 요청을 재시도할 수 있도록 axios 인스턴스의 request 함수 반환
     * @throws Error - 토큰 갱신 실패 시 에러 발생
     */
    const refreshToken = async () => {
        const url = loginType=='google'?'/google/token/refresh':loginType=='kakao'?'/kakao/token/refresh':'/naver/token/refresh';
        const response = await instance.post(`${url}`);

        if (response.data.resultCode !== '200') {
            // 토큰 갱신 실패: 사용자에게 알림 후 로그인 페이지로 이동
            alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
            window.location.href = '/login';
            throw new Error('Token refresh failed.');
        } else {
            // 토큰 갱신 성공: 새로운 access token 저장
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);

            // 이후 요청 재시도 시 사용할 axios 인스턴스 반환
            return instance.request;
        }
    };


    /**
     * get 요청 응답 데이터만 반환한다.
     * @param url 요청 url
     * @param config AxiosRequestConfig
     * @returns json 형식의 data
     */
    const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response = await instance.get<T>(url, config);
        return response.data;
    };

    /**
     * get 요청 후 응답객체 자체를 반환한다.
     * @param url 요청 url
     * @param config AxiosRequestConfig
     * @returns 응답 객체
     */
    const getResponse = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return await instance.get<T>(url, config);
    };

    /**
     * post 요청 후 응답 데이터만 반환한다.
     * @param url 요청 url
     * @param data 요청 데이터
     * @param config AxiosRequestConfig
     * @returns json 형식의 data
     */
    const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        const response = await instance.post<T>(url, data, config);
        return response.data;
    };

    /**
     * post 요청 후 응답객체 자체를 반환한다.
     * @param url 요청 url
     * @param data 요청 데이터
     * @param config AxiosRequestConfig
     * @returns 응답 객체
     */
    const postResponse = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return await instance.post<T>(url, data, config);
    };

    return {
        get,
        getResponse,
        post,
        postResponse,
        instance, // 필요하면 raw axios 인스턴스도 함께 반환
    };
}

