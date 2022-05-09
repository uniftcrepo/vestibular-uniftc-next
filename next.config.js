const removeImports = require('next-remove-imports')({
 /*  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/, */
  matchImports: "\\.(css)$"
});


module.exports = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  /* ...removeImports({
    webpack(config, options) {
      return config
    },
  }), */
  rewrites(){
    return[
      {
        source: '/:path*',
        destination: '/:path*'
      },
      {
        source: '/:path*',
        destination: 'http://localhost:6000/:path*'
      },
    ]
  }
}
