import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { setLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:7201/api"
});

// const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(setLoading());
    // await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());
    if(result.error) {
        //show error
        const {status, data} = result.error;
        console.log(`Error ${status}: ${data}`);
    }

    return result;
}