import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
const initialUser = {
    value: JSON.parse(localStorage.getItem("userData")) || {
        cart: {
            cartItems: [],
            cartTotalAmount: 0,
            cartTotalQuantity: 0,
        }
    },
    status: 'idle',
}
export const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        addToCart: (state, action) => {
            const itemIndex = state.value.cart.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            if (itemIndex < 0) {
                state.value.cart.cartItems.push({ ...action.payload, cartQuantity: 1 })
                toast.success(`Đã thêm ${action.payload.name} vào giỏ hàng`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                state.value.cart.cartItems[itemIndex].cartQuantity += 1;
            }
        },
        removeCart: (state, action) => {
            const newCart = state.value.cart.cartItems.filter(
                (item) => item.id !== action.payload.id
            )
            state.value.cart.cartItems = newCart
            toast.error(`Đã xoá ${action.payload.name} khỏi giỏ hàng`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.value.cart.cartItems.findIndex(
                item => item.id === action.payload.id
            )
            if (state.value.cart.cartItems[itemIndex].cartQuantity > 1) {
                state.value.cart.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.value.cart.cartItems[itemIndex].cartQuantity === 1) {
                const newCart = state.value.cart.cartItems.filter(
                    (item) => item.id !== action.payload.id
                )
                state.value.cart.cartItems = newCart
            }
        },
        increaseCart: (state, action) => {
            const itemIndex = state.value.cart.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            state.value.cart.cartItems[itemIndex].cartQuantity += 1;
        },
        getTotal: (state, action) => {
            const { total, quanti } = state.value.cart.cartItems.reduce(
                (acc, curr) => {
                    const { newPrice, cartQuantity } = curr
                    const toltalPrice = newPrice * cartQuantity
                    acc.total += toltalPrice
                    acc.quanti += cartQuantity
                    return acc
                }, { total: 0, quanti: 0 })
            state.value.cart.cartTotalAmount = total
            state.value.cart.cartTotalQuantity = quanti
        },
        logout: (state, action) => {
            localStorage.removeItem("userData");
            state.value = {
                cart: {
                    cartItems: [],
                    cartTotalAmount: 0,
                    cartTotalQuantity: 0,
                }
            }
        }
    }
})


export const { addToCart, removeCart, increaseCart, decreaseCart, getTotal, setCart, logout, setUser } = userSlice.actions
export default userSlice.reducer;
