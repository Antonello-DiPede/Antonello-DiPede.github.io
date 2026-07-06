import { useState } from 'react';

export default function LogoBadge({ src, initials, alt }) {
  const [imageError, setImageError] = useState(false);
  const showImage = src && !imageError;

  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
      style={{ background: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain p-2"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-steel)' }}>
          {initials}
        </span>
      )}
    </div>
  );
}
