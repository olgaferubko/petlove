import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PetsItem from '../PetsItem/PetsItem';
import { getUserPets, deleteUserPet } from '../../redux/pets/operations';
import { AppDispatch } from '../../redux/store';
import { toast } from 'react-hot-toast';

interface Pet {
  _id: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  species: string;
  imgURL?: string;
}

const PetsList = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  const fetchPets = async () => {
    const action = await dispatch(getUserPets());
    if (getUserPets.fulfilled.match(action)) {
      setPets(action.payload);
    } else {
      console.error('Failed to fetch pets', action.payload);
    }
  };

  fetchPets();
}, [dispatch]);

const handleDelete = async (id: string) => {
  try {
    const resultAction = await dispatch(deleteUserPet(id));

    if (deleteUserPet.fulfilled.match(resultAction)) {
      setPets(prev => prev.filter(p => p._id !== id));
      toast.success('Pet deleted successfully');
    } else {
      toast.error(resultAction.payload || 'Failed to delete pet');
      console.error('Failed to delete:', resultAction.payload);
    }
  } catch (err) {
    toast.error('An unexpected error occurred');
    console.error('Unexpected error', err);
  }
};

  return (
    <ul>
      {pets.map(pet => (
        <PetsItem key={pet._id} pet={pet} onDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default PetsList;