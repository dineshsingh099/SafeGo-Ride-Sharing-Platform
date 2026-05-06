import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
	timeout: 15000,
});

let isRefreshing = false;

let waitingQueue = [];

function resolveQueue(error = null) {
	waitingQueue.forEach((promise) => {
		if (error) {
			promise.reject(error);
		} else {
			promise.resolve();
		}
	});

	waitingQueue = [];
}

function extractErrorMsg(data) {
	if (!data) {
		return "An unexpected error occurred.";
	}

	if (data.detail) {
		if (Array.isArray(data.detail)) {
			return (
				data.detail[0]?.msg?.replace(/^Value error,\s*/i, "") ||
				"Validation error."
			);
		}

		return data.detail;
	}

	return data.message || "An unexpected error occurred.";
}

api.interceptors.response.use(
	(response) => response.data,

	async (error) => {
		const originalRequest = error.config;

		const status = error.response?.status;

		const isRefreshCall = originalRequest?.url?.includes(
			"/users/refresh-token",
		);

		const isLogoutCall = originalRequest?.url?.includes("/users/logout");

		if (
			status === 401 &&
			!originalRequest._retry &&
			!isRefreshCall &&
			!isLogoutCall
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					waitingQueue.push({ resolve, reject });
				})
					.then(() => api(originalRequest))
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;

			isRefreshing = true;

			try {
				await api.post("/users/refresh-token");

				resolveQueue();

				isRefreshing = false;

				return api(originalRequest);
			} catch (refreshError) {
				resolveQueue(refreshError);

				isRefreshing = false;

				const publicRoutes = [
					"/",
					"/login",
					"/signup",
					"/verify-otp",
					"/forgot-password",
					"/reset-password",
					"/admin/login",
				];

				const isPublicPage = publicRoutes.some(
					(route) =>
						window.location.pathname === route ||
						window.location.pathname.startsWith(route + "/"),
				);

				if (!isPublicPage) {
					window.location.href = "/login";
				}

				return Promise.reject(
					new Error(extractErrorMsg(refreshError.response?.data)),
				);
			}
		}

		return Promise.reject(new Error(extractErrorMsg(error.response?.data)));
	},
);

export default api;
