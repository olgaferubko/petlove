import { useState } from 'react';
import s from './SearchField.module.css';

interface SearchFieldProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({
  onSearch,
  placeholder = 'Search',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  const handleSearchClick = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className={s.inputWrapper}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className={s.input}
            />
            <div className={s.btnWrapper}>
                {inputValue && (
                    
                    <button
                    type="button"
                    onClick={handleClear}
                    className={s.clearBtn}
                    aria-label="Clear search"
                    >
                    <svg 
                    className={s.iconClear}
                    width={18}
                    height={18}
                    >
                        <use href="/icons.svg#icon-x" />
                    </svg>
                    </button>
                )}
                <button
                    type="submit"
                    className={s.searchBtn}
                    aria-label="Search"
                    onClick={handleSearchClick}
                >
                    <svg 
                    className={s.iconSearch}
                    width={18}
                    height={18}
                    >
                    <use href="/icons.svg#icon-search" />
                    </svg>
                    </button>
            </div>
            
        </div>
    </form>
  );
};

export default SearchField;