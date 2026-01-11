
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import IphoneScrollExplode from './components/IphoneScrollExplode';
import LoadingScreen from './components/LoadingScreen';
import StorePage from './components/StorePage';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'landing' | 'store'>('landing');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
    const gridX = useTransform(springX, [-0.5, 0.5], [20, -20]);
    const gridY = useTransform(springY, [-0.5, 0.5], [20, -20]);

    useEffect(() => {
        // منع التمرير في المتجر أو أثناء التحميل
        document.body.style.overflow = (isLoading || view === 'store') ? 'hidden' : 'auto';

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth) - 0.5);
            mouseY.set((e.clientY / window.innerHeight) - 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isLoading, view, mouseX, mouseY]);

    return (
        <div className={`relative w-full min-h-screen selection:bg-cyan-500 selection:text-black overflow-x-hidden transition-colors duration-700 ${view === 'store' ? 'bg-[#b0b0b0]' : 'bg-black'}`} dir="rtl">
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading" />}

                {view === 'landing' ? (
                    <motion.div
                        key="landing-view"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <IphoneScrollExplode onLoaded={() => setIsLoading(false)} />

                        <section className="relative z-20 h-screen flex flex-col items-center justify-center bg-black px-6 perspective-2000">
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-black to-purple-950/40 opacity-60"></div>
                                <motion.div style={{ x: gridX, y: gridY }} className="absolute inset-0 opacity-20">
                                    <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                                </motion.div>
                                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[180px] rounded-full animate-float"></div>
                            </div>

                            <motion.div style={{ rotateX, rotateY }} className="relative z-10 text-center transform-style-3d cursor-default">
                                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-cyan-400 text-xl md:text-3xl font-medium mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                    أهلاً بك في مستقبل التقنية
                                </motion.p>

                                <h1 className="text-8xl md:text-[16rem] font-black tracking-tighter mb-12 select-none leading-tight">
                                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-300 to-neutral-600 block transform-gpu"
                                        style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                        سمارت فون
                                    </span>
                                </h1>

                                <div className="flex justify-center mt-2">
                                    <motion.button
                                        onClick={() => setView('store')}
                                        whileHover={{ scale: 1.1, rotateY: 10, boxShadow: "0 25px 60px rgba(6, 182, 212, 0.6)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative px-24 py-8 rounded-2xl text-white font-bold text-3xl overflow-hidden bg-white/5 backdrop-blur-3xl border border-white/20 transition-all duration-500 shadow-2xl"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        <span className="relative z-10 flex items-center gap-8">
                                            تصفح المتجر
                                            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center group-hover:bg-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                                                <svg className="w-8 h-8 text-black group-hover:text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </section>
                    </motion.div>
                ) : (
                    <StorePage key="store-view" onBack={() => setView('landing')} />
                )}
            </AnimatePresence>

            <style>{`
        .perspective-2000 { perspective: 2000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -60px) scale(1.1); }
        }
        .animate-float { animation: float 15s infinite ease-in-out; }
      `}</style>
        </div>
    );
};

export default App;
