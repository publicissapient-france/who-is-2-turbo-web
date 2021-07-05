module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      text: ['"Roboto Mono"'],
      game: ['"Press Start 2P"']
    },
    fontSize: {
      'xs': '.65rem',
      'sm': '.75rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    }
  },
}
