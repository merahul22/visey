import Image from 'next/image';

const TestimonialCard = ({ image, content } : {
  image: string;
  content: string;
}) => {
  return <div className="rounded-2xl bg-[#EAFFB9] max-w-[400px] m-1 sm:m-2 sm:max-w-[320px] h-[500px]">
    <div className="flex flex-col ">
      <div className="relative w-[285px] h-[238px] overflow-hidden rounded-2xl">
        <Image
          src={image || ""}
          alt="Testimonial Photo"
          className="rounded-2xl object-cover p-2"
          layout="fill"
        />
      </div>
      <div>
        <p className="text-center text-base font-geist text-xs">
          {content}
        </p>
      </div>
    </div>
  </div>
}

export default TestimonialCard;