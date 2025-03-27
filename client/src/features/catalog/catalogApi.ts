import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../app/models/Product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const catalogApi = createApi({
    reducerPath: "catalogApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], void>({
            query: () => ({url: "Products"})
        }),
        fetchProductsDetails: builder.query<Product, number>({
            query: (productId) => ({url: `Products/${productId}`})
        })
    })
});

export const { useFetchProductsQuery, useFetchProductsDetailsQuery } = catalogApi;