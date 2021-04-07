module.exports = {
  trailingSlash: true,
  async rewrites() {
    return {
      beforeFiles: [
        // Act as a reverse proxy to the django application's graphql API
        {
          source: "/api/graphql/",
          destination: "http://localhost:8000/graphql/",
        },
        {
          source: "/static/:path*",
          destination: "http://localhost:8000/static/:path*",
        },
      ],
      fallback: [
        // Fall back to the django application
        // This could here during a migration and phased out over time as this webapp gains functionality
        {
          source: "/:path*/",
          destination: "http://localhost:8000/:path*/",
        },
      ],
    };
  },
};
