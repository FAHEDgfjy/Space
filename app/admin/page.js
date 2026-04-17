'use client';
import React, { useState, useEffect } from 'react';
import { Settings, Tag, Image, FileText, Trash2, Plus, Save, Megaphone } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('services');
  const [contracts, setContracts] = useState([
    { id: 1, client: "فهد", service: "مونتاج إعلاني", price: 150, time: "14:00" },
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* القائمة الجانبية */}
      <div className="w-64 bg-zinc-900 border-l border-zinc-800 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold gold-gradient mb-6">F&H Control</h2>
        <button onClick={() => setActiveTab('services')} className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === 'services' ? 'bg-yellow-600 text-black' : 'hover:bg-zinc-800'}`}>
          <Settings size={20} /> إدارة الخدمات والأسعار
        </button>
        <button onClick={() => setActiveTab('ads')} className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === 'ads' ? 'bg-yellow-600 text-black' : 'hover:bg-zinc-800'}`}>
          <Megaphone size={20} /> الإعلانات والشريط
        </button>
        <button onClick={() => setActiveTab('portfolio')} className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === 'portfolio' ? 'bg-yellow-600 text-black' : 'hover:bg-zinc-800'}`}>
          <Image size={20} /> معرض الأعمال
        </button>
        <button onClick={() => setActiveTab('coupons')} className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === 'coupons' ? 'bg-yellow-600 text-black' : 'hover:bg-zinc-800'}`}>
          <Tag size={20} /> أكواد الخصم
        </button>
        <button onClick={() => setActiveTab('contracts')} className={`flex items-center gap-2 p-3 rounded-lg ${activeTab === 'contracts' ? 'bg-yellow-600 text-black' : 'hover:bg-zinc-800'}`}>
          <FileText size={20} /> العقود (24h)
        </button>
      </div>

      {/* محتوى اللوحة */}
      <div className="flex-1 p-10">
        {activeTab === 'services' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold mb-6">إدارة الخدمات</h1>
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <div className="flex justify-between mb-4">
                <span>اسم الخدمة: مونتاج فيديو</span>
                <input type="number" placeholder="السعر" className="bg-black border border-zinc-700 p-2 rounded w-24" />
                <button className="bg-yellow-600 px-4 py-2 rounded text-black font-bold">تحديث</button>
              </div>
              <button className="flex items-center gap-2 text-yellow-500 mt-4"><Plus size={18}/> إضافة خدمة جديدة</button>
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold mb-6">العقود الحالية</h1>
            <p className="text-red-500 text-sm mb-4">ملاحظة: يتم مسح العقود تلقائياً كل 24 ساعة.</p>
            <div className="grid gap-4">
              {contracts.map(con => (
                <div key={con.id} className="bg-zinc-900 p-4 rounded-lg flex justify-between items-center border-r-4 border-yellow-600">
                  <div>
                    <p className="font-bold">{con.client}</p>
                    <p className="text-xs text-gray-400">{con.service} - {con.time}</p>
                  </div>
                  <div className="text-yellow-500 font-bold">{con.price} JOD</div>
                  <button className="text-red-500"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* باقي التبويبات ستفعل بنفس الطريقة */}
      </div>
    </div>
  );
}
