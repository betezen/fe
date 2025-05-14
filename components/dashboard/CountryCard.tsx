import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CountryData } from "@/app/dashboard/trading-platform";
import { motion } from "framer-motion";

interface CountryCardProps {
  country: CountryData;
}

export default function CountryCard({ country }: CountryCardProps) {
  // Convert country ID to ISO code for flag image
  const getCountryCode = (id: string): string => {
    const codeMap: Record<string, string> = {
      'usa': 'us',
      'uk': 'gb',
      'korea': 'kr',
      // Use the ID directly for countries where ID matches ISO code
      'india': 'in',
      'japan': 'jp',
      'china': 'cn',
      'brazil': 'br',
      'canada': 'ca',
      'australia': 'au',
      'mexico': 'mx',
      'russia': 'ru',
      'germany': 'de',
    };
    
    return codeMap[id.toLowerCase()] || id.toLowerCase();
  };
  
  const countryCode = getCountryCode(country.id);
  
  // Use a reliable flag API
  const flagUrl = `https://flagcdn.com/w160/${countryCode}.png`;
  
  return (
    <div className="block w-full">
      <div className="w-full max-w-xs h-auto p-3 md:p-6 bg-[#1d1f22] rounded-3xl flex flex-col justify-between items-start mx-auto">
        <div className="self-stretch flex justify-between items-center gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 relative bg-white rounded-full overflow-hidden flex-shrink-0 border border-gray-800">
              <Image 
                className="w-full h-full object-cover" 
                src={flagUrl}
                alt={`${country.name} flag`}
                width={35}
                height={35}
                priority
              />
            </div>
            <div className="text-white text-base md:text-lg font-medium truncate">{country.name}</div>
          </div>
          <div className={`px-2 py-1 ${country.trend === "up" ? "bg-[#068621] outline-[#54bb54]" : "bg-[#861506] outline-[#bb5454]"} rounded-full outline outline-1 outline-offset-[-1px] flex justify-center items-center flex-shrink-0`}>
            <div className="text-white text-sm font-medium font-['Inter']">
              {country.trend === "up" ? "+" : ""}
              {country.changePercent}%
            </div>
          </div>
        </div>
        
        <div className="self-stretch flex flex-col justify-start items-start gap-3 py-2">
          <div className="self-stretch flex justify-between items-center gap-1.5">
            <div className="text-white text-sm md:text-base font-semibold">Country Score :</div>
            <div className="text-white text-base font-semibold font-['Inter']">{country.countryScore.toLocaleString()}</div>
          </div>
          <div className="self-stretch flex justify-between items-center gap-1.5">
            <div className="text-[#555555] text-base font-normal font-['Inter']">24H Volume :</div>
            <div className="text-white text-base font-normal font-['Inter']">{country.volume24h}</div>
          </div>
          <div className="self-stretch flex justify-between items-center gap-1.5">
            <div className="text-[#555555] text-base font-normal font-['Inter']">Index Price :</div>
            <div className="text-white text-base font-normal font-['Inter']">{country.indexPrice}</div>
          </div>
          <div className="self-stretch flex justify-between items-center gap-1.5">
            <div className="text-[#555555] text-base font-normal font-['Inter']">Market Sentiment :</div>
            <div className="text-white text-base font-normal font-['Inter']">{country.sentiment}</div>
          </div>
        </div>
        
        <div className="self-stretch flex justify-end items-center">
          <Link href={`/country/${country.id}`}>
            <motion.button
              className="px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base bg-[#155dee] rounded-[100px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex justify-center items-center gap-2 hover:bg-[#2468ff] transition-colors duration-200"
            >
              <span className="text-white text-base font-medium font-['Inter'] leading-tight">Trade Now</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
} 