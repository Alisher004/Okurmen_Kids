'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, CheckCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function Contact() {
  const { addLead } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    course: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const courses = [
    'Frontend Development',
    'Scratch Programming',
    'Python Basics',
    'Web Design',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Атыңызды жазыңыз';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон номериңизди жазыңыз';
    if (!formData.age.trim()) newErrors.age = 'Жашты жазыңыз';
    if (!formData.course) newErrors.course = 'Курсту тандаңыз';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    addLead(formData);

    setShowSuccess(true);
    setFormData({ name: '', phone: '', age: '', course: '' });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-4">
            Байланыш
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Бизге кайрылыңыз же катталыңыз
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-strong rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Биз менен байланышыңыз</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-blue-gold rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Телефон</h4>
                    <p className="text-gray-600">+996 500 677 798</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-blue-gold rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">okurmen2022@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-blue-gold rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Дарек</h4>
                    <p className="text-gray-600">Бишкек шаары, Табышалиева 29</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-2xl overflow-hidden shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d805.5089872322158!2d74.58629130583195!3d42.87159226006853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1775462673042!5m2!1sru!2skg" 
                width="100%" 
                height="300"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-strong rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Катталуу формасы</h3>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border-2 border-green-500 rounded-xl p-4 mb-6 flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <p className="text-green-800 font-semibold">
                    Ийгиликтүү жөнөтүлдү! Биз жакында сиз менен байланышабыз.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Аты-жөнү *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white`}
                    placeholder="Баланын аты-жөнү"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white`}
                    placeholder="+996 555 123 456"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Жашы *
                  </label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.age ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white`}
                    placeholder="Мисалы: 12"
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Курс *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.course ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white`}
                  >
                    <option value="">Курсту тандаңыз</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full gradient-blue-gold text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Жөнөтүү
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
