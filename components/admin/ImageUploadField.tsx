'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ImagePlus, Loader2, Upload, X } from 'lucide-react';
import {
  getCloudinaryConfigError,
  isCloudinaryConfigured,
  validateImageFile,
} from '@/lib/cloudinary';

export type ImageUploadFieldProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  onPendingFileChange: (file: File | null) => void;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
};

export default function ImageUploadField({
  label = 'Сүрөт',
  value,
  onChange,
  onPendingFileChange,
  required = false,
  optional = false,
  disabled = false,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [localError, setLocalError] = useState('');

  const configured = isCloudinaryConfigured();
  const previewSrc = localPreview || value || null;
  const hasPending = Boolean(localPreview);
  const hasSaved = Boolean(value && !hasPending);

  const revokeBlob = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => revokeBlob();
  }, []);

  const clearSelection = () => {
    revokeBlob();
    setLocalPreview(null);
    setFileName('');
    onPendingFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = () => {
    clearSelection();
    onChange('');
    setLocalError('');
  };

  const handleFile = (file: File | undefined) => {
    if (!file || disabled) return;
    setLocalError('');

    const validationError = validateImageFile(file);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    if (!configured) {
      setLocalError(getCloudinaryConfigError() || 'Cloudinary конфигурациясы жок');
      return;
    }

    clearSelection();
    const blob = URL.createObjectURL(file);
    blobUrlRef.current = blob;
    setLocalPreview(blob);
    setFileName(file.name);
    onPendingFileChange(file);
  };

  const configError = !configured ? getCloudinaryConfigError() : null;

  return (
    <div className={disabled ? 'pointer-events-none opacity-60' : ''}>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <ImagePlus className="h-4 w-4 shrink-0 text-brand-gold-500" />
        <span>
          {label}
          {required && !optional && ' *'}
          {optional && <span className="font-normal text-gray-500"> (милдеттүү эмес)</span>}
        </span>
      </label>

      {configError && (
        <p className="mb-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          {configError}
        </p>
      )}

      {previewSrc ? (
        <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-100">
          <img
            src={previewSrc}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.opacity = '0.3';
            }}
          />
          {hasPending && (
            <span className="absolute left-2 top-2 rounded-md bg-brand-gold-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Жаңы файл
            </span>
          )}
          {hasSaved && !hasPending && (
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-emerald-600/90 px-2 py-0.5 text-[10px] font-semibold text-white">
              <CheckCircle2 className="h-3 w-3" />
              Сакталган
            </span>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-lg bg-black/50 p-1.5 text-white hover:bg-black/70"
            aria-label="Сүрөттү өчүрүү"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mb-3 flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400">
          Сүрөт тандалган жок
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled || !configured}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <button
        type="button"
        disabled={disabled || !configured}
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-brand-gold-500 hover:bg-brand-gold-50/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Upload className="h-4 w-4 text-brand-gold-500" />
        {previewSrc ? 'Башка сүрөт тандоо' : 'Сүрөт файлын тандоо'}
      </button>

      {fileName && (
        <p className="mt-1.5 truncate text-xs text-gray-500" title={fileName}>
          {fileName}
        </p>
      )}

      {localError && <p className="mt-2 text-xs font-medium text-red-600">{localError}</p>}

      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
        Сүрөт Cloudinary&apos;ге жүктөлөт, Firestore&apos;до URL катары сакталат. Эски шилтемелер иштей берет.
      </p>
    </div>
  );
}

/** Форма сакталууда көрсөтүү үчүн */
export function FormUploadSpinner({ label = 'Сүрөт жүктөлүүдө...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-600">
      <Loader2 className="h-4 w-4 animate-spin text-brand-gold-500" />
      {label}
    </div>
  );
}
