import EmblaCarousel from "../user/caroudel_accueil/carousel/EmblaCarousel.jsx";
import Liste_projet from "../user/Liste_projet.jsx";

const CarouselWrapper = () => {
    return (
        <div className={"h-screen"}>
            <EmblaCarousel />
            <Liste_projet />
        </div>
    );
};

export default CarouselWrapper;