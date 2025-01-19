import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="h-screen relative">
      <div className="absolute bottom-1/2 left-1/2">
        <Image
          src="/logo-icon.webp"
          height="80"
          width="80"
          alt="Visey Logo"
          className="animate-pulse"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
