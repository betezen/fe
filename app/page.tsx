"use client";

import Image from "next/image";
// import { useAccount } from "wagmi";
// import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

export default function RootPage() {
  // const { openConnectModal } = useConnectModal();
  // const { isConnected } = useAccount();
  const router = useRouter();

  return (
          <div className="flex flex-col min-h-screen bg-[#111214] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-28 pb-12 md:pb-24 px-4">
        {/* Background gradient */}
              <div className="absolute inset-0 bg-[#111213] -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#05071A] via-[#0A1428] to-[#1A1510] opacity-80"></div>
                <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-amber-900/20 via-amber-800/10 to-transparent"></div>
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
              </div>

              <div className="max-w-12xl mx-auto">
          <div className="max-w-7xl mx-auto text-center mt-16 md:mt-[120px] mb-8 md:mb-16">
            <h1 className="font-bold mb-6 md:mb-8 leading-tight tracking-tight">
              <div className="text-center mb-6 md:mb-10 bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/15 text-transparent tracking-[-3%] bg-clip-text text-[#f1f1ef] text-3xl md:text-5xl lg:text-[68px] font-medium font-['Inter'] leading-tight md:leading-[75.14px]">
                First Perpetual Prediction Market Don&apos;t Bet But Trade Your Country
                    </div>
                  </h1>
            <p className="text-center text-[#8b8b8b] text-sm md:text-base lg:text-lg font-normal font-['Inter'] leading-6 md:leading-7 max-w-3xl mx-auto">
              Unlock the power of perpetual contracts based on a country&apos;s progress, with predictions driven by key indicators such as GDP, inflation, currency rates and more. Trade long or short, with no time limits on your positions.
            </p>

            <div className="flex justify-center mt-8 md:mt-10 lg:mt-[80px]">
                    <button
                      onClick={() => router.push("/dashboard")}
                className="text-white text-lg md:text-xl lg:text-2xl font-medium font-['Inter'] leading-loose px-4 md:px-6 lg:px-[26px] py-3 md:py-4 lg:py-[16.25px] bg-gradient-to-br from-[#111214] to-[#22242a] rounded-[100px] shadow-[-12px_-12px_24px_0px_rgba(21,94,239,0.24)] shadow-[12px_12px_24px_0px_rgba(255,175,41,0.24)] outline outline-[3px] outline-[#155dee] inline-flex justify-center items-center gap-[13px] overflow-hidden"
                    >
                      Start Trading Now
                    </button>
                  </div>
                </div>

          {/* Dashboard preview */}
          <div className="relative mx-auto max-w-4xl mt-8 md:mt-10 lg:mt-20">
                  <div className="absolute -inset-6 -rotate-180 bg-gradient-to-b from-[#ffaf29] to-[#155dee] outline outline-1 outline-offset-[-0.50px] outline-black blur-[200px]"></div>
                  <div className="w-full aspect-[16.5/14.2] bg-gradient-to-b from-[#0A1428] via-[#1A2036] to-[#1A1510] rounded-xl overflow-hidden shadow-[0_0_100px_rgba(30,64,175,0.3)] border border-blue-900/40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src="/BeTheNation3.png"
                        alt="Trading dashboard preview"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Why We're Different Section */}
            <section className="py-10 md:py-20 mt-10 md:mt-20 px-4 relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                  {/* Heading */}
                  <div className="w-full md:w-1/4 mb-8 md:mb-0 flex flex-col justify-center">
                    <h2 className="font-bold leading-tight">
                      <span className="block w-full text-center md:text-left bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/20 text-transparent bg-clip-text text-2xl sm:text-3xl md:text-5xl lg:text-[68px] font-medium font-['Inter'] tracking-[-3%] leading-tight md:leading-[75.14px]">
                        Why We&apos;re Different: A New Era of Trading
                      </span>
                    </h2>
                  </div>
                  {/* Card Grid */}
                  <div className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Card 1 */}
                      <div className="w-full h-full p-4 md:p-6 bg-[#202122]/60 rounded-2xl shadow outline outline-1 outline-[#323232] flex flex-col gap-4">
                        <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-blue-500/30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 text-blue-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/20 text-transparent bg-clip-text font-medium leading-7">
                            Hold your position indefinitely
                          </div>
                          <div className="text-[#777777] text-sm md:text-base font-medium leading-6 md:leading-7 mt-2">
                            Say goodbye to traditional contract expirations! Our perpetual contracts allow you to trade long or short without worrying about expiry dates. Hold positions for as long as you want.
                          </div>
                        </div>
                      </div>
                      {/* Card 2 */}
                      <div className="w-full h-full p-4 md:p-6 bg-[#202122]/60 rounded-2xl shadow outline outline-1 outline-[#323232] flex flex-col gap-4">
                        <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-blue-500/30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 text-blue-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 2.25a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/20 text-transparent bg-clip-text font-medium leading-7">
                            Trade based on key economic indicators.
                          </div>
                          <div className="text-[#777777] text-sm md:text-base font-medium leading-6 md:leading-7 mt-2">
                            Unlike traditional markets, BeTheNation.Fun lets you predict a country&apos;s future by evaluating key economic indicators such as GDP, inflation.
                          </div>
                        </div>
                      </div>
                      {/* Card 3 */}
                      <div className="w-full h-full p-4 md:p-6 bg-[#202122]/60 rounded-2xl shadow outline outline-1 outline-[#323232] flex flex-col gap-4">
                        <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-blue-500/30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-7 text-blue-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/20 text-transparent bg-clip-text font-medium leading-7">
                            Maximize your potential returns
                          </div>
                          <div className="text-[#777777] text-sm md:text-base font-medium leading-6 md:leading-7 mt-2">
                            With leverage up to 5x, you can control a larger position with a smaller capital investment. Whether you&apos;re trading on economic growth or decline.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stay Ahead of the Market Section - Improved with full-width container and centered text */}
            <section className="py-20 mt-40 px-4 relative">
              <div className="max-w-6xl mx-auto text-center">
                <div className="mb-8 bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/15 text-transparent tracking-[-3%] bg-clip-text text-2xl sm:text-3xl md:text-5xl lg:text-[68px] font-medium font-['Inter'] leading-tight md:leading-[75.14px]">
                  Stay Ahead of the Market with Real-Time Data
                </div>
              </div>
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Leaderboard */}
                <div className="flex flex-col h-full bg-gradient-to-r from-black/0 to-black/20 rounded-2xl shadow outline outline-1 outline-[#323232] p-6 gap-6">
                  <div>
                    <div className="bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/15 text-transparent tracking-[-3%] bg-clip-text text-[#f1f1ef] text-3xl md:text-[40px] font-medium font-['Inter'] leading-tight">
                      Live<br />Leaderboard
                    </div>
                    <div className="mt-4 text-[#777777] text-base font-medium font-['Inter'] leading-7">
                      See how top traders are performing. Check out profit/loss rankings and accuracy rates of traders who have successfully predicted country trends.
                    </div>
                  </div>
                  <div className="mt-6 bg-[#1d1f22] rounded-2xl shadow outline outline-1 outline-[#202327] p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-lg font-medium">Leaderboard</span>
                      <span className="w-6 h-6 relative overflow-hidden">
                        <span className="w-0.5 h-4 left-[11px] top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-[#99a3b2]" />
                      </span>
                    </div>
                    <div className="text-[#676767] text-sm mb-2">You are ranked 167th in Indonesia</div>
                    <div className="divide-y divide-[#323232]">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#697485] text-sm">Rank #1</span>
                        <div className="flex items-center gap-2">
                          <Image className="w-8 h-8 rounded-full object-cover" src="https://i.pravatar.cc/150?img=1" alt="User 1" width={32} height={32} />
                          <span className="text-white text-sm font-medium">0xMeiline</span>
                        </div>
                        <span className="text-[#16b264] text-sm">$250,000</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#697485] text-sm">Rank #2</span>
                        <div className="flex items-center gap-2">
                          <Image className="w-8 h-8 rounded-full object-cover" src="https://i.pravatar.cc/150?img=2" alt="User 2" width={32} height={32} />
                          <span className="text-white text-sm font-medium">0xClara</span>
                        </div>
                        <span className="text-[#16b264] text-sm">$12,000</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#697485] text-sm">Rank #3</span>
                        <div className="flex items-center gap-2">
                          <Image className="w-8 h-8 rounded-full object-cover" src="https://i.pravatar.cc/150?img=3" alt="User 3" width={32} height={32} />
                          <span className="text-white text-sm font-medium">0xEdward</span>
                        </div>
                        <span className="text-[#16b264] text-sm">$10,000</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-white text-sm font-semibold">Rank #167</span>
                        <div className="flex items-center gap-2">
                          <Image className="w-8 h-8 rounded-full object-cover" src="https://i.pravatar.cc/150?img=4" alt="User 4" width={32} height={32} />
                          <span className="text-white text-sm font-medium">0xCeline</span>
                        </div>
                        <span className="text-[#16b264] text-sm">$1,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Live Countryscore Data */}
                <div className="flex flex-col h-full bg-[#202122]/60 rounded-2xl shadow outline outline-1 outline-[#323232] p-6 gap-6">
                  <div className="bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/15 text-transparent tracking-[-3%] bg-clip-text text-[#f1f1ef] text-2xl md:text-[32px] font-medium font-['Inter'] leading-tight">
                    Live Countryscore Data
                  </div>
                  <div className="text-[#777777] text-base font-medium font-['Inter'] leading-7">
                    Track real-time GDP, inflation, and other key indicators for each country. See live updates for global economic performance and make smarter predictions.
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-xs bg-[#202327] rounded-xl p-4">
                      <div className="text-white text-xs mb-2">Live Countryscore</div>
                      <svg viewBox="0 0 300 100" className="w-full h-24">
                        <polyline
                          fill="none"
                          stroke="#70E000"
                          strokeWidth="3"
                          points="0,80 40,60 80,65 120,20 160,40 200,10 240,30 280,20"
                        />
                        {[[0,80],[40,60],[80,65],[120,20],[160,40],[200,10],[240,30],[280,20]].map(([x, y], i) => (
                          <circle key={i} cx={x} cy={y} r="4" fill="#70E000" />
                        ))}
                      </svg>
                      <div className="flex justify-between text-[#697485] text-[8px] mt-2">
                        {["28 Apr","29 Apr","30 Apr","1 May","2 May","3 May","4 May","5 May"].map(date => (
                          <span key={date}>{date}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Market Trends */}
                <div className="flex flex-col h-full bg-[#202122]/60 rounded-2xl shadow outline outline-1 outline-[#323232] p-6 gap-6">
                  <div className="bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/15 text-transparent tracking-[-3%] bg-clip-text text-[#f1f1ef] text-2xl md:text-[32px] font-medium font-['Inter'] leading-tight">
                    Market Trends
                  </div>
                  <div className="text-[#777777] text-base font-medium font-['Inter'] leading-7">
                    Interactive charts showing GDP progress, currency exchange rates, and market forecasts for the countries you&apos;re interested in.
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-xs bg-[#202326] rounded-2xl shadow outline outline-1 outline-[#202327] p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Image
                          className="w-8 h-8 rounded-full object-cover"
                          src="https://flagcdn.com/w80/us.png"
                          alt="USA Flag"
                          width={32}
                          height={32}
                        />
                        <span className="text-white text-lg font-medium">USA</span>
                        <span className="px-2 py-1 bg-[#068621] rounded-full text-white text-xs ml-auto">+2.5%</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-[#555]">Countryscore:</span>
                        <span className="text-white">1,839</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#555]">24H Volume:</span>
                        <span className="text-white">$1,200,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#555]">Index Price:</span>
                        <span className="text-white">$1,000,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#555]">Market Sentiment:</span>
                        <span className="text-white">Bullish</span>
                      </div>
                      <button className="mt-4 px-6 py-2 bg-[#155dee] rounded-full text-white font-medium text-base">Trade Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final CTA Section - Updated to match reference exactly */}
            <section className="mt-40 py-16 px-4 relative">
              <div className="max-w-6xl mx-auto text-center">
                {/* Background glow effect */}
                <div className="absolute top-60 w-[1078px] h-[543px] bg-[radial-gradient(ellipse_62.33%_62.33%_at_50.00%_50.00%,_rgba(21,_94,_239,_0.60)_0%,_rgba(255,_175,_41,_0.60)_100%)] rounded-full blur-[150px]"></div>

                {/* Content with border and subtle glass effect */}
                <div className="relative bg-[#111214]/40 rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#323232] p-8 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
                  <div className="self-stretch text-center mb-[40px] bg-gradient-to-b from-[#f1f1ef] to-[#f1f1ef]/15 text-transparent tracking-[-3%] bg-clip-text justify-start text-[#f1f1ef] text-[68px] font-medium font-['Inter'] leading-[75.14px]">
                    Join The Economic Revolution Today.
                  </div>

                  <p className="text-[#8b8b8b] mb-10 max-w-[1027px] mx-auto text-base">
              Unlock the power of perpetual contracts based on a country&apos;s
                    progress, with predictions driven by key indicators such as
                    GDP, inflation, currency exchange, and more. Trade long or
                    short, with no expiration on your positions.
                  </p>

                  {/* CTA button with golden glow effect */}
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="justify-center text-white text-2xl font-medium font-['Inter'] leading-loose px-[28px] py-[12px] bg-gradient-to-br from-[#111214] to-[#22242a] rounded-[100px] shadow-[-12px_-12px_24px_0px_rgba(21,94,239,0.24)] shadow-[12px_12px_24px_0px_rgba(255,175,41,0.24)] outline outline-[2px] outline-[#155dee] inline-flex justify-center items-center gap-[13px] overflow-hidden"
                  >
                    Sign Up Now and Start Trading!
                  </button>
                </div>
              </div>
            </section>

            {/* Updated Footer matching reference design */}
            <footer className="py-16 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                  {/* Brand section - 4 columns on desktop */}
                  <div className="md:col-span-4">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Betezen.Fun
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Betezen.Fun lets users trade GDP-based derivatives on
                      the world&apos;s leading economies, with this proof-of-concept
                      demo.
                    </p>
                  </div>

                  {/* Links section - 8 columns split into 2-2-2-2 on desktop */}
                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        About Us
                      </a>
                      <a
                        href="#"
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        FAQ
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Twitter
                      </a>
                      <a
                        href="#"
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="#"
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Telegram
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Contact Support
                      </a>
                      <a
                        href="#"
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Terms Of Service
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copyright section */}
                <div className="mt-12 pt-6 border-t border-gray-800/30 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-500 text-sm">
                    Betezen.Fun © 2025
                  </p>
                  <p className="text-gray-500 text-sm mt-2 md:mt-0">
                    All Rights Reserved
                  </p>
                </div>
              </div>
            </footer>
          </div>
  );
}