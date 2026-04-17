'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import './App.css'; // تأكد أن ملف التصميم بنفس المجلد

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

const DynamicIcon = ({ name, size = 24, className = "" }) => {
  const IconComponent = LucideIcons[name];
  return IconComponent ? <IconComponent size={size} className={className} /> : null;
};

function KingsMediaGlobal() {
  const [region, setRegion] = useState(REGIONS[0]);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);

  const total = useMemo(() => {
    const base = SERVICES.filter(s => cart.includes(s.id)).reduce((a, b) => a + b.price, 0);
    return (base * region.rate).toFixed(2);
  }, [cart, region]);

  useEffect(() => {
    if (activeTab === 'admin') {
      const q = query(collection(db, 'contracts'), orderBy('createdAt', 'desc'), limit(5));
      getDocs(q).then(snap => setContracts(snap.docs.map(d => ({id: d.id, ...d.data()}))));
    }
  }, [activeTab]);

  const handleOrder = async (e) => {
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
    } catch (err) { 
      alert("Error connecting to Firebase"); 
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pb-28 bg-black text-white" dir="rtl">
      <header className="fixed top-0 w-full z-50 glass-card h-20 flex justify-between items-center px-8">
        <h1 className="text-xl font-black gold-gradient-text">KINGS MEDIA</h1>
        <select 
          onChange={(e) => setRegion(REGIONS.find(r => r.id === e.target.value))}
          className="bg-zinc-900 border border-yellow-600/20 rounded-full px-4 py-1 text-xs text-yellow-500"
        >
          {REGIONS.map(r => <option key={r.id} value={r.id}>{r.flag} {r.cur}</option>)}
        </select>
      </header>

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="py-12 text-center space-y-6">
              <h2 className="text-5xl md:text-7xl font-black leading-none">نصنع <span className="gold-gradient-text">العظمة</span> الرقمية</h2>
              <p className="text-zinc-500 text-lg">أول منصة إدارة محتوى ذكي في الشرق الأوسط.</p>
              <button onClick={() => setActiveTab('services')} className="bg-yellow-500 text-black px-10 py-4 rounded-2xl font-black">استعرض الخدمات</button>
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div key="services" initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map(s => (
                <div key={s.id} className="glass-card p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="text-yellow-500 mb-6"><DynamicIcon name={s.icon} size={32} /></div>
                    <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                    <p className="text-zinc-500 text-sm mb-8">{s.desc}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black">{(s.price * region.rate).toFixed(0)} <span className="text-xs text-yellow-500">{region.cur}</span></span>
                    <button 
                      onClick={() => setCart(p => p.includes(s.id) ? p.filter(id => id!==s.id) : [...p, s.id])}
                      className={`p-4 rounded-2xl ${cart.includes(s.id) ? 'bg-yellow-500 text-black' : 'bg-white/5 text-yellow-500'}`}
                    >
                      {cart.includes(s.id) ? <LucideIcons.CheckCircle /> : <LucideIcons.Plus />}
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 w-full h-24 glass-card border-t border-white/5 flex justify-around items-center z-[60]">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-yellow-500' : 'text-zinc-500'}`}>
          <LucideIcons.Home size={22} /><span className="text-[10px] font-bold">الرئيسية</span>
        </button>
        <button onClick={() => setActiveTab('services')} className={`flex flex-col items-center ${activeTab === 'services' ? 'text-yellow-500' : 'text-zinc-500'}`}>
          <LucideIcons.LayoutGrid size={22} /><span className="text-[10px] font-bold">الخدمات</span>
        </button>
        <button onClick={() => setActiveTab('admin')} className={`flex flex-col items-center ${activeTab === 'admin' ? 'text-yellow-500' : 'text-zinc-500'}`}>
          <LucideIcons.ShieldCheck size={22} /><span className="text-[10px] font-bold">المراقب</span>
        </button>
      </nav>
    </div>
  );
}

// السطر المسؤول عن تشغيل التطبيق في المتصفح
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<KingsMediaGlobal />);
