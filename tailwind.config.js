/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
   safelist: [
    'transition-transform',
    'duration-300',
    'ease-in-out',
    'hover:scale-105'
  ],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				// Enhanced color palette
				orange: {
					50: '#fff7ed',
					100: '#ffedd5',
					200: '#fed7aa',
					300: '#fdba74',
					400: '#fb923c',
					500: '#f97316', // Primary orange
					600: '#ea580c',
					700: '#c2410c',
					800: '#9a3412',
					900: '#7c2d12',
				},
				amber: {
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
				},
				saffron: {
					50: '#fff8e1',
					100: '#ffecb3',
					200: '#ffe082',
					300: '#ffd54f',
					400: '#ffcc02',
					500: '#ff9933', // Saffron
					600: '#ff8f00',
					700: '#ff6f00',
					800: '#e65100',
					900: '#bf360c',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			animation: {
				'gradient-shift': 'gradient-shift 3s ease-in-out infinite alternate',
				'gradient-flow': 'gradient-flow 3s ease infinite',
				'float-spiritual': 'float-spiritual 20s infinite linear',
				'pulse-glow': 'pulse-glow 2s infinite',
				'count-up': 'countUp 0.8s ease-out',
				'slide-in-up': 'slideInUp 0.6s ease-out',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				'gradient-shift': {
					'0%': { 'background-position': '0% 50%' },
					'100%': { 'background-position': '100% 50%' },
				},
				'gradient-flow': {
					'0%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' },
					'100%': { 'background-position': '0% 50%' },
				},
				'float-spiritual': {
					'0%': { 
						transform: 'translateY(100vh) rotate(0deg) scale(0.5)',
						opacity: '0'
					},
					'10%': { opacity: '0.3' },
					'90%': { opacity: '0.3' },
					'100%': { 
						transform: 'translateY(-100px) rotate(360deg) scale(1)',
						opacity: '0'
					},
				},
				'pulse-glow': {
					'0%, 100%': { 'box-shadow': '0 2px 8px rgba(255, 107, 53, 0.3)' },
					'50%': { 'box-shadow': '0 4px 16px rgba(255, 107, 53, 0.5)' },
				},
				'countUp': {
					'from': { 
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'to': { 
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'slideInUp': {
					'from': { 
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'to': { 
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			backdropBlur: {
				xs: '2px',
			},
			textShadow: {
				'sm': '1px 1px 2px rgba(0, 0, 0, 0.5)',
				'DEFAULT': '2px 2px 4px rgba(0, 0, 0, 0.5)',
				'lg': '3px 3px 6px rgba(0, 0, 0, 0.7)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
