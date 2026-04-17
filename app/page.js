'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ShoppingCart, Plus, Minus, FileText, X, Lock, ShieldCheck, Megaphone } from 'lucide-react';

// --- مصفوفة الدول الشاملة (دقة الصرف مقابل 1 دينار أردني JOD) ---
const COUNTRIES = [
  // دول عربية (آسيا)
  { code: 'JO', name: 'الأردن', lang: 'ar', currency: 'JOD', rate: 1, flag: '🇯🇴' },
  { code: 'SA', name: 'السعودية', lang: 'ar', currency: 'SAR', rate: 5.29, flag: '🇸🇦' },
  { code: 'AE', name: 'الإمارات', lang: 'ar', currency: 'AED', rate: 5.18, flag: '🇦🇪' },
  { code: 'KW', name: 'الكويت', lang: 'ar', currency: 'KWD', rate: 0.43, flag: '🇰🇼' },
  { code: 'QA', name: 'قطر', lang: 'ar', currency: 'QAR', rate: 5.13, flag: '🇶🇦' },
  { code: 'OM', name: 'عمان', lang: 'ar', currency: 'OMR', rate: 0.54, flag: '🇴🇲' },
  { code: 'BH', name: 'البحرين', lang: 'ar', currency: 'BHD', rate: 0.53, flag: '🇧🇭' },
  { code: 'IQ', name: 'العراق', lang: 'ar', currency: 'IQD', rate: 1845, flag: '🇮🇶' },
  { code: 'LB', name: 'لبنان', lang: 'ar', currency: 'LBP', rate: 126000, flag: '🇱🇧' },
  { code: 'PS', name: 'فلسطين', lang: 'ar', currency: 'ILS', rate: 5.30, flag: '🇵🇸' },
  { code: 'SY', name: 'سوريا', lang: 'ar', currency: 'SYP', rate: 18300, flag: '🇸🇾' },
  { code: 'YE', name: 'اليمن', lang: 'ar', currency: 'YER', rate: 350, flag: '🇾🇪' },

  // دول عربية (أفريقيا)
  { code: 'EG', name: 'مصر', lang: 'ar', currency: 'EGP', rate: 67.5, flag: '🇪🇬' },
  { code: 'MA', name: 'المغرب', lang: 'ar', currency: 'MAD', rate: 14.1, flag: '🇲🇦' },
  { code: 'DZ', name: 'الجزائر', lang: 'ar', currency: 'DZD', rate: 190, flag: '🇩🇿' },
  { code: 'TN', name: 'تونس', lang: 'ar', currency: 'TND', rate: 4.4, flag: '🇹🇳' },
  { code: 'LY', name: 'ليبيا', lang: 'ar', currency: 'LYD', rate: 6.8, flag: '🇱🇾' },
  { code: 'SD', name: 'السودان', lang: 'ar', currency: 'SDG', rate: 850, flag: '🇸🇩' },
  { code: 'MR', name: 'موريتانيا', lang: 'ar', currency: 'MRU', rate: 56, flag: '🇲🇷' },
  { code: 'SO', name: 'الصومال', lang: 'ar', currency: 'SOS', rate: 805, flag: '🇸🇴' },
  { code: 'DJ', name: 'جيبوتي', lang: 'ar', currency: 'DJF', rate: 250, flag: '🇩🇯' },
  { code: 'KM', name: 'جزر القمر', lang: 'ar', currency: 'KMF', rate: 640, flag: '🇰🇲' },

  // دول أفريقيا (غير عربية)
  { code: 'NG', name: 'Nigeria', lang: 'en', currency: 'NGN', rate: 2150, flag: '🇳🇬' },
  { code: 'ZA', name: 'South Africa', lang: 'en', currency: 'ZAR', rate: 26.8, flag: '🇿🇦' },
  { code: 'KE', name: 'Kenya', lang: 'en', currency: 'KES', rate: 185, flag: '🇰🇪' },
  { code: 'ET', name: 'Ethiopia', lang: 'en', currency: 'ETB', rate: 170, flag: '🇪🇹' },

  // دول عالمية مطلوبة
  { code: 'TR', name: 'Türkiye', lang: 'tr', currency: 'TRY', rate: 45.6, flag: '🇹🇷' },
  { code: 'RU', name: 'Россия', lang: 'ru', currency: 'RUB', rate: 130, flag: '🇷🇺' },
  { code: 'ES', name: 'España', lang: 'es', currency: 'EUR', rate: 1.30, flag: '🇪🇸' },
  { code: 'US', name: 'USA', lang: 'en', currency: 'USD', rate: 1.41, flag: '🇺🇸' },
];

