const nextConfig = {
  // Allow images from localhost and potential future domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // If using local file system for uploads in public/, Next.js serves them automatically.
    // However, if we move to absolute paths outside public, we'd need more config.
    // Current setup uses /uploads which maps to public/uploads, so it should work.
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // Increase limit for uploads
    }
  }
};

export default nextConfig;
