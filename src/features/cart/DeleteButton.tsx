
import { useDispatch } from 'react-redux';
import Button from '../../UI/Button'
import { deleteItem } from './cartSlice';




const DeleteButton = ({ pizzaId }: { pizzaId: number }): JSX.Element => {
    const dispatch = useDispatch();

    const handleDeleteItem = (): void => {
        dispatch(deleteItem(pizzaId));
      };
  return (
    <Button onClick={handleDeleteItem} type="small">Delete</Button>
  )
}

export default DeleteButton