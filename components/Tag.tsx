import { Cross2Icon } from '@radix-ui/react-icons';

interface TagProps {
  name: string;
  onRemove: (name: string) => void;
}

const Tag = ({ name, onRemove }: TagProps) => {
  return (
    <div className="flex items-center gap-2 border rounded-full px-2 py-1 text-sm">
      <p>{name}</p>
      <div className="cursor-pointer" onClick={() => onRemove(name)}>
        <Cross2Icon className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Tag;
