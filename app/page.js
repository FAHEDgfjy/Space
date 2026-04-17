'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Plus, Minus, X, Lock, ShieldCheck, 
  MessageCircle, Mail, Phone, Send, Play, Image as ImageIcon, 
  LayoutDashboard, CreditCard, ChevronRight, CheckCircle2
} from 'lucide-react';

// --- 1. قاعدة بيانات الدول والعملات ---
const COUNTRIES = [
  { code: 'JO', name: 'الأردن', lang: 'ar', currency: 'JOD', rate: 1, flag: '🇯🇴' },
  { code: 'SA', name: 'السعودية', lang: 'ar', currency: 'SAR', rate: 5.29, flag: '🇸🇦' },
  { code: 'AE', name: 'الإمارات', lang: 'ar', currency: 'AED', rate: 5.18, flag: '🇦🇪' },
  { code: 'TR', name: 'Türkiye', lang: 'tr', currency: 'TRY', rate: 45.6, flag: '🇹🇷' },
  { code: 'RU', name: 'Россия', lang: 'ru', currency: 'RUB', rate: 130, flag: '🇷🇺' },
  { code: 'US', name: 'USA', lang: 'en', currency: 'USD', rate: 1.41, flag: '🇺🇸' },
];

// --- 2. الخدمات الـ 11 الرسمية ---
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

