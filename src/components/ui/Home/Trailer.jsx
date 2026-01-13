import TrailerPoster from '@/assets/images/poster.png';
import { Play } from 'lucide-react';
import { useState } from 'react';

export const Trailer = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    return (
        <article className="container mt-8 sm:mt-12 lg:mt-16 flex flex-col gap-6 lg:gap-8 justify-start text-white">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Hollow Knight: Silksong Trailer</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                <div className="flex justify-center order-2 lg:order-1">
                    <div className="relative w-full group">
                        <div className="relative rounded-lg overflow-hidden border border-neutral-700 group-hover:border-gray-500 transition-colors duration-300">
                            {!isVideoLoaded && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <img 
                                        src={TrailerPoster} 
                                        alt="Trailer poster" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading='lazy'
                                    />
                                    <div className="relative z-20 flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer group/play">
                                        <Play className="w-7 h-7 fill-white text-white ml-1 group-hover/play:scale-110 transition-transform" />
                                    </div>
                                </div>
                            )}
                            <iframe 
                                className="w-full aspect-video"
                                loading='lazy'
                                src="https://www.youtube.com/embed/6XGeJwsUP9c?controls=1&modestbranding=1" 
                                title="Hollow Knight: Silksong - Release Trailer" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                                onLoad={() => setIsVideoLoaded(true)}
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-3 sm:gap-4 order-1 lg:order-2 lg:pl-4'>
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-200/10 to-white flex items-center justify-center">
                            <Play className="w-5 h-5 fill-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Artifacts of Hallownest
                        </h3>
                    </div>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        A curated glimpse into the relics, charms, and weapons that define Hallownest. Each artifact carries
                        echoes of forgotten kingdoms, battles fought in silence, and the resilience of wanderers who dared to
                        descend into the deep.
                    </p>

                    <div className="flex jutify-center items-center h-10 border-l-2 border-gray-400 pl-4">
                        <p className="text-sm sm:text-base text-gray-200 italic">
                            "Watch the trailer and feel the weight of every story etched into steel and silk."
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}