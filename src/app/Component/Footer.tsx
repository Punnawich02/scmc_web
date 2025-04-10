import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#6869AA] text-white px-6 py-8 mt-auto w-[80%] rounded-md justify-self-center mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
      <div>
        <h3 className="font-bold mb-4">ติดต่อเรา</h3>
        <p className="text-sm mb-2">
        ศูนย์บริหารจัดการเมืองเพื่อความยั่งยืน <br />
        อาคารสำนักงานมหาวิทยาลัย 3 ชั้น 2 <br />
        239 ถ.ห้วยแก้ว ต.สุเทพ อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50200
        </p>
        <p className="text-sm mb-2 py-4">
        SCMC (ธุรการ) : 0-5394-1492 <br />
        SCMC (ลงทะเบียนยานพาหนะ) : 0-5394-1494 <br />
        ขส.มช. (รถไฟฟ้า) : 0-5394-4936 <br />
        ขส.มช. (รถตู้-รถบัส) : 0-5394-4949 <br />
        งานรักษาความปลอดภัย : 0-5394-1190-1 <br />
        support@scmc.cmu.ac.th <br />
        จันทร์ - ศุกร์08.30 น. - 16.30 น. <br />
        SCMC : Smart Campus Management Center <br />
        ขส.มช. (@korsormorchor) <br />
        </p>
      </div>
      <div>
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1888.4392456677072!2d98.95485265947839!3d18.803567659926504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3b3530c3a9a5%3A0x62ddacc2ae6b2597!2z4Lio4Li54LiZ4Lii4LmM4Lia4Lij4Li04Lir4Liy4Lij4LiI4Lix4LiU4LiB4Liy4Lij4LmA4Lih4Li34Lit4LiH4Lit4Lix4LiI4LiJ4Lij4Li04Lii4LiwIOC4oeC4ii4!5e0!3m2!1sth!2sth!4v1744098137385!5m2!1sth!2sth"
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-md"
        ></iframe>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
