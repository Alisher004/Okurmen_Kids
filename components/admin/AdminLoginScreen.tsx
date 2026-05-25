'use client';

import { motion } from 'framer-motion';

type AdminLoginScreenProps = {
  email: string;
  password: string;
  error: string;
  isSigningIn: boolean;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onLogin: (e: React.FormEvent) => void;
  title?: string;
  subtitle?: string;
};

export default function AdminLoginScreen({
  email,
  password,
  error,
  isSigningIn,
  onEmailChange,
  onPasswordChange,
  onLogin,
  title = 'Admin Panel',
  subtitle = 'Окурмен Кидс башкаруу панели',
}: AdminLoginScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#171827] p-4 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 shadow-lg shadow-sky-500/25">
            <span className="text-2xl font-bold text-white">OK</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold">{title}</h1>
          <p className="text-slate-400">{subtitle}</p>
          <p className="mt-3 text-xs text-slate-500">
            Firebase Authentication каттоосу менен кириңиз. Админ уруксаты Firestore admins коллекциясында
            орнотулушу керек.
          </p>
        </div>

        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              placeholder="Email жазыңыз"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              placeholder="Паролду жазыңыз"
              required
            />
          </div>
          {error && (
            <p className="whitespace-pre-line rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </p>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSigningIn}
            className="w-full rounded-xl bg-sky-500 py-3 font-semibold text-white shadow-lg shadow-sky-500/25 hover:bg-sky-400 disabled:opacity-60"
          >
            {isSigningIn ? 'Кирүүдө...' : 'Кирүү'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
