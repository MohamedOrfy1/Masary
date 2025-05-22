import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
    const { updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };
        fetchUserInfo();
        return () => {
            isMounted = false;
        };
    }, []); // <--- Only run once on mount
};
