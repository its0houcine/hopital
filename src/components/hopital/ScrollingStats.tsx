'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, UserPlus, Calendar } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: string;
  positive: boolean;
  color: string;
  delay: number;
}

const StatCard = ({ icon, title, value, change, positive, color, delay }: StatCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={`flex-shrink-0 w-80 h-40 rounded-xl shadow-lg overflow-hidden ${color} p-6 mx-4`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <motion.div 
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, delay: delay * 0.2 + 0.2 }}
        >
          {value}
        </motion.div>
        <div className={`flex items-center mt-2 ${positive ? 'text-green-200' : 'text-red-200'}`}>
          <span className="text-sm">{change}</span>
          <motion.svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: delay * 0.2 + 0.4 }}
          >
            <path 
              d={positive ? "M10 4l-1.41 1.41L11.17 8H4v2h7.17l-2.58 2.59L10 14l6-6-6-6z" : "M10 16l1.41-1.41L8.83 12H16v-2H8.83l2.58-2.59L10 6l-6 6 6 6z"} 
              fill="currentColor" 
              transform={positive ? "rotate(90 10 10)" : "rotate(-90 10 10)"}
            />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
};

export default function ScrollingStats() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [stats, setStats] = useState({
    visites: { value: 0, change: '+0%' },
    medecins: { value: 0, change: '+0%' },
    temps: { value: 0, change: '+0%' },
    patients: { value: 0, change: '+0%' }
  });

  // Simuler le chargement des données
  useEffect(() => {
    // Dans un cas réel, ces données viendraient d'une API
    const fetchData = async () => {
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        visites: { value: 245, change: '+12%' },
        medecins: { value: 18, change: '+5%' },
        temps: { value: 28, change: '-7%' },
        patients: { value: 156, change: '+23%' }
      });
    };
    
    fetchData();
  }, []);

  // Effet d'auto-scroll
  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;
    
    const scrollContainer = scrollRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    let animationId: number;
    let direction = 1;
    let position = scrollPosition;
    
    const animate = () => {
      if (!scrollRef.current) return;
      
      position += 0.5 * direction;
      
      if (position >= maxScroll) {
        direction = -1;
      } else if (position <= 0) {
        direction = 1;
      }
      
      scrollRef.current.scrollLeft = position;
      setScrollPosition(position);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [autoScroll, scrollPosition]);

  // Arrêter l'auto-scroll lorsque l'utilisateur interagit avec le conteneur
  const handleMouseEnter = () => setAutoScroll(false);
  const handleMouseLeave = () => setAutoScroll(true);
  const handleScroll = () => {
    if (!scrollRef.current) return;
    setScrollPosition(scrollRef.current.scrollLeft);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Statistiques en temps réel</h2>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto py-6 scrollbar-hide"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onScroll={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex px-4">
          <StatCard
            icon={<Calendar className="text-white" size={24} />}
            title="Visites par jour"
            value={stats.visites.value}
            change={stats.visites.change}
            positive={true}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            delay={0}
          />
          
          <StatCard
            icon={<Users className="text-white" size={24} />}
            title="Médecins enregistrés"
            value={stats.medecins.value}
            change={stats.medecins.change}
            positive={true}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            delay={1}
          />
          
          <StatCard
            icon={<Clock className="text-white" size={24} />}
            title="Temps moyen de consultation"
            value={`${stats.temps.value} min`}
            change={stats.temps.change}
            positive={false}
            color="bg-gradient-to-r from-green-500 to-green-600"
            delay={2}
          />
          
          <StatCard
            icon={<UserPlus className="text-white" size={24} />}
            title="Nouveaux patients par jour"
            value={stats.patients.value}
            change={stats.patients.change}
            positive={true}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
            delay={3}
          />
          
          {/* Répéter les cartes pour créer un effet de défilement infini */}
          <StatCard
            icon={<Calendar className="text-white" size={24} />}
            title="Visites par jour"
            value={stats.visites.value}
            change={stats.visites.change}
            positive={true}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            delay={4}
          />
          
          <StatCard
            icon={<Users className="text-white" size={24} />}
            title="Médecins enregistrés"
            value={stats.medecins.value}
            change={stats.medecins.change}
            positive={true}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            delay={5}
          />
        </div>
      </div>
      
      {/* Indicateurs de défilement */}
      <div className="flex justify-center pb-4 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`h-1 rounded-full ${
              scrollPosition > i * 300 && scrollPosition < (i + 1) * 300
                ? 'w-6 bg-blue-500'
                : 'w-2 bg-gray-300'
            }`}
            animate={{
              width: scrollPosition > i * 300 && scrollPosition < (i + 1) * 300 ? 24 : 8,
              backgroundColor: scrollPosition > i * 300 && scrollPosition < (i + 1) * 300 
                ? 'var(--color-elhassi1)' 
                : '#d1d5db'
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
