'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icon from 'lucide-react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

// --- إعدادات FIREBASE الأصلية الخاصة بك ---
const firebaseConfig = {
  apiKey: "AIzaSyA8GqDryL5vIlm7jSgKS98ZFCHMRbLbBoc",
  authDomain: "gen-lang-client-0508004409.firebaseapp.com",
  projectId: "gen-lang-client-0508004409",
  storageBucket: "gen-lang-client-0508004409.firebasestorage.app",
  messagingSenderId: "316500976991",
  appId: "1:316500976991:web:5ea2dadbb6cd2e4d38c2ea",
  firestoreDatabaseId: "ai-studio-336efb1b-4aa3-41cf-8391-1e8d2acfa95c"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// --- قاعدة البيانات المطورة ---
const REGIONS = [
  { id: 'JO', name: 'الأردن', cur: 'JOD', rate: 1.0, flag: '🇯🇴' },
  { id: 'SA', name: 'السعودية', cur: 'SAR', rate: 5.29, flag: '🇸🇦' },
  { id: 'AE', name: 'الإمارات', cur: 'AED', rate: 5.18, flag: '🇦🇪' },
  { id: 'KW', name: 'الكويت', cur: 'KWD', rate: 0.43, flag: '🇰🇼' },
  { id: 'QA', name: 'قطر', cur: 'QAR', rate: 5.14, flag: '🇶🇦' },
  { id: 'US', name: 'Global', cur: 'USD', rate: 1.41, flag: '🌐' },
];

const SERVICES = [
  { id: 's1', title: "إدارة التواصل الاجتماعي", price: 150, icon: "Share2", desc: "سيادة كاملة على منصاتك" },
  { id: 's2', title: "المونتاج السينمائي", price: 100, icon: "Video", desc: "تعديل فيديو بأسلوب B-Roll فاخر" },
  { id: 's3', title: "الهوية البصرية", price: 300, icon: "PenTool", desc: "تصميم براند ملكي متكامل" },
  { id: 's4', title: "إنتاج محتوى AI", price: 200, icon: "Cpu", desc: "فيديوهات ذكاء اصطناعي ثورية" },
  { id: 's5', title: "تطوير المواقع", price: 500, icon: "Code", desc: "مواقع فائقة السرعة والأداء" },
  { id: 's6', title: "إعلانات ممولة", price: 250, icon: "Zap", desc: "حملات جوجل وميتا الاحترافية" },
];

export default function KingsMediaGlobal() {
  const [region, setRegion] = useState(REGIONS[0]);
  const [cart, setCart] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState<any[]>([]);

  const total = useMemo(() => {
    const base = SERVICES.filter(s => cart.includes(s.id)).reduce((a, b) => a + b.price, 0);
    return (base * region.rate).toFixed(2);
  }, [cart, region]);

  // جلب العقود من Firebase (لوحة التحكم)
  useEffect(() => {
    if (activeTab === 'admin') {
      const q = query(collection(db, 'contracts'), orderBy('createdAt', 'desc'), limit(5));
      getDocs(q).then(snap => setContracts(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    }
  }, [activeTab]);

  const handleOrder = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    try {
      await addDoc(collection(db, 'contracts'), {
        name: fd.get('name'),
        email: fd.get('email'),
        services: SERVICES.filter(s => cart.includes(s.id)).map(s => s.title),
        total,
        currency: region.cur,
        createdAt: new Date()
      });
      alert("تم توثيق السيادة الرقمية بنجاح!");
      setCart([]);
      setActiveTab('home');
    } catch (err) { alert("Error connecting to Firebase"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pb-28">
      
      {/* Header الملكي */}
      <header className="fixed top-0 w-full z-50 glass-card h-20 flex justify-between items-center px-8">
        <h1 className="text-xl font-black gold-gradient-text tracking-tighter">KINGS MEDIA</h1>
        <select 
          onChange={(e) => setRegion(REGIONS.find(r => r.id === e.target.value)!)}
          className="bg-zinc-900/50 border border-gold-primary/20 rounded-full px-4 py-1 text-xs text-gold-secondary"
        >
          {REGIONS.map(r => <option key={r.id} value={r.id}>{r.flag} {r.cur}</option>)}
        </select>
      </header>

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
              <section className="py-12 text-center space-y-6">
                <h2 className="text-5xl md:text-7xl font-black leading-none">
                  نصنع <span className="gold-gradient-text">العظمة</span> الرقمية
                </h2>
                <p className="text-zinc-500 text-lg max-w-xl mx-auto">أول منصة إدارة محتوى ذكي في الشرق الأوسط تعتمد مبدأ السيادة الرقمية.</p>
                <div className="flex gap-4 justify-center pt-6">
                  <button onClick={() => setActiveTab('services')} className="bg-gold-secondary text-black px-10 py-4 rounded-2xl font-black shadow-lg">استعرض الخدمات</button>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map(s => (
                <div key={s.id} className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between">
                  <div>
                    <div className="text-gold-secondary mb-6">{React.createElement((Icon as any)[s.icon], { size: 32 })}</div>
                    <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                    <p className="text-zinc-500 text-sm mb-8">{s.desc}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black">{(s.price * region.rate).toFixed(0)} <span className="text-xs text-gold-secondary">{region.cur}</span></span>
                    <button 
                      onClick={() => setCart(p => p.includes(s.id) ? p.filter(id => id!==s.id) : [...p, s.id])}
                      className={`p-4 rounded-2xl transition-all ${cart.includes(s.id) ? 'bg-gold-secondary text-black shadow-xl' : 'bg-white/5 text-gold-secondary'}`}
                    >
                      {cart.includes(s.id) ? <Icon.CheckCircle /> : <Icon.Plus />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-black gold-gradient-text">Live Sovereignty Monitor</h2>
              <div className="space-y-4">
                {contracts.map(c => (
                  <div key={c.id} className="glass-card p-6 rounded-3xl flex justify-between items-center">
                    <div>
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs text-zinc-500">{c.services?.join(', ')}</p>
                    </div>
                    <p className="font-black text-gold-secondary">{c.total} {c.currency}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Checkout (للهاتف) */}
      <AnimatePresence>
        {cart.length > 0 && activeTab !== 'admin' && (
          <motion.div initial={{y:100}} animate={{y:0}} exit={{y:100}} className="fixed bottom-24 left-6 right-6 glass-card p-6 rounded-[2.5rem] flex justify-between items-center z-50 shadow-2xl border-gold-secondary/30">
            <div>
              <p className="text-[10px] uppercase font-black text-zinc-500">إجمالي التعاقد</p>
              <p className="text-3xl font-black text-gold-secondary">{total} <span className="text-xs">{region.cur}</span></p>
            </div>
            <button 
              onClick={() => setActiveTab('checkout')}
              className="bg-gold-secondary text-black px-8 py-4 rounded-2xl font-black shadow-lg"
            >
              توقيع العقد
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نموذج التعاقد (Checkout View) */}
      {activeTab === 'checkout' && (
        <div className="fixed inset-0 z-[100] bg-black p-8 flex flex-col justify-center">
           <button onClick={() => setActiveTab('services')} className="absolute top-10 right-8 text-zinc-500"><Icon.X size={32}/></button>
           <h2 className="text-4xl font-black mb-10 gold-gradient-text text-center">توثيق العقد الرقمي</h2>
           <form onSubmit={handleOrder} className="space-y-4 max-w-md mx-auto w-full">
              <input name="name" required placeholder="الاسم الكامل" className="w-full bg-zinc-900/50 border border-white/10 p-5 rounded-2xl outline-none focus:border-gold-secondary" />
              <input name="email" required type="email" placeholder="البريد الإلكتروني" className="w-full bg-zinc-900/50 border border-white/10 p-5 rounded-2xl outline-none focus:border-gold-secondary" />
              <div className="p-4 bg-gold-secondary/10 rounded-2xl border border-gold-secondary/20 text-xs text-zinc-400 text-center italic">
                بمجرد الضغط على زر التوقيع، يتم توثيق العقد برمجياً وحفظه في سحابة فايربيس.
              </div>
              <button disabled={loading} className="w-full bg-gold-secondary text-black py-5 rounded-2xl font-black text-xl shadow-2xl">
                {loading ? 'جاري التوثيق...' : 'توقيع العقد الآن'}
              </button>
           </form>
        </div>
      )}

      {/* Bottom Navbar (تصميم تطبيقات عالمية) */}
      <nav className="fixed bottom-0 w-full h-24 glass-card border-t border-white/5 flex justify-around items-center px-4 z-[60]">
        {[
          { id: 'home', icon: Icon.Home, label: 'الرئيسية' },
          { id: 'services', icon: Lucide.LayoutGrid, label: 'الخدمات' },
          { id: 'admin', icon: Icon.ShieldCheck, label: 'المراقب' }
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex flex-col items-center gap-1 ${activeTab === t.id ? 'text-gold-secondary' : 'text-zinc-500'}`}>
            <t.icon size={22} strokeWidth={activeTab === t.id ? 3 : 2} />
            <span className="text-[10px] font-bold uppercase">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// أيقونة إضافية مفقودة في Lucide
const Lucide = {
  LayoutGrid: (props: any) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
  )
}
