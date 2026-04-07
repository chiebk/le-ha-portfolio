"use client";

import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-surface-container-lowest relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full ambient-glow-amber opacity-40"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary font-headline tracking-[0.4em] uppercase text-[10px] block mb-6">
              Contact
            </span>
            <h2 className="font-headline text-5xl md:text-7xl mb-12">
              Bắt đầu câu chuyện của bạn.
            </h2>
            <div className="space-y-12">
              {[
                { label: "Địa chỉ", value: "Phố Huế, Hai Bà Trưng, Hà Nội" },
                { label: "Email", value: "contact@leha-arch.vn" },
                { label: "Phone", value: "+84 90 000 0000" },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * idx }}
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface/40 mb-2">
                    {item.label}
                  </p>
                  <p className="font-body text-lg hover:text-primary transition-colors cursor-default">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-surface-container/60 backdrop-blur-2xl p-12 border border-outline-variant/10 shadow-2xl rounded-sm"
          >
            <form className="space-y-10">
              {[
                { label: "Họ & Tên", placeholder: "Nguyễn Văn A", type: "text" },
                { label: "Email", placeholder: "email@domain.com", type: "email" },
              ].map((field) => (
                <div key={field.label} className="relative group">
                  <label className="text-[10px] uppercase tracking-widest text-primary block mb-2 opacity-70 group-focus-within:opacity-100 transition-opacity">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 text-on-surface focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface/20"
                  />
                </div>
              ))}
              
              <div className="relative group">
                <label className="text-[10px] uppercase tracking-widest text-primary block mb-2 opacity-70 group-focus-within:opacity-100 transition-opacity">
                  Loại hình dự án
                </label>
                <select className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 text-on-surface focus:ring-0 focus:border-primary transition-all appearance-none cursor-pointer">
                  <option className="bg-surface">Biệt thự nghỉ dưỡng</option>
                  <option className="bg-surface">Căn hộ cao cấp</option>
                  <option className="bg-surface">Văn phòng - Studio</option>
                  <option className="bg-surface">Nhà hàng - Cafe</option>
                </select>
                <div className="absolute right-0 bottom-4 pointer-events-none">
                  <span className="material-symbols-outlined text-sm opacity-50">expand_more</span>
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] uppercase tracking-widest text-primary block mb-2 opacity-70 group-focus-within:opacity-100 transition-opacity">
                  Lời nhắn
                </label>
                <textarea
                  placeholder="Chia sẻ về dự án của bạn..."
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-3 text-on-surface focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface/20 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-5 font-headline text-xs tracking-[0.3em] uppercase hover:bg-primary-container hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 active:scale-[0.98]"
              >
                Gửi Yêu Cầu
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
