import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/lib/youtube';

export type VideoPlayerKind = 'iframe' | 'native';

export type ResolvedVideo = {
  kind: VideoPlayerKind;
  /** iframe src or direct file URL for <video> */
  src: string;
  thumbnail: string | null;
};

const DIRECT_VIDEO = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i;

function getVimeoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes('vimeo.com')) return null;
    const parts = u.pathname.split('/').filter(Boolean);
    const id = parts.find((p) => /^\d+$/.test(p));
    return id ?? null;
  } catch {
    const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    return m?.[1] ?? null;
  }
}

function getVimeoEmbed(url: string, autoplay?: boolean): string | null {
  const id = getVimeoId(url);
  if (!id) return null;
  const params = new URLSearchParams();
  if (autoplay) params.set('autoplay', '1');
  const q = params.toString();
  return `https://player.vimeo.com/video/${id}${q ? `?${q}` : ''}`;
}

function getGoogleDriveEmbed(url: string): string | null {
  const m = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (m?.[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return null;
}

function getRutubeEmbed(url: string): string | null {
  const m = url.match(/rutube\.ru\/video\/([a-f0-9]+)/i);
  if (m?.[1]) return `https://rutube.ru/play/embed/${m[1]}`;
  return null;
}

function isDirectVideoUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return DIRECT_VIDEO.test(u.pathname);
  } catch {
    return DIRECT_VIDEO.test(url);
  }
}

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/**
 * Resolves any common video URL to iframe or native <video> playback.
 */
export function resolveVideoUrl(url: string, opts?: { autoplay?: boolean }): ResolvedVideo | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const autoplay = opts?.autoplay ?? false;

  const youtubeEmbed = getYouTubeEmbedUrl(trimmed, { autoplay, mute: autoplay });
  if (youtubeEmbed) {
    return {
      kind: 'iframe',
      src: youtubeEmbed,
      thumbnail: getYouTubeThumbnail(trimmed),
    };
  }

  const vimeoEmbed = getVimeoEmbed(trimmed, autoplay);
  if (vimeoEmbed) {
    return {
      kind: 'iframe',
      src: vimeoEmbed,
      thumbnail: null,
    };
  }

  const driveEmbed = getGoogleDriveEmbed(trimmed);
  if (driveEmbed) {
    return { kind: 'iframe', src: driveEmbed, thumbnail: null };
  }

  const rutubeEmbed = getRutubeEmbed(trimmed);
  if (rutubeEmbed) {
    return { kind: 'iframe', src: rutubeEmbed, thumbnail: null };
  }

  if (isDirectVideoUrl(trimmed)) {
    return { kind: 'native', src: trimmed, thumbnail: null };
  }

  if (isHttpUrl(trimmed)) {
    return { kind: 'iframe', src: trimmed, thumbnail: null };
  }

  return null;
}
