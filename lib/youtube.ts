export function getYouTubeVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.slice(1).split('/')[0] || null;
    }
    if (u.hostname.includes('youtube.com')) {
      return u.searchParams.get('v');
    }
    return null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(
  url: string,
  opts?: { autoplay?: boolean; mute?: boolean }
): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  if (opts?.autoplay) params.set('autoplay', '1');
  if (opts?.mute) params.set('mute', '1');

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
