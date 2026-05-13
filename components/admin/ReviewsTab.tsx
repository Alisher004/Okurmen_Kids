'use client';

import { Star, Trash2, MessageSquare } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function ReviewsTab() {
  const { reviews, deleteReview } = useData();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Пикирлер ({reviews.length})</h2>
      </div>

      {reviews.length === 0 ? (
        <div className="p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Азырынча пикирлер жок</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{review.name}</h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-4 w-4 ${
                          rating <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.review}</p>
              </div>

              <button
                onClick={() => deleteReview(review.id)}
                className="self-start rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
                aria-label="Пикирди өчүрүү"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
