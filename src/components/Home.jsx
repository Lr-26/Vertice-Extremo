
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, Mail, Phone, Instagram, Twitter, Youtube, ArrowLeft, ArrowRight, Menu, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { expeditions } from '../data/expeditions';

// --- Shared Components ---

const SectionTitle = ({ title, subtitle, align = 'center' }) => (
    <div className={`mb-16 text-${align} z-10 relative px-4`}>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
        >
            <div className={`h-[1px] w-8 bg-brand/30 ${align === 'center' ? '' : 'hidden'}`} />
            <motion.p className="text-sm md:text-base text-brand font-bold tracking-[0.4em] uppercase">
                {subtitle}
            </motion.p>
            <div className={`h-[1px] w-8 bg-brand/30 ${align === 'center' ? '' : 'hidden'}`} />
        </motion.div>
        
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white"
        >
            {title}
        </motion.h2>
    </div>
);

// --- Navbar ---
const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { label: 'Inicio', icon: ChevronDown, href: '#inicio' },
        { label: 'Nosotros', icon: MapPin, href: '#nosotros' },
        { label: 'Expediciones', icon: Youtube, href: '#expediciones' },
        { label: 'Galería', icon: Instagram, href: '#galería' },
        { label: 'Contacto', icon: Mail, href: '#contacto' },
    ];

    return (
        <>
            {/* Desktop Dynamic Sidebar */}
            <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="fixed left-0 top-0 h-screen z-50 flex items-center pointer-events-none md:pointer-events-auto"
            >
                {/* Trigger Zone & Glow Indicator (Enhanced) */}
                <div className={`absolute left-0 top-1/4 h-1/2 w-4 pointer-events-auto transition-all duration-700 ${isHovered ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
                    {/* Main Glow Beam */}
                    <div className="absolute inset-0 bg-brand/20 blur-md rounded-r-full animate-pulse"></div>
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-brand to-transparent rounded-r-full shadow-[0_0_15px_rgba(255,107,53,0.8)]"></div>
                    
                    {/* Technical Handle Dots/Line */}
                    <div className="absolute inset-y-0 left-1 flex flex-col items-center justify-center gap-1 opacity-40">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 rounded-full bg-white"></div>
                        ))}
                    </div>
                </div>
                <div className={`absolute left-0 top-0 w-20 h-full pointer-events-auto transition-all ${isHovered ? 'w-64' : 'w-20'}`}></div>

                {/* The Actual Sidebar Panel */}
                <motion.nav 
                    initial={false}
                    animate={{ 
                        x: isHovered ? 0 : -220,
                        opacity: isHovered ? 1 : 0
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                    className="h-[95vh] w-64 bg-slate-950/20 backdrop-blur-3xl border border-white/5 rounded-r-[40px] shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto ml-2 relative overflow-hidden"
                >
                    {/* Mirror Effect Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                    <div className="p-8 border-b border-white/5 relative z-10">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-brand/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                                <img src="/logo.jpg" alt="Logo" className="relative h-12 w-12 rounded-full border-2 border-brand/50" />
                            </div>
                            <span className="text-xl font-black uppercase text-white tracking-tighter">
                                VÉRTICE <br /><span className="text-brand text-xs tracking-[0.5em]">FACTORY</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex-1 py-10 px-6 space-y-4 relative z-10">
                        {navItems.map((item) => (
                            <a 
                                key={item.label} 
                                href={item.href}
                                className="flex items-center gap-5 px-5 py-4 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all group relative overflow-hidden"
                            >
                                <item.icon size={20} className="group-hover:text-brand transition-colors relative z-10" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] relative z-10">{item.label}</span>
                                
                                {/* Hover background chip */}
                                <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                            </a>
                        ))}
                    </div>

                    {/* Dashboard Sticker / User Icon */}
                    <div className="p-8 border-t border-white/5 flex justify-center relative z-10">
                        <Link to="/register" className="group relative">
                            <div className="absolute -inset-4 bg-brand rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition duration-500"></div>
                            <div className="h-16 w-16 rounded-full bg-slate-900 border-2 border-white/20 flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all cursor-pointer overflow-hidden backdrop-blur-md">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 5 }}
                                >
                                    {/* Using Lucide Person icon as the "sticker" base */}
                                    <Maximize2 size={32} className="text-brand" />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand/40 to-transparent opacity-0 group-hover:opacity-100"></div>
                            </div>
                            {/* Pro Badge */}
                            <span className="absolute -top-1 -right-1 bg-brand text-slate-950 text-[8px] font-black px-2 py-1 rounded-full border border-slate-950 transform rotate-12">PRO</span>
                        </Link>
                    </div>
                </motion.nav>
            </div>

            {/* Mobile Header - Remains similar for usability */}
            <nav className="md:hidden fixed top-0 w-full z-50 px-6 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.jpg" alt="Logo" className="h-8 w-8 rounded-full shadow-[0_0_15px_rgba(255,107,53,0.3)]" />
                    <span className="text-lg font-black uppercase text-white">VÉRTICE <span className="text-brand">FACTORY</span></span>
                </Link>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white bg-white/5 rounded-lg"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="fixed inset-0 bg-slate-950 z-[60] flex flex-col p-10"
                    >
                        <div className="flex justify-between items-center mb-20">
                            <span className="text-2xl font-black uppercase text-white">MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} className="text-white" /></button>
                        </div>
                        <div className="space-y-8">
                            {navItems.map((item) => (
                                <a 
                                    key={item.label} 
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-4xl font-black uppercase text-slate-500 hover:text-brand transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// --- Hero Section ---
const Hero = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const scrollToTreks = () => {
        const element = document.getElementById('nosotros');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const heroImages = [
        "/trekking_hero_background_1769465210613.png",
        "/everest_base_camp_trek_1769465309368.png",
        "/fitz_roy_patagonia_trek_1769465333392.png",
        "/mont_blanc_trek_europe_1769465358088.png"
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="inicio" className="h-screen w-full flex items-center justify-center overflow-hidden relative bg-slate-950">
            {/* SaaS Mesh Background Combined with Images */}
            <div className="absolute inset-0 z-0 bg-mesh opacity-40"></div>
            
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={heroImages[currentImageIndex]}
                        alt="Hero Background"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950"></div>
            </motion.div>

            <div className="container mx-auto relative z-10 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-bold tracking-[0.3em] uppercase mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                        </span>
                        SaaS Expedition Factory v2.0
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-9xl font-black leading-[0.9] mb-8 uppercase text-white"
                    >
                        Escala tus <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-400 to-indigo-500 animate-gradient-x">Límites</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        La infraestructura tecnológica definitiva para exploradores de alto rendimiento. Gestiona tu aventura con precisión milimétrica.
                    </motion.p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <motion.button
                            onClick={scrollToTreks}
                            className="premium-button group"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                EXPLORAR FACTORY <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </span>
                        </motion.button>
                        
                        <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-slate-500 uppercase">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <span>+500 Usuarios Activos</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-brand to-transparent"></div>
            </motion.div>
        </section>
    );
};

// --- About Section ---
const About = () => {
    return (
        <section id="nosotros" className="min-h-screen w-full bg-slate-950 flex flex-col justify-center relative px-6 md:px-20 py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none"></div>

            <SectionTitle title="Misión" subtitle="Infraestructura de Aventura" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto relative z-10 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 text-brand font-bold text-xs tracking-widest uppercase">
                        <span className="w-8 h-[1px] bg-brand"></span>
                        Deep Tech Exploration
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white">
                        Donde la montaña <br />
                        <span className="text-brand">se encuentra con el Código</span>
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                        Vértice Extremo no es solo una agencia de viajes. Somos una factoría de experiencias escalables fundamentadas en la seguridad técnica y el análisis geográfico avanzado.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="glass-panel p-6 rounded-2xl">
                            <h4 className="text-3xl font-black text-white mb-1">99.9%</h4>
                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Uptime Operativo</p>
                        </div>
                        <div className="glass-panel p-6 rounded-2xl">
                            <h4 className="text-3xl font-black text-white mb-1">24/7</h4>
                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Monitoreo Satelital</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group h-[500px]"
                >
                    {/* Simulated Dashboard UI Element */}
                    <div className="absolute -top-10 -right-10 w-64 glass-panel p-6 rounded-2xl z-20 hidden md:block animate-float">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ritmo Cardíaco</span>
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                        </div>
                        <div className="h-16 flex items-end gap-1">
                            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                <div key={i} className="flex-1 bg-brand/30 rounded-t-sm" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative">
                        <img
                            src="/trekking_gallery_2_1769466407343.png"
                            alt="Factory"
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Treks Section ---
const Treks = () => {
    const activeTreks = expeditions;

    return (
        <section id="expediciones" className="min-h-screen w-full bg-slate-950 flex flex-col justify-center relative px-6 md:px-20 py-20 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mesh opacity-10 pointer-events-none"></div>

            <SectionTitle title="Nexus" subtitle="Explora el Catálogo" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto">
                {activeTreks.map((trek, i) => (
                    <motion.div
                        key={trek.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="saas-card h-[500px] flex flex-col group"
                    >
                        <div className="relative h-2/3 overflow-hidden">
                            <img src={trek.heroImage} alt={trek.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70" />
                            <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-brand uppercase tracking-widest">
                                {trek.level}
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-black uppercase text-white mb-2">{trek.title}</h3>
                                <p className="text-slate-500 text-sm font-light">Localización Premium: Patagonia</p>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                <div className="text-2xl font-black text-white">
                                    <span className="text-brand text-sm align-top mr-1">USD</span>
                                    {trek.price.replace('USD ', '')}
                                </div>
                                <Link to={`/expedition/${trek.id}`}>
                                    <button className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all">
                                        <ArrowRight size={18} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const Gallery = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    const images = [
        "/trekking_gallery_1_1769466393730.png",
        "/trekking_gallery_2_1769466407343.png",
        "/trekking_gallery_3_1769466420302.png",
        "/trekking_gallery_4_1769466432762.png",
        "/fit_roy_patagonia_trek_1769465333392.png",
        "/everest_base_camp_trek_1769465309368.png"
    ];

    const [startIndex, setStartIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const nextSlide = () => setStartIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setStartIndex((prev) => (prev - 1 + images.length) % images.length);

    const visibleImages = [];
    for (let i = 0; i < 4; i++) {
        visibleImages.push(images[(startIndex + i) % images.length]);
    }

    return (
        <section ref={ref} id="galería" className="min-h-screen w-full relative flex flex-col justify-center items-center overflow-hidden py-32 bg-slate-950">
            <div className="absolute inset-0 z-0 bg-mesh opacity-30"></div>

            <motion.div style={{ y: yParallax }} className="relative z-10 w-full container mx-auto px-6">
                <SectionTitle title="Explora" subtitle="Material Visual" />

                <div className="relative w-full max-w-7xl mx-auto h-[400px] md:h-[500px]">
                    <div className="flex gap-4 md:gap-8 h-full items-center justify-center">
                        <button onClick={prevSlide} className="flex absolute -left-4 md:-left-20 z-20 w-12 h-12 rounded-full glass-panel items-center justify-center text-white hover:bg-brand hover:border-brand transition-all">
                            <ArrowLeft size={20} />
                        </button>
                        <button onClick={nextSlide} className="flex absolute -right-4 md:-right-20 z-20 w-12 h-12 rounded-full glass-panel items-center justify-center text-white hover:bg-brand hover:border-brand transition-all">
                            <ArrowRight size={20} />
                        </button>

                        <AnimatePresence mode="popLayout">
                            {visibleImages.map((src, index) => (
                                <motion.div
                                    key={`${src}-${index}`}
                                    layoutId={`img-${src}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6 }}
                                    onClick={() => setSelectedImage(src)}
                                    className={`flex-1 h-full cursor-pointer relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl
                                        ${index > 0 ? 'hidden md:block' : ''} ${index > 2 ? 'lg:block hidden' : ''}
                                    `}
                                >
                                    <motion.img
                                        src={src}
                                        className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700"
                                        alt={`G-${index}`}
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="p-4 rounded-full glass-panel text-white">
                                            <Maximize2 size={32} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                        <motion.img
                            layoutId={`img-${selectedImage}`}
                            src={selectedImage}
                            className="max-w-[95vw] max-h-[90vh] rounded-3xl shadow-2xl border border-white/10"
                        />
                        <button className="absolute top-10 right-10 text-white hover:text-brand transition-colors">
                            <X size={48} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

