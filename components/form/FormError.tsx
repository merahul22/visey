import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!message || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="flex items-center justify-between gap-x-2 bg-error-100 p-3 rounded-md">
      <div className="flex items-center text-neutrals-1000 font-semibold ">
        <p>{message}</p>
      </div>
      <div className="h-4 w-4">
        <Cross2Icon className="cursor-pointer" onClick={handleClose} />
      </div>
    </div>
  );
};
