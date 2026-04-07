const Footer = () => {
    const SOCIAL_LINKS = [
        { name: "Instagram", href: "#" },
        { name: "LinkedIn", href: "#" },
        { name: "Behance", href: "#" },
        { name: "Journal", href: "#" },
    ];

    return (
        <footer className="bg-neutral-950 border-t border-neutral-900/50">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-16 w-full max-w-screen-2xl mx-auto gap-8">
                {/* Copyright Section */}
                <div className="order-2 md:order-1 text-center md:text-left">
                    <p className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-600">
                        © 2024 LÊ HÀ ARCHITECTURE
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-8 order-1 md:order-2 flex-wrap justify-center">
                    {SOCIAL_LINKS.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-600 hover:text-primary transition-all duration-300 opacity-80 hover:opacity-100 relative group"
                        >
                            {social.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Attribution Section */}
                <div className="order-3 text-center md:text-right">
                    <p className="font-headline text-[10px] tracking-[0.2em] uppercase text-neutral-600">
                        Designed by Lê Hà Studio
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
