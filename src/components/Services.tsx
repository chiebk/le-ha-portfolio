"use client";

import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      title: "Tư vấn kiến trúc",
      description: "Phân tích mặt bằng, quy hoạch không gian và định hướng phong cách kiến trúc bền vững.",
      icon: "architecture",
      color: "tertiary",
      features: ["Quy hoạch tổng thể", "Thiết kế kết cấu", "Giấy phép xây dựng"],
    },
    {
      title: "Thiết kế nội thất",
      description: "Sự kết hợp hoàn mỹ giữa công năng sử dụng và cá tính riêng biệt của gia chủ.",
      icon: "chair",
      color: "primary",
      features: ["3D Visualization", "Lựa chọn vật liệu", "Thiết kế Bespoke"],
    },
    {
      title: "Thi công trọn gói",
      description: "Quản lý dự án từ bản vẽ đến thực tế, đảm bảo độ chính xác và chất lượng hoàn thiện cao nhất.",
      icon: "handyman",
      color: "tertiary",
      features: ["Giám sát tác giả", "Quản lý tiến độ", "Bàn giao chìa khóa"],
    },
  ];

  return (
    <section id="services" className="py-32 bg-surface-container-lowest relative">
      <div className="absolute inset-0 ambient-glow-cyan"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-tertiary font-headline tracking-[0.4em] uppercase text-[10px] block mb-4"
          >
            Services
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-headline text-4xl md:text-5xl"
          >
            Dịch Vụ Chuyên Nghiệp
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * idx, duration: 0.8 }}
              className="bg-surface p-12 hover:bg-surface-container-high transition-all duration-700 group cursor-default"
            >
              <div className={`w-16 h-16 mb-8 flex items-center justify-center border transition-all duration-500 relative ${
                service.color === 'tertiary' ? 'border-tertiary/20 group-hover:border-tertiary' : 'border-primary/20 group-hover:border-primary'
              }`}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  service.color === 'tertiary' ? 'bg-tertiary/10' : 'bg-primary/10'
                }`}></div>
                <span className={`material-symbols-outlined text-3xl transition-transform duration-500 group-hover:scale-110 ${
                  service.color === 'tertiary' ? 'text-tertiary' : 'text-primary'
                }`}>
                  {service.icon}
                </span>
              </div>
              <h3 className="font-headline text-2xl mb-6 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-on-surface-variant font-body mb-8 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3 text-[10px] uppercase tracking-widest text-on-surface/50">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className={`w-1 h-1 rounded-full ${service.color === 'tertiary' ? 'bg-tertiary' : 'bg-primary'}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
