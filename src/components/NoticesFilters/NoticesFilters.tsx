import { useEffect, useState, useCallback, useRef } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import SearchField from '../SearchField/SearchField';
import s from './NoticesFilters.module.css';

type OptionType = {
  label: string;
  value: string;
};

export type Filters = {
  search: string;
  category: OptionType | null;
  sex: OptionType | null;
  species: OptionType | null;
  city: OptionType | null;
  sort: 'popular' | 'unpopular' | 'cheap' | 'expensive';
};

type NoticesFiltersProps = {
  onFilterChange: (filters: Filters) => void;
};

const defaultFilters: Filters = {
  search: '',
  category: null,
  sex: null,
  species: null,
  city: null,
  sort: 'popular',
};

const NoticesFilters: React.FC<NoticesFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
  const [sexOptions, setSexOptions] = useState<OptionType[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<OptionType[]>([]);

  const prevFiltersRef = useRef<Filters>(filters);

  useEffect(() => {
    axios.get<string[]>('/notices/categories').then(({ data }) => {
      setCategoryOptions(data.map((item: string) => ({ label: item, value: item })));
    });
    axios.get<string[]>('/notices/sex').then(({ data }) => {
      setSexOptions(data.map((item: string) => ({ label: item, value: item })));
    });
    axios.get<string[]>('/notices/species').then(({ data }) => {
      setSpeciesOptions(data.map((item: string) => ({ label: item, value: item })));
    });
  }, []);

  useEffect(() => {
    const prev = prevFiltersRef.current;
    const filtersChanged = JSON.stringify(prev) !== JSON.stringify(filters);
    if (filtersChanged) {
      onFilterChange(filters);
      prevFiltersRef.current = filters;
    }
  }, [filters, onFilterChange]);

  const handleInputChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const loadCityOptions = useCallback(async (inputValue: string): Promise<OptionType[]> => {
    if (inputValue.length < 3) return [];
    const response = await axios.get<any[]>(`/cities?keyword=${inputValue}`);
    return response.data.map((city: any) => ({
      label: city.cityEn,
      value: city.cityEn,
    }));
  }, []);

  const handleReset = () => setFilters(defaultFilters);

  return (
    <div className={s.form}>
      <SearchField
        value={filters.search}
        onChange={(e) => handleInputChange('search', e.target.value)}
        onSearch={(query) => handleInputChange('search', query)}
        placeholder="Search"
      />

      <Select
        options={categoryOptions}
        value={filters.category}
        onChange={(option) => handleInputChange('category', option)}
        placeholder="Category"
        isClearable
      />

      <Select
        options={sexOptions}
        value={filters.sex}
        onChange={(option) => handleInputChange('sex', option)}
        placeholder="By gender"
        isClearable
      />

      <Select
        options={speciesOptions}
        value={filters.species}
        onChange={(option) => handleInputChange('species', option)}
        placeholder="By type"
        isClearable
      />

      <div className={s.cityWrapper}>
        <AsyncSelect
          classNamePrefix="custom"
          className={s.locationSelect}
          value={filters.city}
          onChange={(option) => handleInputChange('city', option)}
          placeholder="Location"
          cacheOptions
          defaultOptions
          isClearable
          loadOptions={loadCityOptions}
        />
        <svg className={s.iconSearch} width={20} height={20} aria-hidden="true">
          <use href="/icons.svg#icon-search" />
        </svg>
      </div>

      <div className={s.radioGroup}>
        <label>
          <input
            type="radio"
            name="sort"
            value="popular"
            checked={filters.sort === 'popular'}
            onChange={() => handleInputChange('sort', 'popular')}
          />
          Popular
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="unpopular"
            checked={filters.sort === 'unpopular'}
            onChange={() => handleInputChange('sort', 'unpopular')}
          />
          Unpopular
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="cheap"
            checked={filters.sort === 'cheap'}
            onChange={() => handleInputChange('sort', 'cheap')}
          />
          Cheap
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="expensive"
            checked={filters.sort === 'expensive'}
            onChange={() => handleInputChange('sort', 'expensive')}
          />
          Expensive
        </label>
      </div>

      <button type="button" onClick={handleReset} className={s.resetBtn}>
        Reset
      </button>
    </div>
  );
};

export default NoticesFilters;