'use client';

import { Link2, X } from 'lucide-react';

type ImageUrlFieldProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
};

export default function ImageUrlField({
  label = 'Сүрөттүн шилтемеси (URL)',
  value,
  onChange,
  placeholder = 'https://example.com/surat.jpg',
  hint = 'Сүрөттү жүктөбөйсүз — интернеттеги шилтемени көчүрүп коюңуз (Imgur, Google Drive, сайт ж.б.).',
  required = false,
}: ImageUrlFieldProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Link2 className="h-4 w-4 text-blue-600" />
        <span>
          {label} {required && '*'}
        </span>
      </label>

      {value && (
        <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50">
          <img
            src={value}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 rounded-lg bg-black/50 p-1.5 text-white hover:bg-black/70"
            aria-label="Шилтемени өчүрүү"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <input
        type="url"
        inputMode="url"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
        required={required}
      />
      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{hint}</p>
    </div>
  );
}
