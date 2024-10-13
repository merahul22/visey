import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        linkBlue: '#005CC0',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          '100': '#FDE6E9',
          '200': '#F1B0BE',
          '300': '#E48A9A',
          '400': '#E22C64',
          '500': '#D40A57',
          '600': '#BC0A4C',
          '700': '#A11A3E',
          '800': '#851d37',
          '900': '#691731',
          '1000': '#46112A',
          DEFAULT: '#BD2959',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          '100': '#F7E7EB',
          '200': '#F4D1E7',
          '300': '#EC7D9E',
          '400': '#CC2D6A',
          '500': '#BC1C6F',
          '600': '#A12A6D',
          '700': '#97104A',
          '800': '#6E013B',
          '900': '#AA4E6D',
          '1000': '#522943',
          DEFAULT: '#AAB9C5',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        neutrals: {
          '100': '#F1F1F1',
          '200': '#E6E6E6',
          '300': '#D3D3D3',
          '400': '#BEBEBE',
          '500': '#A6A6A6',
          '600': '#858585',
          '700': '#717171',
          '800': '#5d5d5d',
          '900': '#4a4a4a',
          '1000': '#373737',
        },
        success: {
          DEFAULT: '1DB944',
          '100': '#AAF2C5',
          '200': '#56D47A',
          '300': '#14A853',
        },
        warning: {
          DEFAULT: 'EDB95E',
          '100': '#FFE9C7',
          '200': '#FDBD69',
          '300': '#E6A13F',
        },
        error: {
          DEFAULT: 'E23636',
          '100': '#FFE0DD',
          '200': '#FC8075',
          '300': '#D33330',
        },
        'base-white': '#FAFAFA',
        'base-black': '#232323',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
export default config;
