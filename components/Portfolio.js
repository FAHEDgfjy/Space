'use client';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: "فيديو إعلاني - عطور", type: "video", url: "/videos/perfume.mp4", thumbnail: "/img/thumb1.jpg" },
  { id: 2, title: "جلسة تصوير مجوهرات", type: "image", url: "/img/jewelry.jpg" },
  // هذه البيانات سيتم جلبها لاحقاً من لوحة التحكم
];

export default function Portfolio() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 gold-gradient">معرض الأعمال الإبداعية</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 group"
            >
              {project.type === 'video' ? (
                <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                  <span className="text-yellow-500 text-sm">مشغل فيديو سينمائي</span>
                  {/* هنا نضع الـ Video Player الخاص بك */}
                </div>
              ) : (
                <img src={project.url} alt={project.title} className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              )}
              <div className="p-4 bg-zinc-900">
                <h3 className="text-white font-bold">{project.title}</h3>
                <p className="text-gray-500 text-xs">شاهد التفاصيل</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
