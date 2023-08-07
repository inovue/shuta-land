/** @type {import('next').NextConfig} */
const config = {
  images: {
    disableStaticImages:true, 
    remotePatterns: [{ hostname: 'cdn.sanity.io' }] 
  },
}

export default config
