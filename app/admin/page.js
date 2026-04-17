'use client';
import React, { useState } from 'react';
import { Settings, Tag, Image, FileText, Trash2, Plus, Megaphone, Video } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('ads');

  return (
    <div className="min-h-screen bg-black text-white flex font-sans" dir="rtl">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-950 border-l border-zinc-900 p-8 space-y-4">
        <div className="mb-10 text-2xl font-black gold-gradient tracking-tighter">F&H DASHBOARD</div>
        
        <button onClick={() => setActiveTab('ads')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activeTab === 'ads' ? 'bg-yellow-600 text-black font-bold' : 'hover:bg-zinc-900 text-zinc-400'}`}>
          <Megaphone size={20}/> إدارة الإعلانات
        </button>
        
        <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activeTab === 'services' ? 'bg-yellow-600 text-black font-bold' : 'hover:bg-zinc-900 text-zinc-400'}`}>
          <Settings size={20}/> الخدمات والأسعار
        </button>

        <button onClick={() => setActiveTab('portfolio')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activeTab === 'portfolio' ? 'bg-yellow-600 text-black font-bold' : 'hover:bg-zinc-900 text-zinc-400'}`}>
          <Video size={20}/> معرض الأعمال
        </button>

        <button onClick={() => setActiveTab('coupons')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activeTab === 'coupons' ? 'bg-yellow-600 text-black font-bold' : 'hover:bg-zinc-900 text-zinc-400'}`}>
          <Tag size={20}/> أكواد الخصم
        </button>

        <button onClick={() => setActiveTab('contracts')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${activeTab === 'contracts' ? 'bg-yellow-600 text-black font-bold' : 'hover:bg-zinc-900 text-zinc-400'}`}>
          <FileText size={20}/> العقود النشطة
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 bg-zinc-950">
        
        {activeTab === 'ads' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">التحكم بالإعلانات</h2>
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <label className="block text-sm text-zinc-500 mb-2">نص الإعلان المنبثق:</label>
              <textarea className="w-full bg-black border border-zinc-800 p-4 rounded-xl mb-4 text-white" defaultValue="خصم خاص 20% بمناسبة الافتتاح!"></textarea>
              <div className="flex gap-4">
                <button className="bg-zinc-800 px-6 py-2 rounded-lg text-sm">رفع صورة إعلان</button>
                <button className="bg-zinc-800 px-6 py-2 rounded-lg text-sm">رفع فيديو إعلان</button>
                <button className="bg-yellow-600 text-black px-8 py-2 rounded-lg font-bold mr-auto">حفظ التغييرات</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">أكواد الخصم</h2>
            <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
              <div className="flex gap-4 items-center bg-black p-4 rounded-xl border border-zinc-800">
                <span className="font-mono text-yellow-500 font-bold">FAHD20</span>
                <span className="text-zinc-500">خصم 20%</span>
                <span className="bg-green-900/30 text-green-500 text-xs px-2 py-1 rounded">نشط</span>
                <button className="mr-auto text-red-500"><Trash2 size={18}/></button>
              </div>
              <button className="flex items-center gap-2 bg-yellow-600 text-black px-6 py-3 rounded-xl font-bold">
                <Plus size={18}/> إضافة كود جديد
              </button>
            </div>
          </div>
        )}

        {/* ملاحظة: العقود هنا سيتم ربطها بـ Timer لمسحها كل 24 ساعة برمجياً */}
        {activeTab === 'contracts' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">العقود (تحذف كل 24 ساعة)</h2>
            <div className="grid gap-4">
              <div className="bg-zinc-900 p-6 rounded-2xl border-r-4 border-yellow-600 flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">عميل جديد: فهد الهرايشة</p>
                  <p className="text-zinc-500 text-sm">مونتاج فيديو - 120 JOD (بعد الخصم)</p>
                </div>
                <div className="text-zinc-600 text-sm italic text-left">ينتهي خلال: 14 ساعة</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
