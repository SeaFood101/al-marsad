/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Zone color classes - prevent purging
    'bg-red-600/50',
    'border-red-300',
    'text-red-100',
    'bg-blue-600/50',
    'border-blue-300',
    'text-blue-100',
    'bg-yellow-500/50',
    'border-yellow-200',
    'text-yellow-100',
    'bg-green-600/50',
    'border-green-300',
    'text-green-100',
    'bg-white/40',
    'border-white',
    'text-white',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
