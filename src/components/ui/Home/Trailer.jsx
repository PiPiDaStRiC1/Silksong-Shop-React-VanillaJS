import TrailerPoster from '@/assets/images/poster.png';

export const Trailer = () => {
    return (
        <article className="container mt-10 flex flex-col gap-2 justify-start bg-black text-white">
            <h2 className="flex-start text-4xl">Hollow Knight: Silksong Trailer</h2>
            <div className="flex justify-center items-center gap-8 mt-6">
                <iframe 
                    width="2500" 
                    height="500" 
                    src="https://www.youtube.com/embed/6XGeJwsUP9c" 
                    title="Hollow Knight: Silksong - Release Trailer" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    poster={TrailerPoster}
                ></iframe>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <h3 className="text-2xl">Artifacts of Hallownest</h3>
                    <p className="text-lg text-gray-200">
                        A curated glimpse into the relics, charms, and weapons that define Hallownest. Each artifact carries
                        echoes of forgotten kingdoms, battles fought in silence, and the resilience of wanderers who dared to
                        descend into the deep. Watch the trailer and feel the weight of every story etched into steel and silk.
                    </p>
                </div>
            </div>
        </article>
    )
}