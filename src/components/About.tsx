"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="py-32 bg-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          {/* Side Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-5 order-2 md:order-1"
          >
            <div className="aspect-[3/4] relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0"></div>
              <Image
                src="/images/philosophy.jpg"
                alt="Minimalist architecture abstract"
                fill
                className="object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-7 order-1 md:order-2"
          >
            <span className="text-primary font-headline tracking-[0.4em] uppercase text-[10px] block mb-6">
              Philosophy
            </span>
            <h2 className="font-headline text-4xl md:text-6xl mb-12 leading-tight">
              Triết lý của sự tĩnh lặng và cấu trúc.
            </h2>
            <div className="space-y-8 text-on-surface-variant font-body text-lg leading-relaxed max-w-2xl">
              <p>
                Kiến trúc đối với tôi là sự cân bằng giữa những khoảng trống và chất liệu. Mỗi đường nét đều mang một mục đích, mỗi vật liệu đều kể một câu chuyện về sự bền vững và thẩm mỹ.
              </p>
              <p>
                Chúng tôi tập trung vào việc tối ưu hóa ánh sáng tự nhiên và sự luân chuyển không khí, biến ngôi nhà thành một thực thể sống hòa quyện với môi trường xung quanh.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-outline-variant/20 pt-12">
              {[
                { label: "Năm kinh nghiệm", value: "12+" },
                { label: "Dự án hoàn thiện", value: "150+" },
                { label: "Giải thưởng quốc tế", value: "24" },
              ].map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * idx, duration: 0.6 }}
                >
                  <h4 className="text-primary font-headline text-3xl mb-2">{stat.value}</h4>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
