import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { createComment, deleteComment } from '../../api/comments';
import useAuthStore from '../../store/authStore';
import styles from './CommentThread.module.css';

export default function CommentThread({ comments, contentType, contentId }) {
  const rootComments = comments.filter(c => !c.parent_id);

  return (
    <div className={styles.thread}>
      <CommentComposer contentType={contentType} contentId={contentId} parentId={null} />
      <div className={styles.list}>
        {rootComments.map(c => (
          <CommentNode
            key={c.id}
            comment={c}
            replies={comments.filter(r => r.parent_id === c.id)}
            allComments={comments}
            contentType={contentType}
            contentId={contentId}
          />
        ))}
      </div>
    </div>
  );
}

function CommentNode({ comment, replies, allComments, contentType, contentId }) {
  const [showReply, setShowReply] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const qc = useQueryClient();

  const del = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments'] }),
  });

  const isOwn = user?.id === comment.user_id;

  return (
    <div className={styles.node}>
      <div className={styles.comment}>
        <div className={styles.avatar}>
          {comment.author?.avatar
            ? <img src={comment.author.avatar} alt={comment.author.name} />
            : comment.author?.name?.[0]?.toUpperCase()}
        </div>

        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.name}>{comment.author?.name}</span>
            <span className={styles.time}>
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>

          <p className={styles.text}>{comment.body}</p>

          <div className={styles.actions}>
            {isAuthenticated && (
              <button className={styles.action} onClick={() => setShowReply(v => !v)}>
                {showReply ? 'Cancel' : 'Reply'}
              </button>
            )}
            {isOwn && (
              <button className={`${styles.action} ${styles.danger}`} onClick={() => del.mutate()}>
                Delete
              </button>
            )}
          </div>

          {showReply && (
            <CommentComposer
              contentType={contentType}
              contentId={contentId}
              parentId={comment.id}
              mention={`@${comment.author?.username} `}
              onSuccess={() => setShowReply(false)}
            />
          )}
        </div>
      </div>

      {replies.length > 0 && (
        <div className={styles.replies}>
          {replies.map(r => (
            <CommentNode
              key={r.id}
              comment={r}
              replies={allComments.filter(x => x.parent_id === r.id)}
              allComments={allComments}
              contentType={contentType}
              contentId={contentId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentComposer({ contentType, contentId, parentId, mention = '', onSuccess }) {
  const [body, setBody] = useState(mention);
  const { isAuthenticated } = useAuthStore();
  const qc = useQueryClient();

  const post = useMutation({
    mutationFn: () => createComment(`${contentType}s`, contentId, { body, parent_id: parentId }),
    onSuccess: () => {
      setBody('');
      qc.invalidateQueries({ queryKey: ['comments'] });
      onSuccess?.();
    },
  });

  if (!isAuthenticated) return null;

  return (
    <div className={styles.composer}>
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Write a comment…"
        className={styles.composerInput}
        rows={2}
      />
      <button
        className={styles.composerSubmit}
        disabled={!body.trim() || post.isPending}
        onClick={() => post.mutate()}
      >
        {post.isPending ? 'Posting…' : 'Post'}
      </button>
    </div>
  );
}
