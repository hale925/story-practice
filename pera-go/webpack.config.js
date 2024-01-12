module.exports = {
    // ...
    module: {
      rules: [
        // ...
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          ],
        },
      ],
    },
  };
  