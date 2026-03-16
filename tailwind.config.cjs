/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // SaaS Factory Premium Palette
                brand: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    DEFAULT: '#FF6B35', // Original primary but refined
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                slate: {
                    950: '#020617', // Deeper background
                },
                accent: {
                    glow: 'rgba(255, 107, 53, 0.4)',
                }
            },
            backgroundColor: {
                'dark-surface': '#011627',
                'dark-elevated': '#0a1d2e',
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'glow': 'glow 3s infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'border-spin': 'border-spin 7s linear infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(255, 107, 53, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.6)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'border-spin': {
                    '100%': { transform: 'rotate(-360deg)' },
                },
            },
            backgroundImage: {
                'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
                'mesh-gradient': "radial-gradient(at 0% 0%, rgba(255, 107, 53, 0.15) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(59, 130, 246, 0.15) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(255, 107, 53, 0.15) 0, transparent 50%)",
            }
        },
    },
    plugins: [],
}
