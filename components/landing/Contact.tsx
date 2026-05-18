'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MapPin,
  Mail,
  CheckCircle,
  MessageCircle,
  Send,
  User,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { buildLeadWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp';
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
  const [formData, setFormData] = useState({ name: '', phone: '', age: '', course: '' });
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
      setSubmitError('Firebase туура орнотулган эмес. .env.local файлын текшериңиз.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      age: formData.age.trim(),
      course: formData.course.trim(),
    };
    try {
      await addLead(payload);
      setShowSuccess(true);
      setFormData({ name: '', phone: '', age: '', course: '' });
      setTimeout(() => setShowSuccess(false), 6000);
    } catch (err) {
      setSubmitError(getFirestoreErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    openWhatsApp(
      buildLeadWhatsAppMessage({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        age: formData.age.trim(),
        course: formData.course.trim(),
      })
    );
  };

  const inputClass = (field: string) =>
    `input-brand ${errors[field] ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`;

  return (
    <section id="contact" className="section-alt relative py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          badgeIcon={Phone}
          badge="Байланыш"
          title="Бизге кайрылыңыз"
          subtitle="Катталуу формасын толтуруңуз — маалымат админ панелдин «Катталуулар» бөлүмүнө түшөт"
        />

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="brand-card-glass p-8 shadow-brand">
              <h3 className="mb-6 text-2xl font-bold text-brand-navy-700">Биз менен байланышыңыз</h3>
              <div className="space-y-5">
                {contactItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy-600 to-brand-navy-700 shadow-md">
                      <item.icon className="h-5 w-5 text-brand-gold-400" />
                    </div>
                    <div>
                      <h4 className="mb-0.5 font-semibold text-brand-navy-700">{item.title}</h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-brand-navy-600 transition-colors hover:text-brand-gold-600"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-brand-navy-600">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="brand-card-luxury overflow-hidden rounded-2xl">
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

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="brand-card-glass relative overflow-hidden border-brand-navy-100 p-8 shadow-brand">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-navy-600 via-brand-gold-500 to-brand-gold-400"
                aria-hidden
              />
              <div className="mb-6 flex items-center gap-3 pt-1">
                <div className="h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-brand-navy-800 to-brand-gold-500" />
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy-700">Катталуу формасы</h3>
                  <p className="mt-1 text-sm text-brand-navy-500">Бардык талаалар милдеттүү</p>
                </div>
              </div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4"
                >
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
                  <p className="font-semibold leading-snug text-green-800">
                    Ийгиликтүү! Админ панелдин «Катталуулар» бөлүмүнөн көрө аласыз.
                  </p>
                </motion.div>
              )}

              {submitError && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800 whitespace-pre-line">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-navy-800">
                    <User className="h-4 w-4 text-brand-navy-500" />
                    Аты-жөнү *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass('name')}
                    placeholder="Баланын аты-жөнү"
                    autoComplete="name"
                  />
                  {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-navy-800">
                    <Phone className="h-4 w-4 text-brand-navy-500" />
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass('phone')}
                    placeholder="+996 555 123 456"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-navy-800">
                    <Calendar className="h-4 w-4 text-brand-navy-500" />
                    Жашы *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={inputClass('age')}
                    placeholder="Мисалы: 12"
                  />
                  {errors.age && <p className="mt-1.5 text-sm text-red-500">{errors.age}</p>}
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-navy-800">
                    <BookOpen className="h-4 w-4 text-brand-navy-500" />
                    Курс *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className={`${inputClass('course')} cursor-pointer`}
                  >
                    <option value="">Курсту тандаңыз</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  {errors.course && <p className="mt-1.5 text-sm text-red-500">{errors.course}</p>}
                </div>

                <div className="space-y-3 border-t border-brand-navy-100/80 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-lg disabled:pointer-events-none disabled:opacity-70"
                  >
                    <Send className="h-5 w-5" />
                    {isSubmitting ? 'Сакталууда...' : 'Жөнөтүү'}
                  </button>
                  <button type="button" onClick={handleWhatsApp} className="btn-whatsapp py-3.5">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp аркылуу байланыш
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
