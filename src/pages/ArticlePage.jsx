import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { getPost } from '../api/posts';
import { reactTo } from '../api/posts';
import { getComments } from '../api/comments';
import CommentThread from '../components/article/CommentThread';
import styles from './ArticlePage.module.css';

export default function ArticlePage({ type = 'post' }) {
  const { slug } = useParams();
  const qc = useQueryClient();

  const fetcher = type === 'blog'
    ? () => import('../api/posts').then(m => m.getBlog(slug))
    : () => getPost(slug);

  const { data, status } = useQuery({
    queryKey: [type, slug],
    queryFn: () => fetcher().then(r => r.data.data ?? r.data),
  });

  const { data: commentsData } = useQuery({
    queryKey: ['comments', type, slug],
    queryFn: () => getComments(`${type}s`, data?.id).then(r => r.data.data ?? r.data),
    enabled: !!data?.id,
  });

  const react = useMutation({
    mutationFn: (reaction) => reactTo(`${type}s`, data.id, reaction),
    onSuccess: () => qc.invalidateQueries({ queryKey: [type, slug] }),
  });

  if (status === 'pending') return <div className={styles.loading}>Loading…</div>;
  if (status === 'error')   return <div className={styles.error}>Failed to load article.</div>;

  const article = data;

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.author}>{article.author?.name}</span>
            <span className={styles.dot}>·</span>
            <time className={styles.time}>
              {formatDistanceToNow(new Date(article.published_at ?? article.created_at), { addSuffix: true })}
            </time>
          </div>

          <h1 className={styles.title}>{article.title}</h1>

          {article.tags?.length > 0 && (
            <div className={styles.tags}>
              {article.tags.map(t => (
                <span key={t.slug} className={styles.tag}>{t.name}</span>
              ))}
            </div>
          )}
        </header>

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: article.body ?? article.content ?? '' }}
        />

        <footer className={styles.reactions}>
          {[
            { key: 'like',      icon: '▲', label: article.reactions?.likes ?? 0 },
            { key: 'dislike',   icon: '▼', label: article.reactions?.dislikes ?? 0 },
            { key: 'highlight', icon: '◆', label: article.reactions?.highlights ?? 0 },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              className={`${styles.reactionBtn} ${article.user_reaction === key ? styles.reactionActive : ''}`}
              onClick={() => react.mutate(key)}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </footer>
      </article>

      <section className={styles.comments}>
        <h2 className={styles.commentsHeading}>
          Comments <span className={styles.commentsCount}>{commentsData?.length ?? 0}</span>
        </h2>
        <CommentThread
          comments={commentsData ?? []}
          contentType={type}
          contentId={article.id}
        />
      </section>
    </div>
  );
}
