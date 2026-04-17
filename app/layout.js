import './globals.css';

export const metadata = {
  title: 'F&H Media | وكالة الإبداع الرقمي',
  description: 'خدمات مونتاج وتصوير وتسويق باحترافية عالية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* كود اللايف شات - Crisp */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.$crisp=[];window.CRISP_WEBSITE_ID="ضع_هنا_الايدي_الخاص_بك";
          (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";
          s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
        ` }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
