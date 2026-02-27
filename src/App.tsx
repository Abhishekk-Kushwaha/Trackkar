import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, X } from 'lucide-react';
import InteractiveDemo from './components/InteractiveDemo';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { question: 'Is this a one-time payment?', answer: 'Yes. You pay once and own it forever. No monthly fees.' },
    { question: 'Does this work on mobile?', answer: 'Yes, it works perfectly with the free Google Sheets app on iOS and Android.' },
    { question: 'Can I customize the habits?', answer: 'Absolutely. The sheet is fully editable. You can add up to 20 habits and change them anytime.' },
  ];

  return (
    <div className="antialiased gradient-bg min-h-screen">
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass-card border-b border-gray-100">
        <div className="text-xl font-bold tracking-tighter text-brand-purple">TRACKKAR.</div>
        <a href="#cta-section" className="bg-brand-purple text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
          Get Started
        </a>
      </nav>

      <header className="pt-32 pb-20 px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-10 inline-flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Works with MS Excel & Google Sheets
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-6xl md:text-9xl text-center leading-[0.85] mb-8 tracking-tight"
        >
          Turn your life <br /> <span className="italic text-purple-800">into a game.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md text-center text-gray-500 text-lg md:text-xl mb-12 leading-relaxed"
        >
          A simple habit tracker that helps you stay consistent and see real progress. No fluff, just results.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto mb-16 px-4"
        >
          <div className="bg-white p-2 md:p-4 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80&w=1200" alt="Dashboard Preview" className="rounded-[1.8rem] w-full" referrerPolicy="no-referrer" />
          </div>
          
          <div className="absolute -bottom-8 -right-4 md:right-0 bg-blue-300 text-blue-900 w-28 h-28 rounded-full flex items-center justify-center text-center p-4 shadow-2xl transform rotate-12 border-4 border-white font-black text-[10px] uppercase leading-tight hover:scale-110 transition-transform">
            RE-USE <br /> OVER & <br /> OVER
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="grid grid-cols-2 md:flex gap-6 md:gap-12 mb-12 text-[10px] font-bold uppercase tracking-widest text-gray-700">
            <div className="flex items-center gap-2"><span className="text-yellow-500 text-lg">✔</span> One-time purchase</div>
            <div className="flex items-center gap-2"><span className="text-yellow-500 text-lg">✔</span> No subscriptions</div>
            <div className="flex items-center gap-2"><span className="text-yellow-500 text-lg">✔</span> Editable anytime</div>
            <div className="flex items-center gap-2"><span className="text-yellow-500 text-lg">✔</span> Lifetime access</div>
          </div>

          <a href="https://superprofile.bio/vp/Habittrackker" target="_blank" rel="noopener noreferrer" className="btn-purple px-10 md:px-16 py-6 rounded-full text-xl font-bold text-center w-full md:w-auto">
            Download Habit Tracker — ₹36
          </a>
          <p className="mt-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">Instant download • One-time payment</p>
        </motion.div>
      </header>

      <section className="py-24 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl mb-4">Try it yourself</h2>
            <p className="text-gray-500">Experience the dopamine hit of a completed streak. Click the checkboxes below!</p>
          </div>

          <InteractiveDemo />
        </div>
      </section>

      <section className="py-32 px-6 max-w-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl text-center mb-16 leading-tight"
        >
          Why staying consistent <br /> feels impossible?
        </motion.h2>
        
        <div className="space-y-4">
          {[
            "You start strong, then miss one day",
            "Tracking stops, motivation fades",
            "Progress disappears, habits feel pointless"
          ].map((text, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-3xl flex items-center gap-5"
            >
              <span className="bg-red-50 text-red-400 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold shrink-0">
                <X size={16} />
              </span>
              <p className="font-semibold text-gray-600">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center italic text-gray-500 border-l-4 border-purple-100 pl-8 py-4 mx-auto max-w-md"
        >
          "You do not rise to the level of your goals. You fall to the level of your systems."
          <br /> <span className="text-[10px] font-bold not-italic mt-4 block uppercase tracking-[0.2em] text-gray-400">— James Clear, Atomic Habits</span>
        </motion.div>
      </section>

      <section className="py-24 overflow-hidden bg-purple-900 text-white">
        <h2 className="font-serif text-4xl text-center mb-16">What our users say</h2>
        <div className="marquee-track">
          {[
            { quote: "As a college student, my routine was very messy. After using this tracker, I finally have a clear view of my study hours.", author: "Prem Patel" },
            { quote: "I love that it's a one-time payment. Most apps charge a monthly fee for simple tracking.", author: "Ananya Iyer" },
            { quote: "The automated charts are the best part. Seeing my win rate go up every week is the dopamine hit I need.", author: "Rahul Malhotra" },
            { quote: "The system actually works. No friction, no complex apps. Just clear progress.", author: "Vikram S." },
            { quote: "As a college student, my routine was very messy. After using this tracker, I finally have a clear view of my study hours.", author: "Prem Patel" },
            { quote: "I love that it's a one-time payment. Most apps charge a monthly fee for simple tracking.", author: "Ananya Iyer" },
          ].map((testimonial, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 mx-4 w-[350px] shrink-0">
              <p className="text-purple-100 text-sm leading-relaxed italic mb-6">"{testimonial.quote}"</p>
              <p className="font-bold text-white text-xs">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 max-w-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl text-center mb-16"
        >
          Frequently Asked <br /> Questions
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border-b border-gray-100 cursor-pointer py-6" 
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-700">{faq.question}</h4>
                <span className={`text-xl transition-transform duration-300 ${activeFaq === i ? 'rotate-45' : ''}`}>
                  <Plus size={20} />
                </span>
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-gray-500 text-sm pt-4">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <section id="cta-section" className="py-32 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white p-12 md:p-24 rounded-[4rem] shadow-2xl border border-gray-50"
        >
          <h2 className="font-serif text-5xl md:text-7xl mb-12 leading-none">Start your journey <br /> <span className="italic text-gray-300">today.</span></h2>
          <a href="https://superprofile.bio/vp/Habittrackker" target="_blank" rel="noopener noreferrer" className="btn-purple px-14 py-7 rounded-full text-2xl font-bold inline-block">
            Get Access for ₹36
          </a>
          <p className="mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Instant Google Drive Delivery</p>
        </motion.div>
      </section>

      <footer className="py-12 text-center text-gray-400 text-[9px] font-bold uppercase tracking-[0.4em]">
        <div className="flex justify-center gap-8 mb-8 text-gray-500 font-bold">
          <a href="#" className="hover:text-purple-900">Contact Us</a>
          <a href="#" className="hover:text-purple-900">Terms and Conditions</a>
        </div>
        © 2026 ABHISHEK THINKS • ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
