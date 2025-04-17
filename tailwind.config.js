module.exports = {
  content: ['./**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      letterSpacing:{
        '5px': '0.3125rem',
      },
      zIndex: {
        '1': '1',  
      },
      boxShadow: {
        'custom': '2.5px 1.5px 10px 8px rgb(221, 221, 221)',
      },
      marginRight: {
        '18px': '1.125rem',
      },
      borderRadius:{
        '4xl' : '3.125em',
      },
    },
  },
  plugins: [require('daisyui')],
};

