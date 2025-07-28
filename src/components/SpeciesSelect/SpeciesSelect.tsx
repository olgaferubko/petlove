import { useState, useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Control, RegisterOptions } from 'react-hook-form';
import s from './SpeciesSelect.module.css';

interface SpeciesSelectProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

export default function SpeciesSelect({ control, name, rules }: SpeciesSelectProps) {
  const [species, setSpecies] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const fetchSpecies = async () => {
  try {
    const response = await fetch('https://petlove.b.goit.study/api/notices/species');
    const data = (await response.json()) as string[];
    const capitalized = data.map(capitalize);
    setSpecies(capitalized);
  } catch (error) {
    console.error('Error fetching species:', error);
  }
};

    fetchSpecies();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className={s.wrapper} ref={ref}>
          <div
            className={`${s.inputWrapper} ${field.value ? s.selectedBorder : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
          <span className={`${s.value} ${field.value ? s.selected : ''}`}>
            {field.value || 'Type of pet'}
          </span>

            <svg className={s.icon} width={16} height={16}>
              <use href={`/icons.svg#${isOpen ? 'icon-chevron-up' : 'icon-chevron-down'}`} />
            </svg>
          </div>

          {isOpen && (
            <div className={s.dropdown}>
              <ul className={s.scrollContainer}>
                {species.map((item) => (
                  <li
                    key={item}
                    className={`${s.option} ${field.value === item ? s.active : ''}`}
                    onClick={() => {
                      field.onChange(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    />
  );
}