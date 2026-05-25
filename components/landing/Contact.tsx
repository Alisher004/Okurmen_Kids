'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, CheckCircle, Send, User, Calendar, BookOpen, MessageSquare } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { getFirestoreErrorMessage } from '@/lib/firestoreAdmin';
import { isFirebaseConfigured } from '@/lib/firebase';
import SectionHeading from './SectionHeading';

const contactItems = [
  { icon: Phone, title: 'Телефон', value: '+996 500 677 798', href: 'tel:+996500677798' },
  { icon: Mail, title: 'Email', value: 'okurmen2022@gmail.com', href: 'mailto:okurmen2022@gmail.com' },
  { icon: MapPin, title: 'Дарек', value: 'Бишкек шаары, Табышалиева 29', href: null },
] as const;

export default function Contact() {
  const { addLead, courses: courseList } = useData();
  const [formData, setFormData] = useState({ name: '', phone: '', age: '', course: '', comment: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const courses =
    courseList.length > 0
      ? courseList.map((c) => c.title)
      : ['Frontend Development', 'Scratch Programming', 'Python Basics', 'Web Design'];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Аты-жөнүңүздү жазыңыз';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон номериңизди жазыңыз';
    if (!formData.age.trim()) newErrors.age = 'Жашты жазыңыз';
    if (!formData.course) newErrors.course = 'Курсту тандаңыз';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!isFirebaseConfigured()) {
      setSubmitError('Firebase туура орнотулган эмес.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await addLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        age: formData.age.trim(),
        course: formData.course.trim(),
        comment: formData.comment.trim() || undefined,
      });
      setShowSuccess(true);
      setFormData({ name: '', phone: '', age: '', course: '', comment: '' });
      setTimeout(() => setShowSuccess(false), 6000);
    } catch (err) {
      setSubmitError(getFirestoreErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `input-brand ${errors[field] ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`;

  return (
    <section id="contact" className="section-layer">
      <div className="site-container">
        <SectionHeading
          badgeIcon={Phone}
          badge="Байланыш"
          title="Жазылуу"
          subtitle="Форманы толтуруңуз — менеджер сиз менен байланышат"
        />

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Биз менен байланышыңыз</h3>
              <div className="space-y-5">
                {contactItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-400" />
                    <div>
                      <h4 className="mb-0.5 font-semibold text-slate-200">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-slate-400 transition hover:text-brand-gold-400">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-400">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/[0.08]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d805.5089872322158!2d74.58629130583195!3d42.87159226006853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1775462673042!5m2!1sru!2skg"
                width="100%"
                height="280"
                className="block w-full"
                style={{ border: 0 }}
                loading="lazy"
                title="Okurmen Kids дареги"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-5 sm:p-8">
              <h3 className="mb-6 text-lg font-bold text-white">Жазылуу формасы</h3>

              {showSuccess && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <CheckCircle className="h-6 w-6 shrink-0 text-green-600" />
                  <p className="font-semibold text-green-800">Ийгиликтүү! Менеджер жакынкы убакта байланышат.</p>
                </div>
              )}
              {submitError && (
                <div className="mb-6 whitespace-pre-line rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <User className="h-4 w-4" /> Аты-жөнү *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass('name')}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Phone className="h-4 w-4" /> Телефон *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass('phone')}
                    required
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Calendar className="h-4 w-4" /> Жашы *
                  </label>
                  <input
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={inputClass('age')}
                    required
                  />
                  {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <BookOpen className="h-4 w-4" /> Курс *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className={`${inputClass('course')} cursor-pointer`}
                    required
                  >
                    <option value="">Тандаңыз</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.course && <p className="mt-1 text-sm text-red-500">{errors.course}</p>}
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <MessageSquare className="h-4 w-4" /> Комментарий
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="input-brand resize-none"
                    rows={3}
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4 text-lg">
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Жөнөтүлүүдө...' : 'Жазылуу'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
