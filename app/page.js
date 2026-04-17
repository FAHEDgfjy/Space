'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Plus, Minus, X, Lock, ShieldCheck, 
  MessageCircle, Mail, Phone, Send, Play, Image as ImageIcon 
} from 'lucide-react';

// --- 1. قائمة الدول الشاملة ---
const COUNTRIES = [
  { code: 'JO', name: 'الأردن', lang: 'ar', currency: 'JOD', rate: 1, flag: '🇯🇴' },
  { code: 'SA', name: 'السعودية', lang: 'ar', currency: 'SAR', rate: 5.29, flag: '🇸🇦' },
  { code: 'TR', name: 'Türkiye', lang: 'tr', currency: 'TRY', rate: 45.6, flag: '🇹🇷' },
  { code: 'RU', name: 'Россия', lang: 'ru', currency: 'RUB', rate: 130, flag: '🇷🇺' },
  { code: 'US', name: 'USA', lang: 'en', currency: 'USD', rate: 1.41, flag: '🇺🇸' },
];

// --- 2. الخدمات الـ 11 الرسمية لـ Kings Media ---
const KINGS_SERVICES = [
  { id: 1, price: 50, titles: { ar: "فيديوهات AI (25 ثانية)", en: "AI Videos", tr: "AI Videoları", ru: "ИИ Видео" } },
  { id: 2, price: 25, titles: { ar: "بوستات صور AI", en: "AI Images", tr: "AI Görsel", ru: "ИИ Посты" } },
  { id: 3, price: 100, titles: { ar: "تصميم موقع ويب", en: "Web Design", tr: "Web Tasarım", ru: "Веб-дизайн" } },
  { id: 4, price: 60, titles: { ar: "خطة تسويقية رقمية", en: "Marketing Plan", tr: "Pazarlama", ru: "Маркетинг" } },
  { id: 5, price: 60, titles: { ar: "خطة إدارية", en: "Management Plan", tr: "Yönetim", ru: "Управление" } },
  { id: 6, price: 50, titles: { ar: "تصميم شعار (Logo)", en: "Logo Design", tr: "Logo", ru: "Логотип" } },
  { id: 7, price: 50, titles: { ar: "تصاميم 3D", en: "3D Designs", tr: "3D Tasarım", ru: "3D Дизайн" } },
  { id: 8, price: 25, titles: { ar: "مونتاج فيديو إعلاني", en: "Video Editing", tr: "Kurgu", ru: "Монтаж" } },
  { id: 9, price: 200, titles: { ar: "خدمة عملاء 24/7", en: "24/7 Support", tr: "Destek", ru: "Поддержка" } },
  { id: 10, price: 350, titles: { ar: "بكج إدارة شاملة", en: "Full Package", tr: "Tam Paket", ru: "Полный пакет" } },
  { id: 11, price: 50, titles: { ar: "إدارة تمويل", en: "Funding", tr: "Finans", ru: "Финансы" } },
];

