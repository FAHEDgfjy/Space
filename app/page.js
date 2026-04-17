'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, MessageCircle, Send } from 'lucide-react';

export default function Home() {
  const [showAd, setShowAd] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white p-4">
      
      {/* 1. المربع الإعلاني الذكي */}
      <AnimatePresence>
        {showAd && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-20 left-4 z-50 ad-banner p-4 rounded-xl w-72 border border-yellow-600"
          >
            <button 
              onClick={() => setShowAd(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
            <h3 className="gold-gradient font-bold mb-1">عرض خاص لفترة محدودة!</h3>
            <p className="text-xs text-gray-300 mb-2">احصل على مونتاج فيديو إعلاني بخصم 30% بمناسبة الافتتاح.</p>
            <button className="bg-yellow-600 text-black text-xs font-bold py-1 px-3 rounded-md">اطلب الآن</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. الـ Hero Section (الواجهة) */}
      <section className="py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-5xl font-black mb-4 gold-gradient"
        >
          F&H MEDIA
        </motion.h1>
        <p className="text-gray-400 text-lg mb-8">نحول رؤيتك إلى واقع سينمائي</p>
      </section>

      {/* 3. قسم الخدمات مع زر الشراء */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
        {[
          { title: "مونتاج تجاري", price: "150 JOD" },
          { title: "إدارة سوشيال ميديا", price: "250 JOD" }
        ].map((service, index) => (
          <div key={index} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-yellow-600 transition-all group">
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-yellow-500 font-bold mb-4">{service.price}</p>
            <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
              <ShoppingCart size={18} />
              شراء الخدمة
            </button>
          </div>
        ))}
      </section>

      {/* 4. تلميح اللايف شات */}
      <div className="fixed bottom-6 left-6 animate-bounce">
        <div className="bg-yellow-600 p-3 rounded-full shadow-2xl">
          <MessageCircle className="text-black" />
        </div>
      </div>
    </main>
  );
}
