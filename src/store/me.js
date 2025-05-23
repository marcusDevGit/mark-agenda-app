import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import axios from '@/plugins/axios';
import { useAuthStore } from './auth';

export const useMeStore = defineStore('me', {
  state: () => ({
    user: null,
    currentTeamToken: useStorage('team_id', ''),
  }),

  actions: {
    async getMe() {
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.user = null;
        return Promise.resolve();
      }

      try {
        const response = await axios.get('api/routes/user/profile');
        this.user = response.data;

        return response;
      } catch (error) {
        this.user = null;
        return Promise.reject(error);
      }
    },


  },

  getters: {
    isLoggedIn: (state) => !!state?.user?.id,

  }
})
