import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Restaurant } from "@/types";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const formSchema = z.object({
  restaurantName: z.string({ required_error: "rastaurant name is required" }),
  city: z.string({ required_error: "city is required" }),
  country: z.string({ required_error: "country is required" }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be valid number"
  }), // convert string into number
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimate delivery time is required",
    invalid_type_error: "must be valid number"
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item"
  }),
  menuItems: z.array(z.object({
    name: z.string().min(1, "name is required"),
    price: z.coerce.number().min(1, "price is required")
  })),
  imageUrl:z.string().optional(),
  imageFile: z.instanceof(File, { message: "image is required" }).optional()
}).refine((data)=> data.imageFile || data.imageUrl,{
    message:"Either image Url or image File must be provided",
    path:["imageFile"]
})

type RestaurantFormData = z.infer<typeof formSchema>

type RestaurantProps = {
  restaurant?:Restaurant,
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
}

function ManageRestaurantForm({ onSave, isLoading,restaurant }: RestaurantProps) {
  const navigate=useNavigate();
  //here form: all the useForm return props
  // try to used only one useform hook 
  // nested component [such as cuisineSection,MenuSection below etc] k liye humko {control}=useFormcontext used kerna hoga who can retrive all methods
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }]
    }
  })

  useEffect(() => {
    if(!restaurant){
      return;
    }    
    form.reset(restaurant)
  },[form,restaurant])

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)

    // make price in decimal format for consistency , for stripe implementaion follow lowest denominatio for different-2 country such as 
    //1GBP=100pence
    //1.5GBP= 150 pence < lowest denomintaion

    formData.append("deliveryPrice",formDataJson.deliveryPrice.toString()) // 50.00
    formData.append("estimatedDeliveryTime",formDataJson.estimatedDeliveryTime.toString())

    formDataJson.cuisines.map((cuisine,index) => {
      formData.append(`cuisines[${index}]`,cuisine)
    })

    formDataJson.menuItems.map((menuItem,index) => {
      formData.append(`menuItems[${index}][name]`,menuItem.name)
      formData.append(`menuItems[${index}][price]`,menuItem.price.toString())
    })
    if(formDataJson.imageFile){
      formData.append("imageFile",formDataJson.imageFile)
    }
    onSave(formData)
    navigate('/manage-restaurant')

  }

  return (
    <Form {...form}>  {/*pass all props into the context */}
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'>
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  )
}


export default ManageRestaurantForm
