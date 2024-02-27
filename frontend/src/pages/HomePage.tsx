import React from 'react'
import landingImage from "../assets/landing.png";
import downloadAppImage from "../assets/appDownload.png";
export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className='white-bg rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
        <h1 className='text-5xl font-bold tracking-tight text-orange-600'>
          Tuck into a takeway today
        </h1>
        <span className='text-xl'>Food is just a click away!</span>
      </div>
      <div className='grid md:grid-cols-2 gap-4'>
        <img src={landingImage} />
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <span className='font-bold text-3xl tracking-tighter'>Order takeawy even faster!</span>
          <span>Download the Zomato App for faster ordering and personalized recommandations</span>
          <img src={downloadAppImage} alt="download app from store"/>
        </div>
      </div>
    </div>
  )
}
