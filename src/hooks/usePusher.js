import { useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import { PUSHER_KEY, PUSHER_CLUSTER } from '../lib/constants';
import useAuthStore from '../store/authStore';
import useNotifStore from '../store/notifStore';

let pusherInstance = null;

export function usePusher() {
  const { user, token, isAuthenticated } = useAuthStore();
  const increment = useNotifStore((s) => s.increment);
  const channelRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user || !PUSHER_KEY) return;

    if (!pusherInstance) {
      pusherInstance = new Pusher(PUSHER_KEY, {
        cluster: PUSHER_CLUSTER,
        authEndpoint: `${import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'}/broadcasting/auth`,
        auth: { headers: { Authorization: `Bearer ${token}` } },
      });
    }

    const channel = pusherInstance.subscribe(`private-user.${user.id}`);
    channelRef.current = channel;

    channel.bind('notification.created', () => {
      increment();
    });

    return () => {
      channel.unbind_all();
      pusherInstance?.unsubscribe(`private-user.${user.id}`);
    };
  }, [isAuthenticated, user?.id]);
}
