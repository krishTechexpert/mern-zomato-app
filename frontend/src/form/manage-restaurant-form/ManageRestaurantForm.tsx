import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {z} from "zod";
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  restaurantName: z.string({required_error:"rastaurant name is required"}),
  city: z.string({required_error:"city is required"}),
  country: z.string({required_error:"country is required"}),
  deliveryPrice:z.coerce.number({
    required_error:"delivery price is required",
    invalid_type_error:"must be valid number"
  }), // convert string into number
  estimatedDeliveryTime:z.coerce.number({
    required_error:"estimate delivery time is required",
    invalid_type_error:"must be valid number"
  }),
  cuisines:z.array(z.string()).nonempty({
    message:"please select at least one item"
  }),
  menuItems:z.array(z.object({
    name:z.string().min(1,"name is required"),
    price:z.coerce.number().min(1,"price is required")
  })),
  imageUrl:z.instanceof(File,{message:"image is required"})
})

type restaurantFormData=z.infer<typeof formSchema>

type RestaurantProps = {
  onSave:(restaurantFormData:FormData) => void;
  isLoading:boolean;
}

function ManageRestaurantForm({onSave,isLoading}:RestaurantProps) {
  //here form: all the useForm return props
  // try to used only one useform hook 
  // nested component [such as cuisineSection,MenuSection below etc] k liye humko {control}=useFormcontext used kerna hoga who can retrive all methods
  const form = useForm<restaurantFormData>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      cuisines:[],
      menuItems:[{ name:'',price:0 }]
    }
  })

  const onSubmit=(formDataJson:restaurantFormData) => {
    //TODO - convert formDataJson to a new formData Object
    console.log("my form",formDataJson)
  }

  return (
     <Form {...form}>  {/*pass all props into the context */}
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'>
        <DetailsSection />
        <Separator/>
        <CuisinesSection/>
        <Separator/>
        <MenuSection/>
        <Separator/>
        <ImageSection/>
        {isLoading? <LoadingButton/> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
    )
}


export default ManageRestaurantForm
