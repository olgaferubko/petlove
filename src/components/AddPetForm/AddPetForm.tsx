import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';

import { addPetSchema } from '../../validations/addPetSchema';
import s from './AddPetForm.module.css';

import SpeciesSelect from '../SpeciesSelect/SpeciesSelect';
import DatePickerField from '../DatePickerField/DatePickerField';

const AddPetForm = () => {
  const navigate = useNavigate();
  const [selectedSex, setSelectedSex] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      imgUrl: '',
      title: '',
      name: '',
      birthday: '',
      species: '',
      sex: '',
    },
  });

const onSubmit = async (data: any) => {
  try {
    const res = await fetch('/api/users/current/pets/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to add pet');
    }

    toast.success('Pet added successfully!');
    navigate('/profile');
  } catch (err: any) {
    toast.error(err.message);
  }
};

  const handleBack = () => {
    navigate('/profile');
  };

  const handleSexChange = (sex: string) => {
    setSelectedSex(sex);
    setValue('sex', sex);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setValue('imgUrl', reader.result, { shouldValidate: true });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <p className={s.title}>Add my pet /<span className={s.decor}>Personal details</span></p>
      <div className={s.sexButtons}>
        <button
          type="button"
          onClick={() => handleSexChange('female')}
          className={`${s.femaleButton} ${selectedSex === 'female' ? s.selectedFemale : ''}`}
        >
          <svg className={`${s.femaleIcon} ${selectedSex === 'female' ? s.selectedFemaleIcon : ''}`} 
            width={20} height={20}>
            <use href="/icons.svg#icon-female" />
          </svg>
        </button>
              
        <button
          type="button"
          onClick={() => handleSexChange('male')}
          className={`${s.maleButton} ${selectedSex === 'male' ? s.selectedMale : ''}`}
        >
          <svg className={`${s.maleIcon} ${selectedSex === 'male' ? s.selectedMaleIcon : ''}`}
            width={20} height={20}>
            <use href="/icons.svg#icon-male" />
          </svg>
        </button>
              
        <button
          type="button"
          onClick={() => handleSexChange('other')}
          className={`${s.otherButton} ${selectedSex === 'other' ? s.selectedOther : ''}`}
        >
          <svg className={`${s.otherIcon} ${selectedSex === 'other' ? s.selectedOtherIcon : ''}`}
            width={20} height={20}>
            <use href="/icons.svg#icon-other" />
          </svg>
        </button>
      </div>
      {errors.sex && <p className={s.error}>{errors.sex.message}</p>}

        <div className={s.imagePreview}>
          {watch('imgUrl') ? (
            <img src={watch('imgUrl')} alt="Pet preview" className={s.previewImage} />
          ) : (
            <svg className={s.footprint}  width={34} height={34}>
              <use href="/icons.svg#icon-footprint" />
            </svg>
          )}
        </div>

        <div className={s.inputGroup}>
          <input {...register('imgUrl')} placeholder="Enter URL" className={`${s.input} ${watch('imgUrl') ? s.filled : ''}`} />
          <button type="button" className={s.uploadButton} onClick={handleUploadClick}>
                Upload photo
                <svg className={s.iconUpload} width={20} height={20}>
                    <use href="/icons.svg#icon-upload" />
                </svg>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {errors.imgUrl && <p className={s.error}>{errors.imgUrl.message}</p>}

      <input className={`${s.titleNotice} ${watch('title') ? s.filled : ''}`} {...register('title')} placeholder="Title" />
      {errors.title && <p className={s.error}>{errors.title.message}</p>}

      <input className={`${s.titleNotice} ${watch('name') ? s.filled : ''}`} {...register('name')} placeholder="Pet's Name" />
      {errors.name && <p className={s.error}>{errors.name.message}</p>}
      <div className={s.pickWrapper}>
          <div className={s.speciesWrapper}>
              <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                  <DatePickerField
                    selected={field.value ? new Date(field.value) : null}
                    onChange={field.onChange}
                    placeholderText="00.00.0000"
                  />
                  )}
              />
              {errors.birthday && <p className={s.error}>{errors.birthday.message}</p>}
          </div>
          <div className={s.speciesWrapper}>
              <SpeciesSelect
                  control={control}
                  name="species"
                  rules={{ required: 'Species is required' }}
              />
            {errors.species && <p className={s.error}>{errors.species.message}</p>}
          </div>
      </div>
      <div className={s.buttonGroup}>
        <button className={s.backBtn} type="button" onClick={handleBack}>
          Back
        </button>
        <button className={s.submitBtn} type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddPetForm;