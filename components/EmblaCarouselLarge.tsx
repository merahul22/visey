"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll'
import TestimonialCard from '@/components/cards/TestimonialCard';
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

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
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true })
  ])
  const tweenFactor = useRef(0)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

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

    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity)
  }, [emblaApi, setTweenFactor, tweenOpacity])

  return (
    <div className={`max-w-[500px] ${className || ''}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {slides.map((slide, index) => (
            <div key={index}>
              <TestimonialCard image={slide.image} content={slide.content} />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex justify-center items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`w-3 h-3 rounded-full ${index === selectedIndex ? 'bg-primary-landing' : 'bg-[#D9D9D9]'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarouselLarge;
