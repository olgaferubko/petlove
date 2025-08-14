import { useState, useRef, useEffect } from 'react';
import type { Option } from '../NoticesFilters/NoticesFilters';
import s from './CustomSelect.module.css';

interface CustomSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
  placeholder?: string;
}

export default function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={s.wrapper} ref={ref}>
      <div
        className={`${s.inputWrapper} ${value ? s.selectedBorder : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${s.value} ${value ? s.selected : ''}`}>
          {value?.label || placeholder || 'Select option'}
        </span>
        <svg className={s.icon}>
          <use href={`/icons.svg#${isOpen ? 'icon-chevron-up' : 'icon-chevron-down'}`} />
        </svg>
      </div>

      {isOpen && (
        <div className={s.dropdown}>
          <ul className={s.scrollContainer}>
            <li
              className={`${s.option} ${value === null ? s.activeShowAll : ''}`}
              onClick={() => { onChange(null); setIsOpen(false); }}
            >
              Show all
            </li>

            {options.map((opt) => (
              <li
                key={opt.value}
                className={`${s.option} ${value?.value === opt.value ? s.active : ''}`}
                onClick={() => { onChange(opt); setIsOpen(false); }}
              >
                {capitalize(opt.label)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
