'use client';
import dynamic from 'next/dynamic';


const MoonPayProvider = dynamic(
    () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayProvider),
    { ssr: false },
);
export const MoonPayComponentProvider = ({ children }) => {
    console.log(process.env.NEXT_PUBLIC_MOONPAY_API_KEY, 'process.env.NEXT_PUBLIC_MOONPAY_API_KEY');
    return (
        <MoonPayProvider
            apiKey={process.env.NEXT_PUBLIC_MOONPAY_API_KEY}
            
        >
            {children}
        </MoonPayProvider>
    )
}