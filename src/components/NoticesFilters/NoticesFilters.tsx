import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useMediaQuery } from "react-responsive";
import { customSelectStyles } from './selectStyles';
import SearchField from '../SearchField/SearchField';
import CustomSelect from '../CustomSelect/CustomSelect';
import s from './NoticesFilters.module.css';

export type Option = { label: string; value: string }

export type Filters = {
  search: string
  category: Option | null
  sex: Option | null
  species: Option | null
  city: Option | null
  sort: 'popular' | 'unpopular' | 'cheap' | 'expensive' | null
}

const defaultFilters: Filters = {
  search: '',
  category: null,
  sex: null,
  species: null,
  city: null,
  sort: null,
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg className={s.iconSearch} width={18} height={18}>
        <use href="/icons.svg#icon-search" />
      </svg>
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: any) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <svg
      {...restInnerProps}
      ref={ref}
      className={s.iconClear}
      width={18}
      height={18}
    >
      <use href="/icons.svg#icon-x" />
    </svg>
  );
};

const Input = (props: any) => (
  <>
    <components.Input {...props} />
    {props.selectProps.inputValue && (
      <svg
        className={s.iconClearAbsolute}
        width={18}
        height={18}
        onClick={() =>
          props.selectProps.onInputChange('', { action: 'input-change' })
        }
      >
        <use href="/icons.svg#icon-x" />
      </svg>
    )}
  </>
);

function buildApiParams(filters: Filters, page = 1) {
  const params: Record<string, any> = { page, limit: 6 }

  if (filters.search) params.keyword = filters.search
  if (filters.category) params.category = filters.category.value
  if (filters.sex) params.sex = filters.sex.value
  if (filters.species) params.species = filters.species.value
  if (filters.city) params.locationId = filters.city.value 


  params.byDate = true 
  if (filters.sort === 'popular') {
    params.byPopularity = true
    params.byDate = false
  } else if (filters.sort === 'expensive') {
    params.byPrice = true
    params.byDate = false
  }

  return params
}

export default function NoticesFilters({
  onFilterChange,
}: {
  onFilterChange: (f: Filters) => void;
}) {
  const [filters, setFilters] = useState(defaultFilters)
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([])
  const [sexOptions, setSexOptions] = useState<Option[]>([])
  const [speciesOptions, setSpeciesOptions] = useState<Option[]>([])
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const prevFiltersRef = useRef(filters)

  useEffect(() => {
    axios.get<string[]>('/notices/categories')
      .then(({ data }) => setCategoryOptions(data.map(i => ({ label: i, value: i }))))
    axios.get<string[]>('/notices/sex')
      .then(({ data }) => setSexOptions(data.map(i => ({ label: i, value: i }))))
    axios.get<string[]>('/notices/species')
      .then(({ data }) => setSpeciesOptions(data.map(i => ({ label: i, value: i }))))
  }, [])

  useEffect(() => {
    if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
      const params = buildApiParams(filters)
      onFilterChange(filters)
      prevFiltersRef.current = filters
    }
  }, [filters, onFilterChange])

  const handleChange = (key: keyof Filters, value: any) => {
    if (key === 'sort' && filters.sort === value) value = null
    setFilters(prev => ({ ...prev, [key]: value }))
  }

const loadCityOptions = useCallback(async (inputValue: string) => {
  if (inputValue.length < 3) return []
  const { data } = await axios.get<{ _id: string; cityEn: string }[]>(`/cities?keyword=${inputValue}`);
  return data.map(c => ({
    label: c.cityEn,
    value: c._id,
  }));
}, [])
  
  

  const sortOptions: Filters['sort'][] = ['popular', 'unpopular', 'cheap', 'expensive']

  return (
    <div className={s.form}>
      <div className={s.filtersWrapper}>
          <SearchField
            value={filters.search}
            onChange={e => handleChange('search', e.target.value)}
            onSearch={query => handleChange('search', query)}
            placeholder="Search"
          />

          <div className={s.wrapperCategory}>
            <CustomSelect options={categoryOptions} value={filters.category}
              onChange={v => handleChange('category', v)} placeholder="Category" />
            <CustomSelect options={sexOptions} value={filters.sex}
              onChange={v => handleChange('sex', v)} placeholder="By gender" />
          </div>

        <div className={s.typeWrapper}>
          <div className={s.speciesWrapper}>
            <CustomSelect options={speciesOptions} value={filters.species}
              onChange={v => handleChange('species', v)} placeholder="By type" />
          </div>
            <div className={s.cityWrapper}>
              <AsyncSelect
                value={filters.city}
                onChange={v => handleChange('city', v)}
                placeholder="Location"
                cacheOptions
                defaultOptions
                isClearable
                loadOptions={loadCityOptions}
                styles={{
                  ...customSelectStyles,
                  control: (provided, state) => ({
                    ...customSelectStyles.control(provided, state),
                    minHeight: isMobile ? 42 : 48,
                  }),
                  singleValue: (provided) => ({
                    ...customSelectStyles.singleValue(provided),
                    fontSize: isMobile ? 14 : 16,
                  }),
                  option: (provided, state) => ({
                    ...customSelectStyles.option(provided, state),
                    fontSize: isMobile ? 14 : 16,
                  }),
                  placeholder: (provided) => ({
                    ...customSelectStyles.placeholder(provided),
                    fontSize: isMobile ? 14 : 16,
                  }),
                }}
                components={{
                  DropdownIndicator,
                  ClearIndicator,
                  Input,
                }}
                classNamePrefix="custom"
              />
            </div>
          </div>
      </div>

      <div className={s.btnWrapper}>
        <div className={s.radioGroup}>
          {sortOptions.map(sortOption => {
            const isSelected = filters.sort === sortOption;
            return (
              <div
                key={sortOption!}
                className={`${s.radioWrapper} ${isSelected ? s.selected : ''}`}
              >
                <label>
                  <input
                    type="radio"
                    name="sort"
                    value={sortOption!}
                    checked={isSelected}
                    onChange={() => handleChange('sort', sortOption)}
                  />
                  {sortOption!.charAt(0).toUpperCase() + sortOption!.slice(1)}
                </label>
                {isSelected && (
                  <svg
                    className={s.clearSort}
                    width={18}
                    height={18}
                    onClick={() => handleChange('sort', null)}
                  >
                    <use href="/icons.svg#icon-x" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

          <button type="button" onClick={() => setFilters(defaultFilters)}
            className={s.resetBtn}>
            Reset
          </button>
        </div>
    </div>
  )
}