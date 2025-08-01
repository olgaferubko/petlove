import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import toast from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';

import { addPetSchema } from '../../validations/addPetSchema';
import { addUserPet } from '../../redux/pets/operations';
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
      imgURL: '',
      title: '',
      name: '',
      birthday: '',
      species: '',
      sex: '',
    },
  });

const dispatch = useDispatch<AppDispatch>();

const onSubmit = async (data: any) => {
  try {
    const normalizedBirthday = typeof data.birthday === 'string'
      ? formatBirthday(data.birthday)
      : new Date(data.birthday).toISOString().split('T')[0];

    const normalizedData = {
      ...data,
      species: data.species.toLowerCase(),
      birthday: normalizedBirthday,
    };

const result = await dispatch(addUserPet(normalizedData)).unwrap();
if (result && result._id) {
  toast.success('Pet added successfully!');
  navigate('/profile');
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err: any) {
    console.log('ADD PET ERROR:', err);
    toast.error(typeof err === 'string' ? err : err?.message || 'Unexpected error');
  }
};

const formatBirthday = (input: string): string => {
  const [day, month, year] = input.split('.');
  return `${year}-${month}-${day}`;
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
        setValue('imgURL', reader.result, { shouldValidate: true });
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
          {watch('imgURL') ? (
            <img src={watch('imgURL')} alt="Pet preview" className={s.previewImage} />
          ) : (
            <svg className={s.footprint}  width={34} height={34}>
              <use href="/icons.svg#icon-footprint" />
            </svg>
          )}
        </div>

        <div className={s.inputGroup}>
          <input {...register('imgURL')} placeholder="Enter URL" className={`${s.input} ${watch('imgURL') ? s.filled : ''}`} />
          <div className={s.uploadButton}>
            Upload photo
            <svg className={s.iconUpload} width={20} height={20}>
              <use href="/icons.svg#icon-upload" />
            </svg>
          </div>
        </div>
        {errors.imgURL && <p className={s.error}>{errors.imgURL.message}</p>}

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