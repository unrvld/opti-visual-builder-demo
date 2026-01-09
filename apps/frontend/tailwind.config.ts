import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    colors: {
      'white': '#ffffff',
      'ghost-white': '#F8F8FC',
      'light-grey': '#D9D9D9',
      'azure': '#007EFC',
      'verdansk': '#6AF388',
      'people-eater': '#9847FF',
      'paleruby': '#EB5A79',
      'tangy': '#FFAA47',
      'vulcan': '#10141D',
      'vulcan-85': '#2C313F',
      'independence': '#484F61',
      'mischka': '#CED2DC',
      'pale-sky': '#656C81',
      'currentColor': 'currentColor',
      'transparent': 'transparent',
      'inherit': 'inherit',
      // POC
      'grey' : {
        200: '#F0F5F6',
        300: '#DCE5E7',
        400: '#A2B3B6',
        500: '#2A3E42',
        600: '#162224',
      },
      'red' : {
        400: '#E0384E',
        500: '#C22338'
      }
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit',
            'h1': { color: 'inherit' },
            'h2': { color: 'inherit' },
            'h3': { color: 'inherit' },
            'h4': { color: 'inherit' },
            'h5': { color: 'inherit' },
            'h6': { color: 'inherit' },
            '.dark strong':{ color: 'var(--ghost-white)' },
          },
        },
      },
      spacing: {
        'spacing-00': 'var(--spacing-00)',
        'spacing-1px': 'var(--spacing-1px)',
        'spacing-0_25': 'var(--spacing-0_25)',
        'spacing-0_5': 'var(--spacing-0_5)',
        'spacing-1': 'var(--spacing-1)',
        'spacing-1_5': 'var(--spacing-1_5)',
        'spacing-2': 'var(--spacing-2)',
        'spacing-3': 'var(--spacing-3)',
        'spacing-4': 'var(--spacing-4)',
        'spacing-5': 'var(--spacing-5)',
        'spacing-6': 'var(--spacing-6)',
        'spacing-7': 'var(--spacing-7)',
        'section-gap-00': 'var(--section-gap-00)',
        'section-gap-compact': 'var(--section-gap-compact)',
        'section-gap-default': 'var(--section-gap-default)',
        'section-gap-extended': 'var(--section-gap-extended)',
      },
      fontFamily: {
        inter: 'var(--font-inter)'
      }
    }
  },
  safelist: [
    'w-screen',
    'w-full',
    'w-auto',
    'w-1/2',
    'w-1/3',
    'basis-full',
    'basis-auto',
    'basis-1/2',
    'basis-1/3',
    't-center',
    'flex-row',
    'flex-col',
    'flex-row-reverse',
    'flex-col-reverse',
    'opti-content-area',
    'opti-content-area-item'
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    function ({ addBase, theme }: { addBase: any; theme: any }) {
      function extractColorVars(colorObj: Record<string, string>, colorGroup = ''): Record<string, string> {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable = colorKey === "DEFAULT" ? `-${colorGroup}` : `-${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
};
export default config;
