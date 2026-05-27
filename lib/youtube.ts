export function getYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0];
      return id || null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const v = u.searchParams.get('v');
      if (v) return v;

      const parts = u.pathname.split('/').filter(Boolean);
      // /shorts/VIDEO_ID, /embed/VIDEO_ID, /live/VIDEO_ID, /v/VIDEO_ID
      const pathKinds = ['shorts', 'embed', 'live', 'v'];
      if (parts.length >= 2 && pathKinds.includes(parts[0])) {
        return parts[1] || null;
      }
    }
  } catch {
    /* fall through to regex */
  }

  const patterns = [
    /(?:youtube\.com\/shorts\/)([\w-]{11})/i,
    /(?:youtube\.com\/embed\/)([\w-]{11})/i,
    /(?:youtube\.com\/watch\?[^#]*v=)([\w-]{11})/i,
    /(?:youtu\.be\/)([\w-]{11})/i,
  ];
  for (const re of patterns) {
    const m = trimmed.match(re);
    if (m?.[1]) return m[1];
  }

  return null;
}

export function isYouTubeShortUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const u = new URL(trimmed);
    return u.pathname.includes('/shorts/');
  } catch {
    return /youtube\.com\/shorts\//i.test(trimmed);
  }
}

export function getYouTubeEmbedUrl(
  url: string,
  opts?: { autoplay?: boolean }
): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  if (opts?.autoplay) params.set('autoplay', '1');

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  if (isYouTubeShortUrl(url)) {
    return `https://i.ytimg.com/vi/${id}/oar2.jpg`;
  }
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