// --- قائمة الخدمات الـ 11 كاملة وبأسعارها الدقيقة ---
const KINGS_SERVICES = [
  { id: 1, price: 50, title: { ar: "فيديوهات AI (25 ثانية)", en: "AI Videos (25s)", ru: "ИИ Видео", tr: "AI Videoları", es: "Videos de IA" } },
  { id: 2, price: 25, title: { ar: "بوستات صور AI", en: "AI Image Posts", ru: "ИИ Посты", tr: "AI Görsel", es: "Posts de IA" } },
  { id: 3, price: 100, title: { ar: "تصميم موقع ويب", en: "Web Design", ru: "Веб-дизайн", tr: "Web Tasarım", es: "Diseño Web" } },
  { id: 4, price: 60, title: { ar: "خطة تسويقية رقمية", en: "Digital Marketing", ru: "Маркетинг", tr: "Dijital Pazarlama", es: "Marketing" } },
  { id: 5, price: 60, title: { ar: "خطة إدارية", en: "Management Plan", ru: "План управления", tr: "Yönetim Planı", es: "Plan de Gestión" } },
  { id: 6, price: 50, title: { ar: "تصميم شعار (Logo)", en: "Logo Design", ru: "Логотип", tr: "Logo Tasarımı", es: "Logo" } },
  { id: 7, price: 50, title: { ar: "تصاميم 3D", en: "3D Designs", ru: "3D Дизайн", tr: "3D Tasarım", es: "Diseños 3D" } },
  { id: 8, price: 25, title: { ar: "مونتاج فيديو إعلاني", en: "Ad Video Editing", ru: "Монтаж", tr: "Video Kurgu", es: "Edición" } },
  { id: 9, price: 200, title: { ar: "خدمة عملاء 24/7", en: "24/7 Support", ru: "Поддержка", tr: "Destek", es: "Soporte" } },
  { id: 10, price: 350, title: { ar: "بكج إدارة شاملة", en: "Full Package", ru: "Полный пакет", tr: "Tam Paket", es: "Paquete Completo" } },
  { id: 11, price: 50, title: { ar: "إدارة تمويل", en: "Funding Management", ru: "Управление", tr: "Finans", es: "Finanzas" } },
];

export default function KingsMediaUltimateSuite() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('landing');

  const convertPrice = (jod) => (jod * (selectedCountry?.rate || 1)).toLocaleString(undefined, { minimumFractionDigits: selectedCountry?.code === 'JO' ? 0 : 2 });
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deposit = subtotal * 0.5;

  const updateCart = (service, delta) => {
    const existing = cart.find(i => i.id === service.id);
    if (existing) {
      const newQty = existing.qty + delta;
      if (newQty <= 0) setCart(cart.filter(i => i.id !== service.id));
      else setCart(cart.map(i => i.id === service.id ? { ...i, qty: newQty } : i));
    } else if (delta > 0) setCart([...cart, { ...service, qty: 1 }]);
  };

  return (
    <div className="min-h-screen bg-black text-white" dir={selectedCountry?.lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* شاشة اختيار الدول */}
      {!selectedCountry && (
        <div className="fixed inset-0 z-[500] bg-black p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto text-center">
            <Globe className="w-16 h-16 text-yellow-500 mx-auto my-10 animate-pulse" />
            <h1 className="text-5xl font-black mb-12 gold-gradient">KINGS MEDIA</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-20">
              {COUNTRIES.map(c => (
                <button key={c.code} onClick={() => setSelectedCountry(c)} className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl hover:border-yellow-600 transition">
                  <span className="text-3xl block mb-2">{c.flag}</span>
                  <span className="text-xs font-bold">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedCountry && (
        <>
          <header className="p-10 text-center">
             <h1 className="text-6xl font-black gold-gradient">KINGS MEDIA</h1>
          </header>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pb-40">
            {KINGS_SERVICES.map(s => {
              const inCart = cart.find(i => i.id === s.id);
              return (
                <div key={s.id} className="bg-zinc-950 p-6 rounded-[30px] border border-zinc-900 flex flex-col justify-between">
                  <h3 className="text-lg font-bold mb-4">{s.title[selectedCountry.lang] || s.title['en']}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-yellow-500">{convertPrice(s.price)} <small className="text-[10px] opacity-50 uppercase">{selectedCountry.currency}</small></span>
                    <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-full border border-zinc-800">
                      <button onClick={() => updateCart(s, -1)} className="p-1"><Minus size={14}/></button>
                      <span className="font-bold text-sm">{inCart?.qty || 0}</span>
                      <button onClick={() => updateCart(s, 1)} className="p-1 text-yellow-500"><Plus size={14}/></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* الشريط العائم */}
          {cart.length > 0 && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-yellow-600 text-black px-8 py-4 rounded-full shadow-2xl flex items-center gap-8 z-[100] w-[90%] md:w-auto justify-between">
              <div className="text-sm">
                 <span className="block text-[10px] font-bold">DEPOSIT 50%</span>
                 <span className="font-black text-xl">{convertPrice(deposit)} {selectedCountry.currency}</span>
              </div>
              <button className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl">توقيع العقد</button>
            </div>
          )}

          {/* الأدمن السري */}
          <footer className="py-10 text-center opacity-5">
             <button onClick={() => {if(prompt('Password?')==='FF142') setView('admin')}}><Lock size={10}/></button>
          </footer>
        </>
      )}
    </div>
  );
}
