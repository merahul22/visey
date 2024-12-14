"use client";

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Image from 'next/image';

interface Testimonial {
  image: string;
  content: string;
}

type PropType = {
  slides: Testimonial[]
  className?: string
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, className } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div className={`embla ${className || ''}`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
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

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel