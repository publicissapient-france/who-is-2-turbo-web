module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#202125',
      white: '#FAFAFF',
      grey: {
        1: '#29293D',
        2: '#52537A',
        3: '#8586AD',
        4: '#C2C2D6',
        5: '#EDEDF3',
      },
      blue: {
        1: '#0F1157',
        2: '#1F23AD',
        3: '#5256E0',
        4: '#7D80E8',
      },
      yellow: {
        1: '#664E00',
        2: '#CC9C00',
        3: '#FFCF33',
        4: '#FFDB66',
      },
      red: {
        1: '#5C0A0A',
        2: '#B81414',
        3: '#EB4747',
        4: '#F07575',
      },
      green: {
        1: '#125422',
        2: '#24A845',
        3: '#57DB78',
        4: '#81E49A',
      }
    },
    fontFamily: {
      text: ['"Roboto Mono"'],
      game: ['"Press Start 2P"']
    },
    fontSize: {
      '2xs': ['8px', {
        lineHeight: '12px',
        letterSpacing: '-.04em',
      }],
      'xs': ['10px', {
        lineHeight: '14px',
        letterSpacing: '-.04em',
      }],
      'sm': ['12px', {
        lineHeight: '16px',
        letterSpacing: '-.04em',
      }],
      'base': ['14px', {
        lineHeight: '18px',
        letterSpacing: '-.04em',
      }],
      't2xs': ['8px', '14px'],
      'txs': ['10px', '16px'],
      'tsm': ['12px', '18px'],
      'tbase': ['14px', '20px'],
      'tlg': ['16px', '22px'],
      'txl': ['20px', '26px'],
      't2xl': ['24px', '32px'],
    },
    screens: {
      'sm': '360px',
      'md': '768px',
      'lg': '1024px',
    }
  },
}
