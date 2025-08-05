import { useState } from 'react';
import s from './SearchField.module.css';

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search',
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim()) {
        onSearch(value.trim());
      }
    }
  };

  const handleClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    onSearch('');
  };

  const handleClickSearch = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${s.form} ${className}`}>
      <div className={`${s.inputWrapper} ${isFocused ? s.focused : ''}`}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={s.input}
          aria-label="Search input"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className={s.btnWrapper}>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className={s.clearBtn}
              aria-label="Clear search"
            >
              <svg className={s.iconClear} width={18} height={18}>
                <use href="/icons.svg#icon-x" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={handleClickSearch}
            className={s.searchBtn}
            aria-label="Search"
            disabled={!value.trim()}
          >
            <svg className={s.iconSearch} width={18} height={18}>
              <use href="/icons.svg#icon-search" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchField;