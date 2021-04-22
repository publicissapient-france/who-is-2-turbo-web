module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Whois',
        short_name: 'Whois',
        start_url: '/',
        background_color: '#1F23A0',
        theme_color: '#FCC739',
        display: 'standalone',
        icon: 'src/images/icon.svg',
        cache_busting_mode: 'none'
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/wait-auth', '/unauthorized', '/404'],
        workboxConfig: {
          globPatterns: ['**/icon*']
        }
      },
    },
  ],
};
