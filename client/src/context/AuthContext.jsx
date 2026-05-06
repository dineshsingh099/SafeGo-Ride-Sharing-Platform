import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
} from "react";

import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const didInit = useRef(false);

	const loadUser = useCallback(async () => {
		try {
			const res = await authService.getProfile();

			const userData = res?.data?.user || res?.user || null;

			setUser(userData);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (didInit.current) return;

		didInit.current = true;

		loadUser();
	}, [loadUser]);

	const login = async (credentials) => {
		const res = await authService.login(credentials);

		const userData = res?.data?.user || null;

		setUser(userData);

		return userData;
	};

	const register = async (formData) => {
		return await authService.register(formData);
	};

	const verifyOtp = async (email, otp) => {
		const res = await authService.verifyOtp(email, otp);

		const userData = res?.data?.user || null;

		setUser(userData);

		return userData;
	};

	const logout = async () => {
		try {
			await authService.logout();
		} catch {}

		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				register,
				verifyOtp,
				logout,
				setUser,
				loadUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
