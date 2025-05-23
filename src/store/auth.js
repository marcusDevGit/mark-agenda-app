import { defineStore } from 'pinia';
import axios from 'axios'
import { useMeStore } from '@/store/me';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    login(email, password) {
      return axios.post('api/routes/user/login', {
        email,
        password
      }).then((response) => {
        const token = response.data.token;
        this.token = token;
        localStorage.setItem('token', token);

        //busca dados do user
        return this.fetchUserProfile();
      });
    },
    async fetchUserProfile() {
      const meStore = useMeStore();
      return meStore.getMe();
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      const meStore = useMeStore();
      meStore.$reset();

    },
    register(firstName, email, password) {
      return axios.post('api/routes/user/register', {
        name: firstName,
        email,
        password
      });
    },
    // verifyEmail(token) {
    //   return axios.post('api/routes/user/verify-email', {token})
    // },
    forgotPassword(email) {
      return axios.post('api/routes/user/forgot-password', { email })
    },
    resetPassword(token, newPassword) {
      return axios.post('api/routes/user/reset-password', { token, newPassword })
    }
  }
});
