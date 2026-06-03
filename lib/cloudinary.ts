const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

export type CloudinaryUploadResponse = {
  secure_url: string;
  public_id?: string;
  width?: number;
  height?: number;
};

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
}

export function getCloudinaryConfigError(): string | null {
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME .env.local файлында жок';
  }
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
    return 'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET .env.local файлында жок';
  }
  return null;
}

export function validateImageFile(file: File): string | null {
  if (!file.type.startsWith('image/') || !ALLOWED_TYPES.includes(file.type)) {
    return 'JPEG, PNG, WebP, GIF же AVIF сүрөт тандаңыз';
  }
  if (file.size > MAX_BYTES) {
    return 'Сүрөт 10 МБдан кичине болушу керек';
  }
  return null;
}

export async function uploadImage(file: File): Promise<string> {
  const configError = getCloudinaryConfigError();
  if (configError) {
    throw new Error(configError);
  }

  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  let body: CloudinaryUploadResponse & { error?: { message?: string } };
  try {
    body = (await response.json()) as typeof body;
  } catch {
    throw new Error('Cloudinary жообун окуу мүмкүн болгон жок');
  }

  if (!response.ok) {
    throw new Error(body.error?.message || `Сүрөт жүктөө ийгиликсиз (${response.status})`);
  }

  if (!body.secure_url) {
    throw new Error('Cloudinary жообунда secure_url жок');
  }

  return body.secure_url;
}

/** Жаңы файл болсо жүктөйт; болбосо мурунку URL калтырат */
export async function resolveImageUrl(savedUrl: string, pendingFile: File | null): Promise<string> {
  if (pendingFile) {
    return uploadImage(pendingFile);
  }
  return savedUrl.trim();
}

/** Милдеттүү сүрөт: файл же мурунку URL */
export async function resolveRequiredImageUrl(
  savedUrl: string,
  pendingFile: File | null,
  fieldLabel: string
): Promise<string> {
  if (pendingFile) {
    return uploadImage(pendingFile);
  }
  const trimmed = savedUrl.trim();
  if (trimmed) {
    return trimmed;
  }
  throw new Error(`${fieldLabel} тандоо керек`);
}

/** Опционалдуу сүрөт (thumbnail, mobile banner) */
export async function resolveOptionalImageUrl(
  savedUrl: string | undefined,
  pendingFile: File | null
): Promise<string | undefined> {
  if (pendingFile) {
    return uploadImage(pendingFile);
  }
  const trimmed = savedUrl?.trim();
  return trimmed || undefined;
}
