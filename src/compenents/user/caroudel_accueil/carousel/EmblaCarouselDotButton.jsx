import React from 'react'

export const DotButton = ({ selected, onClick }) => (
    <button
        className={`embla__dot ${selected ? 'is-selected' : ''}`}
        type="button"
        onClick={onClick}
    />
)

export const useDotButton = (emblaApi) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [scrollSnaps, setScrollSnaps] = React.useState([])

    const onDotButtonClick = React.useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index)
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }

        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        onSelect()
    }, [emblaApi])

    return { selectedIndex, scrollSnaps, onDotButtonClick }
}
