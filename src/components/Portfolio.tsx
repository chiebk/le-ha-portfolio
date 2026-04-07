"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Portfolio = () => {
  const projects = [
    {
      title: "The Zen House, Hà Nội",
      category: "Residential",
      image: "/images/portfolio-1.jpg",
      size: "large",
      link: "#",
    },
    {
      title: "Aura Apartment",
      category: "Interior",
      image: "/images/portfolio-2.jpg",
      size: "small",
      link: "#",
    },
    {
      title: "Concrete Monolith",
      category: "Exterior",
      image: "/images/portfolio-3.jpg",
      size: "small",
      link: "#",
    },
    {
      title: "Gourmet Studio",
      category: "Hospitality",
      image: "/images/portfolio-4.jpg",
      size: "large",
      link: "#",
    },
  ];

  return (
    <section id="work" className="py-32 bg-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-headline tracking-[0.4em] uppercase text-[10px] block mb-4"
            >
              Portfolio
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-headline text-4xl md:text-6xl"
            >
              Dự Án Tiêu Biểu
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <a 
              href="#" 
              className="group flex items-center gap-4 text-xs uppercase tracking-widest border-b border-outline-variant pb-2 hover:border-primary transition-all duration-300"
            >
              Xem tất cả dự án
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">
                arrow_forward
              </span>
            </a>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.8 }}
              className={`relative overflow-hidden group rounded-sm shadow-2xl ${
                project.size === "large" ? "md:col-span-8" : "md:col-span-4"
              }`}
            >
              <div className="relative aspect-video md:aspect-auto md:h-full min-h-[400px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/60 transition-all duration-500"></div>
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary text-[10px] opacity-0 group-hover:opacity-100 tracking-[0.3em] uppercase mb-2 transition-opacity duration-500 delay-100">
                    {project.category}
                  </p>
                  <h3 className="font-headline text-2xl md:text-3xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {project.title}
                  </h3>
                  <div className="mt-6 w-0 group-hover:w-16 h-px bg-primary transition-all duration-500 delay-300"></div>
                </div>
                
                <a 
                  href={project.link} 
                  className="absolute inset-0 z-10"
                  aria-label={`View ${project.title}`}
                ></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
