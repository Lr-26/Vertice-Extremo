
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Mountain, CheckCircle2, Play } from 'lucide-react';
import { expeditions } from '../data/expeditions';

const ExpeditionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const expedition = expeditions.find(e => e.id === id);
    const { scrollY } = useScroll();

    // Parallax and fade for hero image
    const yHero = useTransform(scrollY, [0, 600], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!expedition) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-dark text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Expedición no encontrada</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary underline hover:text-white transition-colors"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-950 min-h-screen text-white pb-32 selection:bg-brand/30 selection:text-brand-300">
            {/* Fixed Navigation/Back Button - Optimized for SaaS */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950 to-transparent pointer-events-none">
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 p-4 rounded-full hover:bg-brand hover:border-brand transition-all duration-300 group shadow-2xl"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform text-white" />
                </button>
                <div className="pointer-events-auto bg-brand/10 backdrop-blur-xl border border-brand/20 px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] text-brand shadow-2xl animate-glow">
                    Expedición Activa
                </div>
            </div>

            {/* Hero Section - Tall and Immersive */}
            <div className="relative h-[90vh] w-full overflow-hidden">
                <motion.div
                    style={{ y: yHero, opacity: opacityHero }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={expedition.heroImage}
                        alt={expedition.title}
                        className="w-full h-full object-cover filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full z-10 p-6 md:p-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex gap-4 mb-6">
                            <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-sm border border-primary/20">
                                {expedition.level}
                            </span>
                            <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-2">
                                <Calendar size={14} /> {expedition.duration}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">
                            {expedition.title}
                        </h1>
                        <p className="text-xl md:text-3xl font-light text-gray-300 tracking-wide border-l-4 border-primary pl-6">
                            {expedition.subtitle}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Grid - Total isolation with massive top-shadow mask and higher Z-index */}
            <div className="relative z-[30] bg-slate-950 shadow-[0_-150px_200px_rgba(2,6,23,1)]">
                <div className="container mx-auto px-6 pt-64 pb-48">
                    <div className="grid md:grid-cols-12 gap-20">

                    {/* Main Info */}
                    <div className="md:col-span-8 space-y-16">
                        <section>
                            <h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-4 font-outfit">
                                <span className="w-12 h-[2px] bg-brand"></span>
                                La Experiencia
                            </h3>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                                {expedition.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                {expedition.highlights.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                                        <CheckCircle2 className="text-primary shrink-0 mt-1" />
                                        <span className="text-gray-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="relative rounded-3xl overflow-hidden group">
                            <h3 className="text-3xl font-bold uppercase mb-6 flex items-center gap-4">
                                <span className="w-8 h-1 bg-primary"></span>
                                Video
                            </h3>
                            <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <video
                                    src={expedition.video}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                        <Play className="fill-white text-white ml-1" size={32} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black uppercase mb-10 flex items-center gap-4 font-outfit">
                                <span className="w-12 h-[2px] bg-brand"></span>
                                Itinerario Técnico
                            </h3>
                            <div className="space-y-8 border-l border-white/10 ml-4 pl-8 md:pl-12">
                                {expedition.itinerary.map((day, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[calc(2rem_+_5px)] md:-left-[calc(3rem_+_5px)] w-2 h-2 rounded-full bg-primary ring-4 ring-dark"></div>
                                        <span className="text-sm font-bold text-primary uppercase tracking-widest block mb-1">Día {day.day}</span>
                                        <h4 className="text-xl font-bold text-white mb-2">{day.title}</h4>
                                        <p className="text-gray-400">{day.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Sticky Booking - Ultra-low positioning requested */}
                    <div className="md:col-span-4 relative mt-20 md:mt-0">
                        <div className="md:sticky md:top-72 bg-slate-900 border border-white/5 p-12 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-10">
                            <div className="mb-12 text-center md:text-left">
                                <span className="text-[10px] text-brand/60 uppercase tracking-[0.5em] font-black block mb-4">Inversión Expedición</span>
                                <div className="text-5xl font-black text-white font-outfit">
                                    <span className="text-brand text-sm align-top mr-1">USD</span>
                                    {expedition.price.replace('USD ', '')}
                                </div>
                            </div>

                            <div className="space-y-8 mb-12">
                                <div className="flex items-center gap-5 text-slate-400 group">
                                    <div className="w-10 h-10 rounded-2xl glass-panel flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">{expedition.location}</span>
                                </div>
                                <div className="flex items-center gap-5 text-slate-400 group">
                                    <div className="w-10 h-10 rounded-2xl glass-panel flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                                        <Calendar size={20} />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">Próximas salidas: Oct - Mar</span>
                                </div>
                                <div className="flex items-center gap-5 text-slate-400 group">
                                    <div className="w-10 h-10 rounded-2xl glass-panel flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                                        <Mountain size={20} />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">Dificultad: {expedition.level}</span>
                                </div>
                            </div>

                            <button className="premium-button w-full py-6 group">
                                <span className="flex items-center justify-center gap-3">
                                    RESERVAR CUPO <CheckCircle2 size={20} className="group-hover:rotate-12 transition-transform" />
                                </span>
                            </button>
                            <p className="text-center text-[10px] text-slate-500 mt-6 leading-relaxed uppercase tracking-widest font-medium">
                                * Protocolo de seguridad incluido
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {expedition.gallery.slice(0, 4).map((img, i) => (
                                <img key={i} src={img} className="rounded-xl aspect-square object-cover border border-white/5 opacity-60 hover:opacity-100 transition-opacity" alt="" />
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpeditionDetail;
