import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { getNotifications, markRead, markAllRead } from '../api/notifications';
import useNotifStore from '../store/notifStore';
import styles from './NotificationsPage.module.css';

export default function NotificationsPage() {
  const qc = useQueryClient();
  const setUnread = useNotifStore(s => s.setUnreadCount);

  const { data, status } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications().then(r => r.data.data ?? r.data),
  });

  const readOne = useMutation({
    mutationFn: (id) => markRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const readAll = useMutation({
    mutationFn: markAllRead,
    onSuccess: () => {
      setUnread(0);
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const items = data ?? [];
  const hasUnread = items.some(n => !n.read_at);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Notifications</h1>
        {hasUnread && (
          <button className={styles.markAll} onClick={() => readAll.mutate()}>
            Mark all read
          </button>
        )}
      </header>

      {status === 'pending' && <p className={styles.empty}>Loading…</p>}
      {status === 'error'   && <p className={styles.empty}>Failed to load.</p>}

      {status === 'success' && items.length === 0 && (
        <p className={styles.empty}>You're all caught up.</p>
      )}

      {status === 'success' && items.length > 0 && (
        <ul className={styles.list}>
          {items.map(n => (
            <li
              key={n.id}
              className={`${styles.item} ${!n.read_at ? styles.unread : ''}`}
              onClick={() => !n.read_at && readOne.mutate(n.id)}
            >
              <div className={styles.dot} />
              <div className={styles.content}>
                <p className={styles.message}>{n.data?.message ?? n.message}</p>
                <time className={styles.time}>
                  {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
