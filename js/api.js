/**
 * GrowSaathi Frontend API Helper & Authentication Module
 * Centralizes JWT token storage, login, registration, logout, and authenticated fetch.
 */

const API_BASE_URL = 'http://localhost:8080';
const TOKEN_KEY = 'growsaathi_token';
const USER_KEY = 'growsaathi_user';

const AuthAPI = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    setToken(token) {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        }
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getUser() {
        const userJson = localStorage.getItem(USER_KEY);
        try {
            return userJson ? JSON.parse(userJson) : null;
        } catch (e) {
            return null;
        }
    },

    setUser(user) {
        if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
    },

    removeUser() {
        localStorage.removeItem(USER_KEY);
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed. Please check your credentials.');
        }

        this.setToken(data.token);
        this.setUser({
            merchantId: data.merchantId,
            name: data.name,
            email: data.email
        });

        return data;
    },

    async register(name, email, password) {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed. Please try again.');
        }

        this.setToken(data.token);
        this.setUser({
            merchantId: data.merchantId,
            name: data.name,
            email: data.email
        });

        return data;
    },

    logout() {
        this.removeToken();
        this.removeUser();
        window.location.href = 'login.html';
    },

    async authFetch(url, options = {}) {
        const targetUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
        const headers = options.headers ? { ...options.headers } : {};

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const fetchOptions = {
            ...options,
            headers
        };

        const response = await fetch(targetUrl, fetchOptions);

        if (response.status === 401) {
            console.warn('Session expired or unauthenticated. Redirecting to login...');
            this.removeToken();
            this.removeUser();
            window.location.href = 'login.html';
            throw new Error('Authentication required.');
        }

        if (response.status === 403) {
            console.error('Forbidden: You are not authorized to access this merchant data.');
            throw new Error('You are not authorized to access this merchant data.');
        }

        return response;
    }
};

// Expose globally
window.AuthAPI = AuthAPI;