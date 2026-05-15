import { useAuthStore } from '../stores/auth.store';

export function useUser() {
  return useAuthStore(state => state.user);
}
