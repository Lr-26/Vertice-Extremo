
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, Mail, Phone, Instagram, Twitter, Youtube, ArrowLeft, ArrowRight, Menu, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { expeditions } from '../data/expeditions';

// --- Shared Components ---

const SectionTitle = ({ title, subtitle, align = 'center' }) => (
    <div className={`mb-12 text-${align} z-10 relative`}>
        <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
        >
            {title}
        </motion.h2>
        <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`h-2 bg-primary mx-auto mb-6`}
        />
        <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-primary font-light tracking-[0.3em] uppercase"
        >
            {subtitle}
        </motion.p>
    </div>
);

// --- Navbar ---
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className={`fixed w-full z-50 top-0 left-0 px-6 py-4 bg-[#011627]/80 backdrop-blur-lg border-b border-white/5 transition-all text-white`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase relative z-50">
                    VÉRTICE<span className="text-primary">EXTREMO</span>
                </div>

                <ul className="hidden md:flex space-x-12 font-bold text-sm tracking-widest uppercase items-center">
                    {['Inicio', 'Nosotros', 'Expediciones', 'Galería', 'Contacto'].map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} className="relative group overflow-hidden block py-2">
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">{item}</span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </a>
                        </li>
                    ))}
                    <Link to="/register">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#011627" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all"
                        >
                            UNIRSE
                        </motion.button>
                    </Link>
                </ul>

                <button
                    className="md:hidden z-50 relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 20 }}
                        className="fixed inset-0 bg-dark z-40 flex flex-col justify-center items-center gap-8"
                    >
                        {['Inicio', 'Nosotros', 'Expediciones', 'Galería', 'Contacto'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-4xl font-black uppercase text-white hover:text-primary transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

// --- Hero Section ---
const Hero = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const yFloat1 = useTransform(scrollYProgress, [0, 1], ['0%', '-100px']);
    const yFloat2 = useTransform(scrollYProgress, [0, 1], ['0%', '-200px']);

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
        <section id="inicio" className="h-screen w-full flex items-center justify-center overflow-hidden relative snap-start bg-dark">
            {/* Main Background Layer */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={heroImages[currentImageIndex]}
                        alt="Hero Background"
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover filter brightness-50"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark"></div>
            </motion.div>

            {/* Floating Parallax Elements (Images) */}
            <motion.div
                style={{ y: yFloat1, x: -50 }}
                className="absolute top-[20%] left-[5%] z-0 hidden lg:block opacity-40 pointer-events-none"
            >
                <img
                    src="/everest_base_camp_trek_1769465309368.png"
                    className="w-[300px] h-[200px] object-cover rounded-2xl shadow-2xl -rotate-6 filter grayscale hover:grayscale-0 transition-all duration-500"
                    alt="Decorative 1"
                />
            </motion.div>

            <motion.div
                style={{ y: yFloat2, x: 50 }}
                className="absolute bottom-[20%] right-[5%] z-0 hidden lg:block opacity-40 pointer-events-none"
            >
                <img
                    src="/fitz_roy_patagonia_trek_1769465333392.png"
                    className="w-[350px] h-[250px] object-cover rounded-2xl shadow-2xl rotate-6 filter grayscale hover:grayscale-0 transition-all duration-500"
                    alt="Decorative 2"
                />
            </motion.div>

            <div className="relative z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8, letterSpacing: '0em' }}
                    animate={{ opacity: 1, scale: 1, letterSpacing: '-0.02em' }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="text-6xl md:text-9xl font-black leading-none mb-6 uppercase"
                >
                    Sin <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Límites</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-light tracking-wide"
                >
                    Donde el cielo toca la tierra, comienza tu aventura.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col items-center gap-8"
                >
                    <motion.button
                        onClick={scrollToTreks}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,107,53,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-12 py-6 bg-white overflow-hidden rounded-full shadow-[0_0_50px_rgba(255,107,53,0.3)] transition-all duration-300"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 font-black text-xl uppercase tracking-[0.2em] text-dark group-hover:text-white transition-colors duration-300">
                            Ver Expediciones
                        </span>
                    </motion.button>

                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                        onClick={scrollToTreks}
                    >
                        <span className="text-[10px] uppercase tracking-widest text-white/50">Explorar</span>
                        <ChevronDown className="text-primary" size={32} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

// --- About Section ---
const About = () => {
    return (
        <section id="nosotros" className="min-h-[80vh] w-full bg-dark flex flex-col justify-center relative snap-start px-6 md:px-20 py-24 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full"></div>
            </div>

            <SectionTitle title="Nosotros" subtitle="Pasión por la Montaña" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto relative z-10 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight">
                        Más que guías, <br />
                        <span className="text-primary">Somos Exploradores</span>
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                        Desde 2010, Vértice Extremo ha estado a la vanguardia del turismo de aventura en la Patagonia y el mundo. Nacimos de la simple idea de que la verdadera conexión con la naturaleza ocurre cuando salimos de nuestra zona de confort.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                        Nuestro equipo está formado por alpinistas de élite, biólogos y fotógrafos apasionados por compartir los rincones más remotos del planeta con seguridad, respeto y adrenalina.
                    </p>

                    <div className="grid grid-cols-3 gap-4 mt-8 border-t border-white/10 pt-8">
                        <div>
                            <h4 className="text-4xl font-black text-white mb-2">15+</h4>
                            <p className="text-sm text-gray-400 uppercase tracking-widest">Años de Exp.</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-black text-white mb-2">50+</h4>
                            <p className="text-sm text-gray-400 uppercase tracking-widest">Expediciones</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-black text-white mb-2">2k+</h4>
                            <p className="text-sm text-gray-400 uppercase tracking-widest">Aventureros</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[600px] rounded-3xl overflow-hidden group"
                >
                    <img
                        src="/trekking_gallery_2_1769466407343.png"
                        alt="Nuestro Equipo"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>

                    <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                                V
                            </div>
                            <div>
                                <h5 className="font-bold text-white uppercase tracking-wider">Filosofía Vértice</h5>
                                <p className="text-xs text-gray-300">Respeto. Seguridad. Superación.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Treks Section ---
const Treks = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yBg = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const yTitle = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Usando los datos de importados
    const activeTreks = expeditions;

    return (

        <section ref={ref} id="expediciones" className="h-screen w-full bg-dark flex flex-col justify-center relative snap-start px-6 md:px-20 overflow-hidden">
            <motion.div style={{ y: yBg }} className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none"></motion.div>

            <motion.div style={{ y: yTitle }} className="relative z-10">
                <SectionTitle title="Expediciones" subtitle="Desafía lo Imposible" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto h-[50vh] md:h-[60vh]">
                {activeTreks.map((trek, i) => (
                    <motion.div
                        key={trek.id}
                        initial={{ opacity: 0, y: 50, rotateX: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
                        whileHover={{ y: -15, transition: { duration: 0.4, ease: "easeOut" } }}
                        className="h-full perspective-1000 relative group"
                    >
                        {/* Glowing Border Gradient */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-orange-600 rounded-3xl opacity-0 group-hover:opacity-75 blur transition duration-500"></div>

                        <Link to={`/expedition/${trek.id}`} className="block h-full relative rounded-3xl overflow-hidden cursor-pointer shadow-xl bg-dark border border-white/10">
                            <div className="absolute inset-0 bg-gray-900 transition-all duration-500 group-hover:scale-110">
                                <img src={trek.heroImage} alt={trek.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-500" />
                            </div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 text-primary"
                                    >
                                        {trek.level}
                                    </motion.span>
                                </div>

                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase mb-2 leading-none">{trek.title}</h3>
                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 border-t border-white/20 pt-4 mt-4">
                                        <span className="text-2xl font-bold text-primary">{trek.price}</span>
                                        <div className="flex items-center gap-2 text-white font-bold tracking-widest uppercase text-sm group-hover:gap-4 transition-all">
                                            <span>Ver Más</span>
                                            <ArrowRight className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// --- Gallery Section ---
const Gallery = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    const images = [
        "/trekking_gallery_1_1769466393730.png",
        "/trekking_gallery_2_1769466407343.png",
        "/trekking_gallery_3_1769466420302.png",
        "/trekking_gallery_4_1769466432762.png",
        "/fitz_roy_patagonia_trek_1769465333392.png",
        "/everest_base_camp_trek_1769465309368.png"
    ];

    const [startIndex, setStartIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const nextSlide = () => {
        setStartIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setStartIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Get strictly 4 visible images based on order
    const visibleImages = [];
    for (let i = 0; i < 4; i++) {
        visibleImages.push(images[(startIndex + i) % images.length]);
    }

    return (
        <section ref={ref} id="galería" className="h-screen w-full relative flex flex-col justify-center items-center overflow-hidden snap-start bg-black">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40 scale-105"
                >
                    <source src="/bg_mountains.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/50 to-dark/90"></div>
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
            </div>

            <motion.div style={{ y: yParallax }} className="relative z-10 w-full container mx-auto px-6">
                <SectionTitle title="Momentos" subtitle="Capturando la Aventura" />

                <div className="relative w-full max-w-6xl mx-auto h-[400px]">
                    <div className="flex gap-4 md:gap-8 h-full items-center justify-center">
                        {/* Custom Navigation */}
                        <button onClick={prevSlide} className="hidden md:flex absolute -left-16 z-20 w-12 h-12 rounded-full border border-white/20 items-center justify-center hover:bg-primary hover:border-primary transition-all">
                            <ArrowLeft />
                        </button>
                        <button onClick={nextSlide} className="hidden md:flex absolute -right-16 z-20 w-12 h-12 rounded-full border border-white/20 items-center justify-center hover:bg-primary hover:border-primary transition-all">
                            <ArrowRight />
                        </button>

                        <AnimatePresence mode="popLayout">
                            {visibleImages.map((src, index) => (
                                <motion.div
                                    key={`${src}-${index}`} // Unique key for animation
                                    layoutId={`img-${src}`}
                                    initial={{ opacity: 0, scale: 0.8, x: 50, rotateY: 15 }}
                                    animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: -50, rotateY: -15, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                                    whileHover={{
                                        scale: 1.05,
                                        zIndex: 10,
                                        transition: { duration: 0.2 }
                                    }}
                                    onClick={() => setSelectedImage(src)}
                                    className="flex-1 h-full cursor-pointer relative group rounded-2xl overflow-hidden border border-white/10 hover:border-primary/80 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(255,107,53,0.3)]"
                                >
                                    <motion.img
                                        src={src}
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                                        alt={`G-${index}`}
                                        whileHover={{ scale: 1.15 }} // Zoom interno de la imagen
                                        transition={{ duration: 0.7 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-primary/20 backdrop-blur-md p-4 rounded-full border border-primary/50 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                            <Maximize2 className="text-white drop-shadow-lg" size={32} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
                    >
                        <motion.img
                            layoutId={`img-${selectedImage}`}
                            src={selectedImage}
                            className="max-w-full max-h-full rounded-lg shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                            <X size={40} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

// --- Footer Section ---
// --- Footer Section ---
// --- Footer Section ---
const Footer = () => {
    return (
        <footer id="contacto" className="h-[60vh] md:h-screen w-full bg-dark flex flex-col justify-center items-center snap-start relative px-6 border-t border-white/5 overflow-hidden">
            {/* Map Background - Interactive */}
            <div className="absolute inset-0 z-0 text-center">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23820.7624536653!2d-72.88603649999999!3d-49.33160495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb266580e0a5311%3A0x6713917457497d4c!2sEl%20Chalt%C3%A9n%2C%20Santa%20Cruz!5e0!3m2!1ses!2sar!4v1706040000000!5m2!1ses!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(100%) contrast(100%)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity duration-700"
                    title="Mapa Interactivo"
                ></iframe>

                {/* Gradient overlay that allows clicks to pass through to map where not covered by content */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent pointer-events-none z-0"></div>
            </div>

            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 pointer-events-none">
                {/* Content wrapper with pointer-events-auto for buttons/text interaction */}
                <div className="text-center md:text-left pointer-events-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-2xl"
                    >
                        Únete al <br /><span className="text-primary">Vértice</span>
                    </motion.h2>
                    <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start">
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,107,53,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white text-xl font-bold px-10 py-5 rounded-full shadow-lg transition-all block w-full md:w-auto text-center"
                            >
                                Reservar Ahora
                            </motion.button>
                        </Link>
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
                                whileTap={{ scale: 0.95 }}
                                className="border border-white/20 text-white text-xl font-bold px-10 py-5 rounded-full backdrop-blur-md transition-all block w-full md:w-auto text-center"
                            >
                                Contáctanos
                            </motion.button>
                        </Link>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8 glass-morphism p-10 rounded-3xl pointer-events-auto backdrop-blur-xl bg-black/40 border border-white/10 hover:border-white/20 transition-colors"
                >
                    <div className="flex items-center gap-6 group">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <MapPin />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest group-hover:text-primary transition-colors">Base Camp</h4>
                            <p className="text-xl font-medium">El Chaltén, Patagonia Argentina</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Mail />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest group-hover:text-primary transition-colors">Consultas</h4>
                            <p className="text-xl font-medium">aventura@verticeextremo.com</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 w-full text-center text-white/20 text-xs font-bold tracking-[0.3em] uppercase pointer-events-none">
                © 2026 Vértice Extremo. All rights reserved.
            </div>
        </footer>
    );
};

const Home = () => {
    return (
        <div className="bg-dark text-white selection:bg-primary selection:text-white">
            <Navbar />

            {/* Main Sections Container */}
            <main className="w-full">
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
