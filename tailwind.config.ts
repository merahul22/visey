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
        inter: ['Inter', 'sans-serif'],
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
          '100': '#F8DEE6',
          '200': '#F1BDCE',
          '300': '#EA9CB5',
          '400': '#E27C9D',
          '500': '#DB5B84',
          '600': '#D43A6C',
          '700': '#A1234C',
          '800': '#851d3F',
          '900': '#691731',
          '1000': '#4D1124',
          DEFAULT: '#BD2959',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          '100': '#F8DEE6',
          '200': '#F8DEE6',
          '300': '#EA9CB5',
          '400': '#E27C9D',
          '500': '#DB5B84',
          '600': '#D43A6C',
          '700': '#A1234C',
          '800': '#851D3F',
          '900': '#691731',
          '1000': '#4D1124',
          DEFAULT: '#F8DEE6',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        neutrals: {
          '100': '#FAFAFA',
          '200': '#E6E6E6',
          '300': '#D3D3D3',
          '400': '#BFBFBF',
          '500': '#ACACAC',
          '600': '#989898',
          '700': '#858585',
          '800': '#717171',
          '900': '#5E5E5E',
          '1000': '#4A4A4A',
        },
        success: {
          '100': '#AAF2BC',
          '200': '#54E478',
          '300': '#148330',
        },
        warning: {
          '100': '#F9E8C9',
          '200': '#F3D094',
          '300': '#CE8C17',
        },
        error: {
          '100': '#F5BCBC',
          '200': '#EC7979',
          '300': '#AB1919',
        },
        'base-white': '#FAFAFA',
        'base-black': '#232323',
        'base-success': '#1DB944',
        'base-warning': '#EDB95E',
        'base-error': '#E23636',
        'base-primary': '#BD2959',
        'base-secondary': '#F8DEE6',
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
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
