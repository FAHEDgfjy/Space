import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// ملاحظة: الـ API Key نضعه في Vercel وليس هنا للأمان
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, serviceName } = await request.json();

    const data = await resend.emails.send({
      from: 'F&H Media <onboarding@resend.dev>', // لاحقاً تربطه بدومينك
      to: ['your-email@gmail.com'], // ضع إيميلك هنا لتصلك الطلبات
      subject: 'طلب خدمة جديد - F&H Media',
      html: `
        <div dir="rtl" style="font-family: sans-serif; background: #000; color: #fff; padding: 20px; border: 1px solid #ca8a04;">
          <h1 style="color: #facc15;">طلب جديد من الموقع!</h1>
          <p><strong>إيميل العميل:</strong> ${email}</p>
          <p><strong>الخدمة المطلوبة:</strong> ${serviceName}</p>
          <hr style="border-color: #333;" />
          <p>تم إرسال هذا الطلب عبر نظام Resend الذكي.</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
