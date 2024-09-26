import { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import project from '../../../ProjectData/Project.jsx'; // Assurez-vous que le chemin est correct

const EmblaCarousel = () => {
    const options = { loop: true, align: 'start' };
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit(); // Réinitialiser Embla si nécessaire

            const interval = setInterval(() => {
                if (emblaApi) {
                    emblaApi.scrollNext();
                }
            }, 2000); // Changez le temps si nécessaire

            return () => clearInterval(interval); // Clear interval on component unmount
        }
    }, [emblaApi]);

    return (
        <section className="embla w-full overflow-hidden relative p-5 rounded-3xl">
            <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
                <div className="embla__container flex">
                    {project.map((slide, index) => (
                        <div
                            className="embla__slide flex-shrink-0 w-1/4 p-2" // 4 slides par vue
                            key={index}
                        >
                            <div className="rounded-3xl bg-black shadow-lg flex flex-col justify-center h-64 ">
                                <div className="p-5">
                                    <div className="flex items-center mb-3 text-white text-3xl">
                                        {slide.icon} {/* Utiliser l'icône du projet */}
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-2">{slide.name}</h2>
                                    <p className="text-white mb-2">{slide.detail}</p>
                                    <hr className="w-full border-t border-white my-2"/>
                                    <span className="text-lg font-semibold text-white">{slide.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-300 bg-opacity-50 rounded-full shadow-lg"
                onClick={scrollPrev}
            >
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-300 bg-opacity-50 rounded-full shadow-lg"
                onClick={scrollNext}
            >
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
            </button>
        </section>
    );
};

export default EmblaCarousel;
