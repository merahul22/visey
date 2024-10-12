import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!message || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="flex items-center justify-between bg-success-100 p-3 rounded-md">
      <div className="flex items-center gap-x-2 text-success-300 text-sm">
        <p>{message}</p>
      </div>
      <Cross2Icon className="h-4 w-4 cursor-pointer" onClick={handleClose} />
    </div>
  );
};
