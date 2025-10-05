/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Ajoutez ici vos domaines d'images
    formats: ['image/avif', 'image/webp'], // Formats d'image modernes
  },
  // Optimisation du chargement initial - mise à jour pour Next.js 15
  experimental: {
    // Suppression de fontLoaders qui n'est plus supporté
    optimizePackageImports: ['@headlessui/react', '@fullcalendar/react'],
  },
  // swcMinify est maintenant activé par défaut dans Next.js 15
  compiler: {
    // Optimisations du compilateur
    removeConsole: process.env.NODE_ENV === 'production', // Supprimer les console.log en production
  },
  // Optimisations pour améliorer les performances
  webpack: (config) => {
    // Ajout du support SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Configuration des chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
    };

    // Optimiser la mise en cache
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    };

    return config;
  },
  // Optimisation du chargement des pages
  onDemandEntries: {
    maxInactiveAge: 24 * 60 * 60 * 1000,
    pagesBufferLength: 20,
  },
  // Ajout pour gérer les packages externes côté serveur
  serverExternalPackages: ['@prisma/client', 'bcrypt'],
};

module.exports = nextConfig;
