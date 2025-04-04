'use client'
import { getDataAPI } from '@/utils/API_Instance';
import dynamic from 'next/dynamic';
import { use, useEffect, useState } from 'react';
const MoonPayBuyWidget = dynamic(
    () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayBuyWidget),
    { ssr: false },
);

export const MoonPayComponent = () => {
    const [showWidget, setShowWidget] = useState(false);

    useEffect(() => {
        const handleButtonClick = () => {
            setShowWidget(true);
          };
          handleButtonClick()
        },[])
    const apiKey = process.env.NEXT_PUBLIC_MOONPAY_API_KEY;
    console.log("this is the api key" + apiKey);

    const handleGetSignature = async (url) => {
      try {
        console.log("url first: " + url)
        // Fetch the signature from the backend 
        const response = await getDataAPI('moonpay/generate-url?url=' + encodeURIComponent(url))
        console.log(response, 'response');    
     
        const signatureText = response.data.signature;
        console.log("this is the signature from the backend" + signatureText);
        setShowWidget(true)
        return signatureText

      } catch (error) {
        console.error('Error fetching the signature:', error);
        return '';
      }
    };

    const configuration = {
        apiKey,
        defaultCurrencyCode: "eth",
        baseCurrencyAmount: "50", // NOTE: Minimum for most currencies is ~$30 USD
        // walletAddress: "wallet_address", // To successfully prefill, address and defaultCurrencyCode must be from same chain.
        redirectURL: "http://localhost:8040",
        variant: "overlay",
        lockAmount: true,
        baseCurrencyCode: "usd",
        //paymentMethod: "", // Refer to documentation for various payment methods
        onUrlSignatureRequested: handleGetSignature,
      };
    return (
        <div>
            {showWidget && <MoonPayBuyWidget  {...configuration} /> }
        </div>
    )
}