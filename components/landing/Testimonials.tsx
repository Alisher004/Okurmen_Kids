'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Send } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  review: string;
  rating: number;
  avatar: string;
  createdAt: Date;
}

export default function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', review: '', rating: 5 });
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedReviews = localStorage.getItem('okurmen_reviews');
      if (savedReviews) {
        const parsed = JSON.parse(savedReviews);
        setReviews(parsed.map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt)
        })));
      }
    }
  }, []);

  // Save reviews to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && reviews.length > 0) {
      localStorage.setItem('okurmen_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReview: Review = {
      id: Date.now().toString(),
      name: formData.name,
      review: formData.review,
      rating: formData.rating,
      avatar: '�',
      createdAt: new Date(),
    };

    setReviews(prev => [newReview, ...prev]);
    setIsModalOpen(false);
    setFormData({ name: '', review: '', rating: 5 });
    alert('Рахмат! Сиздин пикириңиз кабыл алынды.');
  };

  // Don't show section if no reviews
  if (reviews.length === 0) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-4">
              Пикирлер
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto mb-8">
              Биздин студенттер жана ата-энелер эмне дешет
            </p>
            
            {/* Leave Review Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Биринчи пикирди калтыруу</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Review Modal */}
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

  // Duplicate reviews for infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-4">
            Пикирлер
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto mb-8">
            Биздин студенттер жана ата-энелер эмне дешет
          </p>
          
          {/* Leave Review Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Пикир калтыруу</span>
          </motion.button>
        </motion.div>

        {/* Infinite Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-6"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              whileHover={{
                animationPlayState: "paused",
              }}
              style={{
                width: 'max-content',
              }}
            >
              {duplicatedReviews.map((review, index) => (
                <motion.div
                  key={`${review.id}-${index}`}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  className="flex-shrink-0 w-96"
                >
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl h-full relative overflow-hidden group">
                    {/* Quote Icon */}
                    <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-200 group-hover:text-blue-100 transition-colors duration-300" />
                    
                    {/* Avatar & Info */}
                    <div className="flex items-center space-x-4 mb-6 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        {review.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-950 text-lg">{review.name}</h3>
                        <p className="text-sm text-slate-500">
                          {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-700 leading-relaxed relative z-10 line-clamp-4">
                      "{review.review}"
                    </p>

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
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

// Review Modal Component
function ReviewModal({ 
  isOpen, 
  onClose, 
  formData, 
  setFormData, 
  onSubmit 
}: {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; review: string; rating: number };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Modal Content */}
              <h3 className="text-3xl font-bold text-white mb-2">Пикир калтыруу</h3>
              <p className="text-white/70 mb-8">Биз менен тажрыйбаңызды бөлүшүңүз</p>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-white font-semibold mb-2">Атыңыз *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Сиздин атыңыз"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-white font-semibold mb-2">Баа *</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= formData.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-white/30'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review */}
                <div>
                  <label className="block text-white font-semibold mb-2">Пикириңиз *</label>
                  <textarea
                    required
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Биз менен тажрыйбаңызды жазыңыз..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Жөнөтүү</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
