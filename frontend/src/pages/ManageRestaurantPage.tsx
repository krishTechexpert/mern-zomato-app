import { useCreateMyRestaurant, useUpdateMyRestaurant, usegetMyRestaurant } from '@/api/MyRestaurantApi';
import ManageRestaurantForm from '@/form/manage-restaurant-form/ManageRestaurantForm'

export default function ManageRestaurantPage() {
  const {restaurant}=usegetMyRestaurant();
  const {isLoading:isCreating,createRestaurant} = useCreateMyRestaurant();
  const {isLoading:isUpdating,updateRestaurant}=useUpdateMyRestaurant();

  const isEditing = !!restaurant; // give true if restaurant exits otherwise undefined(falsy)

  return (
    <ManageRestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant: createRestaurant} isLoading={isCreating ||isUpdating} />
  )
}