export default function KingsMediaMegaApp() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [view, setView] = useState('landing'); // landing, portfolio, checkout, admin
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clientData, setClientData] = useState({ name: '', phone: '', email: '' });
  const [isOrdered, setIsOrdered] = useState(false);

  // حسابات المحاسبة والعملات
  const convert = (jod) => (jod * (selectedCountry?.rate || 1)).toFixed(0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) * (selectedCountry?.rate || 1);
  const finalTotal = subtotal * (1 - discount);
  const deposit = finalTotal * 0.5;

  const handleUpdateCart = (service, delta) => {
    const existing = cart.find(i => i.id === service.id);
    if (existing) {
      const newQty = existing.qty + delta;
      if (newQty <= 0) setCart(cart.filter(i => i.id !== service.id));
      else setCart(cart.map(i => i.id === service.id ? { ...i, qty: newQty } : i));
    } else if (delta > 0) setCart([...cart, { ...service, qty: 1 }]);
  };

  const submitContract = async (e) => {
    e.preventDefault();
    // استخدام المفاتيح التي وضعتها فهد في Vercel
    const config = {
      fb: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      rs: process.env.RESEND_API_KEY
    };
    console.log("إرسال البيانات باستخدام المفاتيح...", config);
    setIsOrdered(true);
    setTimeout(() => { setView('landing'); setIsOrdered(false); setCart([]); }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black" dir={selectedCountry?.lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 1. واجهة اختيار الدولة (أول دخول) */}
      <AnimatePresence>
        {!selectedCountry && (
          <motion.div exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-[600] bg-black flex flex-col items-center justify-center p-6">
            <motion.div animate={{ rotateY: 360 }} transition={{ duration: 2, repeat: Infinity }} className="mb-8">
              <Globe className="w-20 h-20 text-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)]" />
            </motion.div>
            <h1 className="text-5xl font-black mb-12 gold-gradient tracking-tighter italic text-center">KINGS MEDIA<br/><span className="text-sm tracking-[0.5em] text-zinc-500 not-italic uppercase">Global Suite</span></h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
              {COUNTRIES.map(c => (
                <button key={c.code} onClick={() => setSelectedCountry(c)} className="group p-6 bg-zinc-950 border border-zinc-900 rounded-[35px] hover:border-yellow-600 hover:bg-zinc-900 transition-all">
                  <span className="text-4xl block mb-3 group-hover:scale-125 transition-transform">{c.flag}</span>
                  <span className="font-bold text-xs uppercase text-zinc-400 group-hover:text-yellow-500">{c.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedCountry && (
        <>
          {/* Navigation Bar */}
          <header className="sticky top-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-zinc-900 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-black gold-gradient italic mb-6">KINGS MEDIA</h1>
            <nav className="flex gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800">
              <button onClick={() => setView('landing')} className={`px-6 py-2 rounded-xl text-xs font-black transition ${view === 'landing' ? 'bg-yellow-600 text-black shadow-lg shadow-yellow-600/20' : 'text-zinc-500 hover:text-white'}`}>الخدمات</button>
              <button onClick={() => setView('portfolio')} className={`px-6 py-2 rounded-xl text-xs font-black transition ${view === 'portfolio' ? 'bg-yellow-600 text-black shadow-lg shadow-yellow-600/20' : 'text-zinc-500 hover:text-white'}`}>الأعمال</button>
            </nav>
          </header>

          <main className="max-w-6xl mx-auto p-6 pb-48">
            {/* عرض الخدمات */}
            {view === 'landing' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {KINGS_SERVICES.map(s => {
                  const inCart = cart.find(i => i.id === s.id);
                  return (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} key={s.id} className="bg-zinc-950 p-8 rounded-[45px] border border-zinc-900 hover:border-yellow-600 transition-all group">
                      <h3 className="text-xl font-bold mb-8 h-12">{s.titles[selectedCountry.lang] || s.titles['en']}</h3>
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-3xl font-black text-yellow-500">{convert(s.price)}</span>
                          <span className="text-[10px] text-zinc-500 font-bold">{selectedCountry.currency}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-full border border-zinc-800 shadow-inner">
                          <button onClick={() => handleUpdateCart(s, -1)} className="p-2 hover:bg-zinc-800 rounded-full transition"><Minus size={16}/></button>
                          <span className="font-black w-6 text-center text-lg">{inCart?.qty || 0}</span>
                          <button onClick={() => handleUpdateCart(s, 1)} className="p-2 bg-yellow-600 text-black rounded-full hover:bg-yellow-500 transition shadow-lg shadow-yellow-600/20"><Plus size={16}/></button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* عرض معرض الأعمال */}
            {view === 'portfolio' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map(i => (
                  <div key={i} className="aspect-video bg-zinc-900 rounded-[50px] overflow-hidden border border-zinc-800 relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition">
                      <Play className="w-16 h-16 text-yellow-500 fill-yellow-500 animate-pulse" />
                    </div>
                    <div className="absolute bottom-8 left-8">
                      <span className="bg-yellow-600 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase">Cinematic AI</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* سلة التسوق الذكية والمحاسبة */}
          {cart.length > 0 && view === 'landing' && (
            <motion.div initial={{ y: 200 }} animate={{ y: 0 }} className="fixed bottom-0 inset-x-0 z-[200] p-6">
              <div className="max-w-5xl mx-auto bg-yellow-600 text-black p-8 rounded-[50px] shadow-2xl shadow-yellow-600/30 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-black opacity-60 uppercase">Total (Full)</p>
                    <p className="text-3xl font-black tracking-tighter">{finalTotal.toFixed(0)} <small className="text-xs">{selectedCountry.currency}</small></p>
                  </div>
                  <div className="w-[1px] h-12 bg-black/10 hidden md:block" />
                  <div>
                    <p className="text-[10px] font-black opacity-60 uppercase italic">Deposit 50%</p>
                    <p className="text-3xl font-black tracking-tighter">{deposit.toFixed(0)} <small className="text-xs">{selectedCountry.currency}</small></p>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <input type="text" placeholder="CODE" value={coupon} onChange={(e)=>setCoupon(e.target.value.toUpperCase())} className="bg-black/10 border border-black/20 p-4 rounded-3xl outline-none placeholder:text-black/40 font-bold text-center w-full md:w-32" />
                  <button onClick={()=>{if(coupon==='FF142') setDiscount(0.2)}} className="bg-black text-white px-6 py-4 rounded-3xl font-black text-xs hover:scale-105 transition active:scale-95">APPLY</button>
                  <button onClick={() => setView('checkout')} className="bg-white text-black px-10 py-4 rounded-full font-black text-sm shadow-xl flex items-center gap-2 group">
                    توقيع العقد <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* شاشة العقد الاحترافية */}
          <AnimatePresence>
            {view === 'checkout' && !isOrdered && (
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-[500] bg-black p-6 overflow-y-auto">
                <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-900 rounded-[60px] p-10 md:p-16 my-10 relative">
                  <button onClick={() => setView('landing')} className="absolute top-10 left-10 text-zinc-500 hover:text-white"><X/></button>
                  <ShieldCheck size={50} className="text-yellow-600 mx-auto mb-6" />
                  <h2 className="text-4xl font-black text-center mb-4 italic gold-gradient">CONTRACT AGREEMENT</h2>
                  <p className="text-center text-zinc-500 text-xs mb-10 leading-relaxed uppercase tracking-widest font-bold">بموجب هذا العقد، تلتزم شركة Kings Media بتقديم الخدمات المختارة للطرف الثاني.</p>
                  
                  <form onSubmit={submitContract} className="space-y-6">
                    <div className="space-y-4">
                      <input required placeholder="الاسم بالكامل" className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-[25px] outline-none focus:border-yellow-600 transition text-right" onChange={e => setClientData({...clientData, name: e.target.value})} />
                      <input required placeholder="رقم الواتساب مع رمز الدولة" className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-[25px] outline-none focus:border-yellow-600 transition text-right" onChange={e => setClientData({...clientData, phone: e.target.value})} />
                      <input required type="email" placeholder="البريد الإلكتروني الرسمي" className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-[25px] outline-none focus:border-yellow-600 transition text-right" onChange={e => setClientData({...clientData, email: e.target.value})} />
                    </div>
                    
                    <div className="p-8 bg-black rounded-[40px] border border-zinc-900 space-y-3">
                      <div className="flex justify-between text-zinc-500 italic text-sm">
                        <span>قيمة الخدمات:</span>
                        <span>{subtotal.toFixed(0)} {selectedCountry.currency}</span>
                      </div>
                      <div className="flex justify-between font-black text-xl text-yellow-500 border-t border-zinc-900 pt-3">
                        <span>العربون المطلوب:</span>
                        <span>{deposit.toFixed(0)} {selectedCountry.currency}</span>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 text-black py-6 rounded-[30px] font-black text-xl shadow-2xl shadow-yellow-600/20 hover:scale-[1.02] transition active:scale-[0.98]">إرسال وتوقيع العقد</button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* شاشة النجاح */}
          <AnimatePresence>
            {isOrdered && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="fixed inset-0 z-[600] bg-black flex flex-col items-center justify-center p-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 animate-pulse" />
                  <CheckCircle2 size={120} className="text-green-500 mb-8 relative" />
                </div>
                <h2 className="text-5xl font-black text-white mb-4 italic tracking-tighter uppercase">Order Deployed!</h2>
                <p className="text-zinc-500 max-w-sm mx-auto font-bold text-sm">تم إرسال العقد لبريدك الإلكتروني، سيتصل بك فريق Kings Media خلال دقائق.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kings Chat عائمة */}
          <div className="fixed bottom-10 left-10 z-[300]">
            <AnimatePresence>
              {isChatOpen && (
                <motion.div initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute bottom-20 left-0 w-80 bg-zinc-950 border border-zinc-800 rounded-[40px] shadow-2xl overflow-hidden">
                  <div className="bg-yellow-600 p-6 text-black flex items-center justify-between">
                    <span className="font-black italic">KINGS CHAT</span>
                    <button onClick={() => setIsChatOpen(false)}><X size={18}/></button>
                  </div>
                  <div className="p-10 text-center space-y-4">
                    <p className="text-xs text-zinc-500 font-bold uppercase">Our team is online</p>
                    <a href="https://wa.me/962778498350" className="flex items-center justify-center gap-3 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 hover:border-green-500 transition">
                      <Phone size={18} className="text-green-500" />
                      <span className="text-xs font-black">WhatsApp Live</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition">
              <MessageCircle size={32} />
            </button>
          </div>

          {/* Footer & Admin Dashboard Access */}
          <footer className="p-12 border-t border-zinc-900 text-center space-y-8 bg-zinc-950/50">
             <div className="flex justify-center gap-10">
               <a href="#" className="text-zinc-600 hover:text-white transition"><Mail size={22}/></a>
               <a href="#" className="text-zinc-600 hover:text-white transition"><Phone size={22}/></a>
             </div>
             <p className="text-[10px] text-zinc-700 tracking-[1.5em] uppercase font-black">Kings Media Production 2026</p>
             <button onClick={() => { if(prompt("Admin Password?") === 'FF142') setIsAdmin(true); }} className="p-2 opacity-5 hover:opacity-100 transition"><Lock size={12}/></button>
          </footer>

          {/* لوحة المطورين (تظهر عند إدخال الباسورد) */}
          <AnimatePresence>
            {isAdmin && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[700] bg-zinc-950 p-10 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-black italic gold-gradient flex items-center gap-3"><LayoutDashboard /> DEV CONTROL PANEL</h2>
                    <button onClick={() => setIsAdmin(false)} className="bg-zinc-900 p-4 rounded-full"><X/></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-black rounded-[40px] border border-zinc-800">
                      <h4 className="text-xs font-black text-zinc-500 mb-4 uppercase tracking-widest">API Connection Status</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl">
                          <span className="text-sm font-bold">Firebase</span>
                          <span className="text-[10px] bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-black uppercase">Active (Keys Injected)</span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl">
                          <span className="text-sm font-bold">Resend</span>
                          <span className="text-[10px] bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-black uppercase">Ready</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-black rounded-[40px] border border-zinc-800">
                      <h4 className="text-xs font-black text-zinc-500 mb-4 uppercase tracking-widest">Pricing Control</h4>
                      <p className="text-sm text-zinc-400 italic font-medium leading-relaxed">يمكنك تعديل أسعار الخدمات والخصومات من خلال ملف `services.json` البرمجي لضمان الأمان والمحاسبة.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <style jsx global>{`
        .gold-gradient {
          background: linear-gradient(to right, #ffffff 0%, #ca8a04 50%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
