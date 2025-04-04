/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "metarix.network",
          port: "",
          pathname: "/assets/images/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "3000",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "8040",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "8037",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "8036",
          pathname: "/**",
        },
        
        {
          protocol:"https",
          hostname:"partner.spheramarket.com",
          port:"",
          pathname:"/**",
        },
        {
          protocol:"https",
          hostname:"youtube.com",
          port:"",
          pathname:"/**",
        },
      ],
    },
  };;

export default nextConfig;
