import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { search, getTags } from '../api/posts';
import PostCard from '../components/feed/PostCard';
import styles from './ExplorePage.module.css';

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags().then(r => r.data.data ?? r.data),
  });

  const { data: results, status } = useQuery({
    queryKey: ['search', submitted],
    queryFn: () => search({ q: submitted }).then(r => r.data.data ?? r.data),
    enabled: submitted.length > 1,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmitted(query.trim());
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Explore</h1>
      </header>

      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search posts, blogs, people…"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchBtn}>Search</button>
      </form>

      {!submitted && tags?.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Browse by tag</h2>
          <div className={styles.tagGrid}>
            {tags.map(t => (
              <a key={t.slug} href={`/tag/${t.slug}`} className={styles.tagChip}>
                <span className={styles.tagName}>{t.name}</span>
                {t.posts_count != null && (
                  <span className={styles.tagCount}>{t.posts_count}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {submitted && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Results for <em>"{submitted}"</em>
          </h2>

          {status === 'pending' && <p className={styles.empty}>Searching…</p>}
          {status === 'error'   && <p className={styles.empty}>Search failed.</p>}

          {status === 'success' && (!results || results.length === 0) && (
            <p className={styles.empty}>No results found.</p>
          )}

          {status === 'success' && results?.length > 0 && (
            <div className={styles.results}>
              {results.map(item => (
                <PostCard key={`${item.type}-${item.id}`} item={item} type={item.type ?? 'post'} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
