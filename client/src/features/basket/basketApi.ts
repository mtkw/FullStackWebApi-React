import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket, Item } from "../../app/models/basket";
import { Product } from "../../app/models/Product";

function isBasketItem(product: Product | Item): product is Item{
    return (product as Item).quantity !== undefined;
}

export const basketApi = createApi({
    reducerPath: "basketApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Basket"],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket, void>({
            query: () => "basket",
            providesTags: ["Basket"]
        }),
        addBasketItem: builder.mutation<Basket, {product: Product | Item, quantity: number}>({
            query: ({product, quantity}) => {
                const productId = isBasketItem(product) ? product.id : product.id;
                return{
                    url: `basket?productId=${productId}&quantity=${quantity}`,
                    method: "POST"
                }
                
            },
            onQueryStarted: async ({product, quantity}, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
                        const productId = isBasketItem(product) ? product.id : product.id;
                        const existingItems = draft.items.find(item=>item.id === productId);
                        if(existingItems){
                            existingItems.quantity += quantity;
                        }
                        else{
                            draft.items.push(isBasketItem(product) ? product : new Item(product, quantity));
                        }
                    })
                )
                try{
                    await queryFulfilled;
                }catch(error){
                    console.log(error);
                    patchResult.undo();
                }
            }
        }),
        removeBasketItem: builder.mutation<Basket, {productId: number, quantity: number}>({
            query: ({productId, quantity}) => ({
                url: `basket?productId=${productId}&quantity=${quantity}`,
                method: "DELETE"
            }),
            onQueryStarted: async ({productId, quantity}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
                        const itemIndex = draft.items.findIndex(item => item.id === productId);
                        if(itemIndex >= 0){
                            draft.items[itemIndex].quantity -= quantity;
                            if(draft.items[itemIndex].quantity <= 0){
                                draft.items.splice(itemIndex, 1);
                            }
                        }
                    })
                )
                try {
                    await queryFulfilled;
                } catch(error){
                    console.log(error);
                    patchResult.undo();
                }
            }
        }) 
    })
});

export const {useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation} = basketApi;