export default function KingsMediaUniversalApp() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [view, setView] = useState('landing'); // landing, portfolio, checkout, admin
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [clientData, setClientData] = useState({ name: '', phone: '', email: '' });
  const [isOrdered, setIsOrdered] = useState(false);

  // حسابات الأسعار
  const convertPrice = (jod) => (jod * (selectedCountry?.rate || 1)).toLocaleString(undefined, { minimumFractionDigits: selectedCountry?.code === 'JO' ? 0 : 2 });
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalAfterDiscount = subtotal * (1 - discount);
  const deposit = totalAfterDiscount * 0.5;

  const updateCart = (service, delta) => {
    const existing = cart.find(i => i.id === service.id);
    if (existing) {
      const newQty = existing.qty + delta;
      if (newQty <= 0) setCart(cart.filter(i => i.id !== service.id));
      else setCart(cart.map(i => i.id === service.id ? { ...i, qty: newQty } : i));
    } else if (delta > 0) setCart([...cart, { ...service, qty: 1 }]);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log("إرسال العقد إلى: info@kingsmedia.space, Kingsmedia056@gmail.com, Fahedsenov@gmail.com");
    setIsOrdered(true);
    setTimeout(() => { setCart([]); setIsOrdered(false); setView('landing'); }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white" dir={selectedCountry?.lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* شاشة اختيار الدولة */}
      <AnimatePresence>
        {!selectedCountry && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center p-6">
            <Globe className="w-16 h-16 text-yellow-500 mb-8 animate-pulse" />
            <h1 className="text-4xl font-black mb-10 gold-gradient">KINGS MEDIA</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
              {COUNTRIES.map(c => (
                <button key={c.code} onClick={() => setSelectedCountry(c)} className="p-6 bg-zinc-950 border border-zinc-900 rounded-[30px] hover:border-yellow-600 transition">
                  <span className="text-4xl block mb-2">{c.flag}</span>
                  <span className="font-bold text-xs">{c.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedCountry && (
        <>
          {/* Header & Nav */}
          <header className="p-8 flex flex-col items-center">
            <h1 className="text-5xl font-black gold-gradient mb-6 tracking-tighter italic">KINGS MEDIA</h1>
            <div className="flex gap-4 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
              <button onClick={() => setView('landing')} className={`px-6 py-2 rounded-xl transition font-bold text-xs ${view === 'landing' ? 'bg-yellow-600 text-black' : ''}`}>الخدمات</button>
              <button onClick={() => setView('portfolio')} className={`px-6 py-2 rounded-xl transition font-bold text-xs ${view === 'portfolio' ? 'bg-yellow-600 text-black' : ''}`}>معرض الأعمال</button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {/* صفحة الخدمات */}
            {view === 'landing' && (
              <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pb-40">
                {KINGS_SERVICES.map(s => {
                  const inCart = cart.find(i => i.id === s.id);
                  return (
                    <div key={s.id} className="bg-zinc-950 p-6 rounded-[35px] border border-zinc-900 flex flex-col justify-between hover:border-yellow-600 transition">
                      <h3 className="text-lg font-bold mb-6">{s.titles[selectedCountry.lang] || s.titles['en']}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-black">{convertPrice(s.price)} <small className="opacity-50 text-[10px]">{selectedCountry.currency}</small></span>
                        <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-full border border-zinc-800">
                          <button onClick={() => updateCart(s, -1)} className="p-1 hover:text-red-500"><Minus size={14}/></button>
                          <span className="font-bold w-4 text-center text-sm">{inCart?.qty || 0}</span>
                          <button onClick={() => updateCart(s, 1)} className="p-1 hover:text-yellow-500"><Plus size={14}/></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* صفحة معرض الأعمال */}
            {view === 'portfolio' && (
              <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 pb-40">
                <div className="bg-zinc-900 h-64 rounded-[40px] flex items-center justify-center border border-dashed border-zinc-700">
                  <Play className="text-zinc-700 w-12 h-12" />
                  <p className="absolute mt-20 text-xs text-zinc-500 font-bold uppercase">قريباً: عرض فيديوهات البراند</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* سلة التسوق العائمة */}
          {cart.length > 0 && view === 'landing' && (
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 bg-yellow-600 text-black p-6 z-[200] rounded-t-[40px] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black opacity-60 uppercase">Deposit 50%</p>
                <p className="text-2xl font-black">{convertPrice(deposit)} {selectedCountry.currency}</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input type="text" placeholder="كود الخصم" value={coupon} onChange={(e)=>setCoupon(e.target.value.toUpperCase())} className="bg-black/10 border border-black/20 p-3 rounded-2xl outline-none placeholder:text-black/50 text-sm w-full md:w-28" />
                <button onClick={()=>{if(coupon==='FF142') setDiscount(0.2)}} className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold">تطبيق</button>
              </div>
              <button onClick={() => setView('checkout')} className="bg-black text-white px-10 py-4 rounded-full font-black text-sm shadow-xl">توقيع العقد</button>
            </motion.div>
          )}

          {/* صفحة العقد والبيانات */}
          <AnimatePresence>
            {view === 'checkout' && !isOrdered && (
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-[300] bg-black p-6 overflow-y-auto">
                <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-900 rounded-[50px] p-8 md:p-12 my-10 relative">
                  <button onClick={() => setView('landing')} className="absolute top-8 left-8 text-zinc-500"><X/></button>
                  <h2 className="text-3xl font-black text-yellow-500 text-center mb-10 italic">CONTRACT & ORDER</h2>
                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    <input required type="text" placeholder="الاسم الكامل" onChange={(e)=>setClientData({...clientData, name:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-yellow-600" />
                    <input required type="tel" placeholder="رقم الواتساب" onChange={(e)=>setClientData({...clientData, phone:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-yellow-600" />
                    <input required type="email" placeholder="البريد الإلكتروني" onChange={(e)=>setClientData({...clientData, email:e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:border-yellow-600" />
                    <button type="submit" className="w-full bg-yellow-600 text-black py-5 rounded-3xl font-black text-xl">إرسال العقد للشركة</button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* شاشة النجاح */}
          <AnimatePresence>
            {isOrdered && (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center p-6 text-center backdrop-blur-3xl">
                <ShieldCheck size={80} className="text-green-500 mb-6 animate-bounce" />
                <h2 className="text-4xl font-black gold-gradient mb-2 uppercase">Order Sent!</h2>
                <p className="text-zinc-400">تم إرسال العقد إلى Kings Media وإلى بريدك الإلكتروني بنجاح.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* فوتر وروابط تواصل */}
          <footer className="p-12 border-t border-zinc-900 text-center space-y-6 bg-zinc-950">
             <div className="flex justify-center gap-8">
               <a href="https://wa.me/962778498350" className="text-zinc-500 hover:text-green-500 transition"><Phone size={24}/></a>
               <a href="mailto:info@kingsmedia.space" className="text-zinc-500 hover:text-yellow-500 transition"><Mail size={24}/></a>
             </div>
             <p className="text-[8px] text-zinc-800 tracking-[1em] uppercase">Kings Media Suite V3.5</p>
             <button onClick={()=>{if(prompt('Admin?')==='FF142') alert('Dev Mode Active')}} className="opacity-0 cursor-default"><Lock size={10}/></button>
          </footer>

          {/* دردشة Kings Chat */}
          <div className="fixed bottom-6 left-6 z-[250]">
            <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition">
              <MessageCircle size={28} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
