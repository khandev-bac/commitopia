"use client"
import React, { useState } from 'react';
import { Github, Search, Sparkles, ArrowRight } from 'lucide-react';

const Page = () => {
    const [repoUrl, setRepoUrl] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 sm:-top-40 -right-16 sm:-right-32 w-40 sm:w-80 h-40 sm:h-80 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 sm:-bottom-40 -left-16 sm:-left-32 w-40 sm:w-80 h-40 sm:h-80 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-500/5 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-center px-2 sm:px-4">
                {/* Header section */}
                <div className="mb-8 sm:mb-12">
                    {/* Logo/Icon */}
                    <div className="mb-4 sm:mb-6 relative">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl sm:shadow-2xl shadow-purple-500/25">
                            <Github className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-900" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
                        Commitopia
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-2 px-2">
                        AI-powered commit summaries and insights
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm px-4 sm:px-2 leading-relaxed">
                        Paste your GitHub repository link below to get intelligent commit analysis
                    </p>
                </div>

                {/* Input section */}
                <div className="relative group mb-6 sm:mb-8">
                    {/* Glowing border effect */}
                    <div className={`absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-xl sm:rounded-2xl blur-sm transition-all duration-500 ${isFocused ? 'opacity-75 animate-pulse' : 'opacity-0 group-hover:opacity-50'
                        }`}></div>

                    {/* Input container */}
                    <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xl sm:shadow-2xl">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                            {/* Input section with icon */}
                            <div className="flex items-center flex-1 gap-3 px-3 sm:px-0">
                                {/* Search icon */}
                                <div className="sm:pl-4">
                                    <Search className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${isFocused ? 'text-purple-400' : 'text-gray-500'
                                        }`} />
                                </div>

                                {/* Input field */}
                                <input
                                    type="url"
                                    value={repoUrl}
                                    onChange={(e) => setRepoUrl(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="https://github.com/owner/repository"
                                    className="flex-1 bg-transparent text-white text-sm sm:text-lg placeholder-gray-500 focus:outline-none py-3 sm:py-4 pr-2 sm:pr-4"
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                className={`px-4 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap text-sm sm:text-base ${repoUrl.trim() ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
                                    }`}
                                disabled={!repoUrl.trim()}
                            >
                                <span className="hidden sm:inline">Explore</span>
                                <span className="sm:hidden">Go</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Example links */}
                <div className="px-2">
                    <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">Try these popular repositories:</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {[
                            { name: 'React', url: 'https://github.com/facebook/react' },
                            { name: 'Next.js', url: 'https://github.com/vercel/next.js' },
                            { name: 'Vue.js', url: 'https://github.com/vuejs/vue' }
                        ].map((repo) => (
                            <button
                                key={repo.name}
                                onClick={() => setRepoUrl(repo.url)}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-gray-300 hover:text-white text-xs sm:text-sm rounded-md sm:rounded-lg transition-all duration-300 backdrop-blur-sm"
                            >
                                {repo.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '30px 30px sm:50px sm:50px'
                }}
            ></div>
        </div>
    );
};

export default Page;