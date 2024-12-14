"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import Image from 'next/image';

const TWEEN_FACTOR_BASE = 0.84

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

interface Testimonial {
  image: string;
  content: string;
}

type PropType = {
  slides: Testimonial[]
  className?: string
  options?: EmblaOptionsType
}

const EmblaCarouselLarge: React.FC<PropType> = (props) => {
  const { slides, options, className } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          emblaApi.slideNodes()[slideIndex].style.opacity = numberWithinRange(tweenValue, 0, 1).toString()
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity)
  }, [emblaApi, setTweenFactor, tweenOpacity])

  return (
    <div className={`lembla ${className || ''}`}>
      <div className="lembla__viewport" ref={emblaRef}>
        <div className="lembla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide flex flex-col gap-2 justify-center" key={index}>
              <div className="embla__slide__img relative">
                <Image
                  src={slide.image}
                  alt="Testinomial images"
                  layout="fill"
                  className="rounded-2xl"
                  objectFit="cover"
                />
              </div>
              <div className="font-medium font-gothic">
                <p>{slide.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lembla__controls">
        <div className="lembla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarouselLarge;
