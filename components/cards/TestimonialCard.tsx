import Image from 'next/image';

const TestimonialCard = ({ image, content } : {
  image: string;
  content: string;
}) => {
  return <div className="rounded-2xl bg-[#EAFFB9] max-w-[320px] sm:max-w-[320px] h-[400px] m-2">
    <div className="flex flex-col gap-6 p-4">
      <div className="relative w-[285px] h-[238px] overflow-hidden rounded-2xl">
        <Image
          src={image || ""}
          alt="Testimonial Photo"
          className="rounded-2xl object-cover"
          layout="fill"
        />
      </div>
      <div>
        <p className="text-center text-base font-geist">
          {content}
        </p>
      </div>
    </div>
  </div>
}

export default TestimonialCard;