'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Send } from 'lucide-react';
import { useData } from '@/context/DataContext';
import SectionHeading from './SectionHeading';

export default function Testimonials() {
  const { reviews, addReview } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', review: '', rating: 5 });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    await addReview({ name: formData.name, review: formData.review, rating: formData.rating });
    setIsModalOpen(false);
    setFormData({ name: '', review: '', rating: 5 });
    alert('Рахмат! Сиздин пикириңиз кабыл алынды.');
  };

  if (reviews.length === 0) return null;

  const reviewButton = (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => setIsModalOpen(true)}
      className="btn-primary mt-2 px-8 py-4 text-base"
    >
      <Send className="h-5 w-5" />
      Пикир калтыруу
    </motion.button>
  );

  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="section-alt relative overflow-hidden py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <SectionHeading
            badgeIcon={Quote}
            badge="Пикирлер"
            title="Биздин студенттер жана ата-энелер"
            subtitle="Биз менен тажрыйбаңызды бөлүшүңүз"
          />
          {reviewButton}
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-brand-navy-50/95 to-transparent md:w-32" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-brand-navy-50/95 to-transparent md:w-32" />

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -1920] }}
              transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 40, ease: 'linear' } }}
              style={{ width: 'max-content' }}
            >
              {duplicatedReviews.map((review, index) => (
                <motion.div
                  key={`${review.id}-${index}`}
                  whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
                  className="w-[min(100vw-2rem,24rem)] shrink-0"
                >
                  <article className="brand-card-luxury group relative h-full overflow-hidden p-8">
                    <Quote className="absolute right-6 top-6 h-14 w-14 text-brand-navy-100 transition-colors group-hover:text-brand-orange-100" />

                    <div className="relative z-10 mb-6 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy-600 to-brand-navy-700 text-xl font-bold text-white shadow-md">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-navy-700">{review.name}</h3>
                        <p className="text-sm text-brand-navy-500">
                          {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 mb-4 flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brand-orange-400 text-brand-orange-400" />
                      ))}
                    </div>

                    <p className="relative z-10 line-clamp-4 leading-relaxed text-brand-navy-700">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-50/0 to-brand-orange-50/0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:from-brand-navy-50/80 group-hover:to-brand-orange-50/40" />
                  </article>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmitReview}
      />
    </section>
  );
}

function ReviewModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; review: string; rating: number };
  setFormData: (data: { name: string; review: string; rating: number }) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-brand-navy-800/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-6 w-full max-w-2xl rounded-3xl border border-white/10 bg-brand-navy-700 p-6 shadow-brand sm:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-brand-navy-600 via-brand-orange-500 to-brand-orange-400" />

            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Жабуу"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Пикир калтыруу</h3>
            <p className="mb-8 text-brand-navy-200">Биз менен тажрыйбаңызды бөлүшүңүз</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block font-semibold text-white">Атыңыз *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand-orange-400 focus:outline-none focus:ring-4 focus:ring-brand-orange-500/20"
                  placeholder="Сиздин атыңыз"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-white">Баа *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= formData.rating
                            ? 'fill-brand-orange-400 text-brand-orange-400'
                            : 'text-white/25'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-white">Пикириңиз *</label>
                <textarea
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand-orange-400 focus:outline-none focus:ring-4 focus:ring-brand-orange-500/20"
                  placeholder="Биз менен тажрыйбаңызды жазыңыз..."
                />
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-lg">
                <Send className="h-5 w-5" />
                Жөнөтүү
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
