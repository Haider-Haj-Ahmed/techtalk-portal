import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useCallback } from 'react';
import { getFeed } from '../api/posts';
import PostCard from '../components/feed/PostCard';
import styles from './FeedPage.module.css';

export default function FeedPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['feed'],
      queryFn: ({ pageParam = 1 }) => getFeed({ page: pageParam }).then((r) => r.data),
      getNextPageParam: (last) =>
        last.meta?.current_page < last.meta?.last_page
          ? last.meta.current_page + 1
          : undefined,
    });

  const observer = useRef();
  const bottomRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const items = data?.pages.flatMap((p) => p.data ?? []) ?? [];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Feed</h1>
      </header>

      {status === 'pending' && (
        <div className={styles.list}>
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {status === 'error' && (
        <p className={styles.empty}>Failed to load feed. Try refreshing.</p>
      )}

      {status === 'success' && items.length === 0 && (
        <p className={styles.empty}>Nothing here yet — follow some writers to fill your feed.</p>
      )}

      {status === 'success' && items.length > 0 && (
        <div className={styles.list}>
          {items.map((item) => (
            <PostCard key={`${item.type}-${item.id}`} item={item} type={item.type} />
          ))}
          <div ref={bottomRef} />
          {isFetchingNextPage && <SkeletonCard />}
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={`${styles.skeletonLine} ${styles.skeletonMeta}`} />
      <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
      <div className={`${styles.skeletonLine} ${styles.skeletonExcerpt}`} />
    </div>
  );
}
