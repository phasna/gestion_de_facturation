
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { MdWorkOutline } from "react-icons/md";
import { MdOutlineHomeWork } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiHistogram } from "react-icons/gi";
import { IoApps } from "react-icons/io5";





const slides = [
    { icons: <MdWorkOutline />, title: "Réalisation du site 1", description: "La meta description est l'un des éléments essentiels au référencement . 1", price: "$2543,55", bgColor: "bg-opacity-70 bg-red-200" },
    { icons: <MdOutlineHomeWork />, title: "Réalisation du site 2", description: "La meta description est l'un des éléments essentiels au référencement . 2", price: "$20905", bgColor: "bg-opacity-70 bg-blue-200" },
    { icons:<AiOutlineFundProjectionScreen />, title: "Réalisation du site 3", description: "La meta description est l'un des éléments essentiels au référencement . 3", price: "$357,77", bgColor: "bg-opacity-70 bg-green-200" },
    { icons:<GiHistogram />, title: "Réalisation du site 4", description: "La meta description est l'un des éléments essentiels au référencement . 4", price: "$4975,66", bgColor: "bg-opacity-70 bg-yellow-200" },
    { icons: <IoApps />, title: "Réalisation du site 5", description: "La meta description est l'un des éléments essentiels au référencement . 5", price: "$50096", bgColor: "bg-opacity-70 bg-purple-200" }
];

const EmblaCarousel = () => {
    const options = { loop: true, align: 'start' }
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit() // Réinitialiser Embla si nécessaire

            const interval = setInterval(() => {
                if (emblaApi) {
                    emblaApi.scrollNext()
                }
            }, 2000) // Change the time as needed

            return () => clearInterval(interval) // Clear interval on component unmount
        }
    }, [emblaApi])

    return (
        <section className="embla w-full overflow-hidden relative p-5">
            <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
                <div className="embla__container flex -ml-2">
                    {slides.map((slide, index) => (
                        <div
                            className={`embla__slide rounded-3xl relative flex-shrink-0 w-1/4 ml-2 ${slide.bgColor} flex flex-col justify-center h-64 rounded-lg shadow-lg`}
                            key={index}
                        >
                            <div className="p-5 space-y-5">
                                <span className={"w-24 h-24 text-5xl"}>{slide.icons}</span>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{slide.title}</h2>
                                <p className="text-gray-600 mb-2">{slide.description}</p>
                                <hr className="w-full border-t border-black my-2" />
                                <span className="text-lg font-semibold text-gray-900">{slide.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-300 bg-opacity-50 rounded-full shadow-lg" onClick={scrollPrev}>
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-300 bg-opacity-50 rounded-full shadow-lg" onClick={scrollNext}>
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
            </button>
        </section>
    )
}

export default EmblaCarousel
