"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-surface-container-lowest">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero-bg.jpg"
            alt="Ultra-modern minimalist living room"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 lg:col-span-7">
          {/* Profile Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary blur-md opacity-30 animate-pulse"></div>
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-primary/50">
                <Image
                  src="/images/portrait.jpg"
                  alt="Lê Hà Architect"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-primary font-headline tracking-[0.3em] uppercase text-[10px]">
                Architect & Designer
              </p>
              <h2 className="text-on-surface font-headline text-lg">Lê Hà</h2>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-headline text-5xl md:text-7xl lg:text-8xl leading-none mb-8 tracking-tighter text-glow-amber"
          >
            Kiến Tạo Không Gian,<br />
            <span className="text-primary-container">Nâng Tầm Cuộc Sống</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-on-surface-variant font-body text-lg max-w-lg mb-12 leading-relaxed"
          >
            Chúng tôi không chỉ xây dựng công trình, chúng tôi kiến tạo những trải nghiệm sống tinh tế thông qua ngôn ngữ kiến trúc tối giản và hiện đại.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <button className="bg-primary text-on-primary px-10 py-4 font-headline text-xs tracking-[0.2em] uppercase hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20">
              Bắt đầu dự án
            </button>
            <button className="border border-outline-variant/30 text-on-surface px-10 py-4 font-headline text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-colors active:scale-95">
              Xem Portfolio
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent animate-bounce"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
