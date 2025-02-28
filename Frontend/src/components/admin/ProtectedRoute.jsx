import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getCurrentUserRole = async () => {
    try {
        const adminId = localStorage.getItem("adminId");
        if (!adminId) return null;

        const response = await axios.get(`${BACKEND_URL}/admin/check`, { params: { id: adminId } });

        return response.data.status === "success" ? "admin" : "user";
    } catch (err) {
        console.error("Error fetching user role:", err);
        return null;
    }
};

const ProtectedRoute = ({ children, requiredRole }) => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            const role = await getCurrentUserRole();
            setUserRole(role);
            setLoading(false);
        };
        fetchRole();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching
    }

    if (userRole !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