// --- Footer Section ---
const Footer = () => {
    return (
        <footer id="contacto" className="w-full bg-slate-950 pt-32 pb-12 relative overflow-hidden border-t border-white/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Upper CTA Section */}
                <div className="glass-panel p-10 md:p-16 rounded-[40px] mb-24 flex flex-col lg:flex-row items-center justify-between gap-10 border border-white/10">
                    <div className="max-w-2xl text-center lg:text-left">
                        <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 leading-none">
                            ¿Listo para <span className="text-brand">despegar?</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-light">
                            Únete a la nueva era de expediciones inteligentes. Tecnología y montaña en perfecta sincronía.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <Link to="/register" className="w-full sm:w-auto">
                            <button className="premium-button w-full">EMPEZAR AHORA</button>
                        </Link>
                        <button className="px-8 py-4 rounded-full glass-panel text-white font-bold hover:bg-white/10 transition-all border border-white/10">
                            HABLAR CON EXPERTO
                        </button>
                    </div>
                </div>

                {/* Main Footer Links */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
                    <div className="col-span-2 lg:col-span-1 space-y-8">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full border border-white/20" />
                            <span className="text-xl font-black uppercase text-white tracking-tighter">VÉRTICE <span className="text-brand">FACTORY</span></span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            La primera factoría de expediciones de alto rendimiento fundamentada en el análisis de datos y seguridad satelital.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="h-10 w-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-brand hover:border-brand transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Producto</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            {['Expediciones', 'Dashboards', 'Seguridad 24/7', 'Analítica'].map(link => (
                                <li key={link} className="hover:text-white transition-colors cursor-pointer">{link}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Recursos</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            {['Guía de Alpinista', 'Mapas Offline', 'API Docs', 'Comunidad'].map(link => (
                                <li key={link} className="hover:text-white transition-colors cursor-pointer">{link}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6 lowercase">
                        <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em]">Contacto</h4>
                        <div className="space-y-4 text-slate-500 text-sm">
                            <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                                <MapPin size={16} className="text-brand" /> El Chaltén, Patagonia
                            </p>
                            <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                                <Mail size={16} className="text-brand" /> sky@verticeextremo.com
                            </p>
                            <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                                <Phone size={16} className="text-brand" /> +54 2902 491-XXX
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em]">
                        © 2026 Vértice Extremo · Todos los derechos reservados
                    </p>
                    <div className="flex gap-8 text-[10px] uppercase tracking-widest text-slate-600">
                        <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacidad</span>
                        <span className="hover:text-slate-400 cursor-pointer transition-colors">Términos</span>
                        <span className="hover:text-slate-400 cursor-pointer transition-colors">SLA</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Home = () => {
    return (
        <div className="bg-slate-950 text-white selection:bg-brand/30 selection:text-brand-300 min-h-screen">
            <Sidebar />
            
            {/* Main Sections Container - Content is now more immersive */}
            <main className="w-full transition-all duration-500 pt-20 md:pt-0">
                <Hero />
                <About />
                <Treks />
                <Gallery />
                <Footer />
            </main>
        </div>
    );
};

export default Home;
