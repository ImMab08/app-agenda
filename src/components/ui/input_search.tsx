// components/SearchInput.tsx
import { FC } from "react";
import { IconSearch } from "@/components/icons/"; 

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ placeholder = "Buscar", value, onChange }) => {
  return (
    <div className="w-48 md:w-full md:max-w-xl">
      <div className="flex items-center bg-white border border-gray-300 rounded-xl transition-all px-2 py-2 md:px-4 md:py-2">
        <IconSearch className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full outline-none text-sm text-gray-700 bg-transparent placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchInput;
