import axios from "axios";
import { BASE_URL } from "../config";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

instance.interceptors.request.use(
    async (config) => {
        const isAuthEndpoint =
            config.url?.includes("auth/login") ||
            config.url?.includes("auth/register");

        if (config != null && !isAuthEndpoint) {
            if (config.data && !(config.data instanceof FormData)) {
                config.headers["Content-Type"] = "application/json";
            }
            // const schemaName = sessionStorage.getItem("schemaName");
            // console.log("Schema Name from sessionStorage:", schemaName);
            // if (schemaName && schemaName !== '') {
            //     if (!config.url?.includes("auth/")) {
            //         config.headers["X-Tenant-ID"] = schemaName;
            //     }
            // }
            const token = sessionStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data, config } = error.response;

            console.error("Response Error:", {
                url: config?.url,
                status,
                data,
            });

            // ✅ Return only backend error message
            return Promise.reject(data?.error || "Something went wrong");
        }

        if (error.request) {
            return Promise.reject("No response from server");
        }

        return Promise.reject(error.message);
    }
);

export async function loginAPI(reqData: any) {
    try {
        let endPoint = `auth/login`;
        let response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}

export async function registerAPI(reqData: any) {
    try {
        let endPoint = `auth/register`;
        let response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}

export async function logoutAPI() {
    try {
        let endPoint = `auth/logout`;
        let response = await instance.post(endPoint);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}

export async function getProductsAPI(page: number, size: number) {
    try {
        let endPoint = `products?page=${page}&size=${size}&sortBy=createdAt&direction=desc`;
        let response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}


export async function getCartAPI() {
    try {
        let endPoint = `cart`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getOrdersAPI(page: number, size: number, status?: string) {
    try {
        let endPoint = `admin/orders?page=${page}&size=${size}`;

        if (status) {
            endPoint += `&status=${status}`;
        }

        const response = await instance.get(endPoint);

        return response;
    } catch (e) {
        console.log(e, 'Occurred! Please try again');
        throw e;
    }
}

export async function updateOrderStatusAPI(id: string, reqData: any) {
    try {
        let endPoint = `admin/orders/${id}/status`;
        const response = await instance.patch(endPoint, reqData)
        return response;
    } catch (e) {
        console.log(e, 'Occurred! Please try again');
        throw e;
    }
}

export async function deleteOrderAPI(id: string) {
    try {
        // let endPoint = `admin/orders?page=${page}&size=${size}`;


        // const response = await instance.get(endPoint);

        // return response;
    } catch (e) {
        console.log(e, 'Occurred! Please try again');
        throw e;
    }
}

export async function getProductAPI(page: number, size: number) {
    try {
        let endPoint = `admin/products?page=${page}&size=${size}`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

// PUT /admin/products/{id}
export const updateProductAPI = async (id: string, req: any) => {
    try {
        // await instance.put(`/admin/products/${id}`, req)

        let endPoint = `/admin/products/${id}`;
        const response = await instance.put(endPoint, req);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

// DELETE /admin/products/{id}
export const deleteProductAPI = async (id: string) => {
    try {
        let endPoint = `/admin/products/${id}`;
        const response = await instance.delete(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}
// await instance.delete(`/admin/products/${id}`)

// PATCH /admin/products/{id}/toggle-active
export const toggleActiveAPI = async (id: string) => {
    try {
        let endPoint = `/admin/products/${id}/toggle-active`;
        const response = await instance.patch(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}
// await instance.patch(`/admin/products/${id}/toggle-active`)

// PATCH /admin/products/{id}/toggle-featured
export const toggleFeaturedAPI = async (id: string) => {
    try {
        let endPoint = `/admin/products/${id}/toggle-featured`;
        const response = await instance.patch(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}
// await instance.patch(`/admin/products/${id}/toggle-featured`)

// PATCH /admin/products/{id}/stock
export const updateStockAPI = async (id: string, req: { size: string; quantity: number, price: number, mrp: number }) => {
    try {
        console.log(req);

        let endPoint = `/admin/products/${id}/stock`;
        const response = await instance.patch(endPoint, req);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}
// await instance.patch(`/admin/products/${id}/stock`, req)

export async function getUsersAPI(page: number, size: number) {
    try {
        let endPoint = `admin/users?page=${page}&size=${size}`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getReviewsAPI(page: number, size: number) {
    try {
        let endPoint = `admin/reviews?page=${page}&size=${size}`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function createProductAPI(reqData: any) {
    try {
        let endPoint = `admin/products`;
        const response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getDashboardAPI() {
    try {
        let endPoint = `admin/dashboard`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getCouponsAPI() {
    try {
        let endPoint = `admin/coupons`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function removeCartAPI(cartItemId: string) {
    try {
        let endPoint = `cart/${cartItemId}`;
        const response = await instance.delete(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function updateCartAPI(cartItemId: string, quantity: any) {
    try {
        let endPoint = `cart/${cartItemId}?quantity=${quantity}`;
        const response = await instance.put(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getAddressAPI() {
    try {
        let endPoint = `addresses`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function postAddressAPI(reqData: any) {
    try {
        let endPoint = `addresses`;
        const response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function deleteAddressAPI(id: any) {
    try {
        let endPoint = `addresses/${id}`;
        const response = await instance.delete(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function editAddressAPI(id: any, reqData: any) {
    try {
        let endPoint = `addresses/${id}`;
        const response = await instance.put(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function editReviewsStatusAPI(reviewId: any, status: any, adminReply?: any) {
    try {
        let endPoint = `admin/reviews/${reviewId}/status?status=${status}`;
        const response = await instance.patch(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

