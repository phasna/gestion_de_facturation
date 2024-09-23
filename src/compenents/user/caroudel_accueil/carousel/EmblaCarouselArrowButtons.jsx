import React from 'react'

export const PrevButton = ({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className="embla__button embla__button--prev">
        Prev
    </button>
)

export const NextButton = ({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className="embla__button embla__button--next">
        Next
    </button>
)

export const usePrevNextButtons = (emblaApi) => {
    const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

    const onPrevButtonClick = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const onNextButtonClick = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        const disablePrevAndNextButtons = () => {
            setPrevBtnDisabled(!emblaApi.canScrollPrev())
            setNextBtnDisabled(!emblaApi.canScrollNext())
        }

        emblaApi.on('select', disablePrevAndNextButtons)
        disablePrevAndNextButtons()
    }, [emblaApi])

    return { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick }
}
