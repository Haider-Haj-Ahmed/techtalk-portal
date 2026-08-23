import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import styles from './PostCard.module.css';

export default function PostCard({ item, type = 'post' }) {
  const slug = item.slug;
  const to = `/${type === 'blog' ? 'blog' : 'post'}/${slug}`;
  const date = item.published_at ?? item.created_at;

  return (
    <article className={styles.card}>
      <div className={styles.accent} />

      <div className={styles.meta}>
        <Link to={`/u/${item.author?.username}`} className={styles.author}>
          <span className={styles.authorAvatar}>
            {item.author?.avatar
              ? <img src={item.author.avatar} alt={item.author.name} />
              : item.author?.name?.[0]?.toUpperCase()}
          </span>
          <span>{item.author?.name}</span>
        </Link>
        <span className={styles.dot}>·</span>
        <time className={styles.time}>
          {date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : ''}
        </time>
        {type === 'blog' && <span className={styles.typeBadge}>Blog</span>}
      </div>

      <Link to={to} className={styles.titleLink}>
        <h2 className={styles.title}>{item.title}</h2>
      </Link>

      {item.excerpt && (
        <p className={styles.excerpt}>{item.excerpt}</p>
      )}

      <div className={styles.footer}>
        {item.tags?.length > 0 && (
          <div className={styles.tags}>
            {item.tags.slice(0, 3).map((tag) => (
              <Link key={tag.slug} to={`/tag/${tag.slug}`} className={styles.tag}>
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        <div className={styles.reactions}>
          <span className={styles.reaction}>
            <span>▲</span> {item.reactions?.likes ?? 0}
          </span>
          <span className={styles.reaction}>
            <span>◆</span> {item.reactions?.highlights ?? 0}
          </span>
          <span className={styles.reaction}>
            <span>◎</span> {item.comments_count ?? 0}
          </span>
        </div>
      </div>
    </article>
  );
}
