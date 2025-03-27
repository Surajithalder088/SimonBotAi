import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors:true
  },
  experimental:{
    
  },
  webpack:(config)=>{
    return config
  },
  /* config options here */
};

export default nextConfig;
