
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

    // Parallax for hero image
    const yHero = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0.5]);

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
        <div className="bg-dark min-h-screen text-white pb-20">
            {/* Fixed Navigation/Back Button */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 group"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div className="pointer-events-auto bg-primary/90 backdrop-blur-md px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg shadow-orange-500/20">
                    Reservar
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <motion.div
                    style={{ y: yHero, opacity: opacityHero }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={expedition.heroImage}
                        alt={expedition.title}
                        className="w-full h-full object-cover filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
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

            {/* Content Grid */}
            <div className="container mx-auto px-6 mt-12 md:mt-24 relative z-20">
                <div className="grid md:grid-cols-12 gap-12">

                    {/* Main Info */}
                    <div className="md:col-span-8 space-y-16">
                        <section>
                            <h3 className="text-3xl font-bold uppercase mb-6 flex items-center gap-4">
                                <span className="w-8 h-1 bg-primary"></span>
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
                            <h3 className="text-3xl font-bold uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-1 bg-primary"></span>
                                Itinerario
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

                    {/* Sidebar / Sticky Booking */}
                    <div className="md:col-span-4">
                        <div className="sticky top-24 bg-[#011627] border border-white/10 p-8 rounded-3xl shadow-xl">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-sm text-gray-400 uppercase tracking-widest block mb-1">Precio por persona</span>
                                    <span className="text-4xl font-black text-white">{expedition.price}</span>
                                </div>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <MapPin className="text-primary" />
                                    <span>{expedition.location}</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <Calendar className="text-primary" />
                                    <span>Próximas salidas: Oct - Mar</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <Mountain className="text-primary" />
                                    <span>Dificultad: {expedition.level}</span>
                                </div>
                            </div>

                            <button className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl uppercase tracking-wider transition-colors shadow-[0_0_30px_rgba(255,107,53,0.3)]">
                                Reservar Cupo
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
                                *Cupos limitados. Se requiere depósito del 30% para confirmar.
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
    );
};

export default ExpeditionDetail;
