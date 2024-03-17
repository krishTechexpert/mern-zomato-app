import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form'

type Props={
  index:number,
  removeMenuItem:() => void
}

export default function MenuItemInput({index,removeMenuItem}:Props) {
  // control ->  we can link the form fields for the name and price to the use our to the react 
  // to form library
  const {control} =useFormContext();
  return (
    <div className='flex flex-row items-end gap-2'>
      <FormField control={control} name={`menuItems.${index}.name`} // here to make name is unique
        render={({field}) => (
          <FormItem>
            <FormLabel className='flex items-center gap-1'>
              Name <FormMessage/>
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder='Cheese Pizza' className='bg-white'/>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField control={control} name={`menuItems.${index}.price`} 
        render={({field}) => (
          <FormItem>
            <FormLabel className='flex items-center gap-1'>
              Price ⟨₹⟩<FormMessage/>
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder='30' className='bg-white'/>
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="button" onClick={removeMenuItem} className='bg-red-500 max-h-fit'>Delete</Button>
    </div>
  )
}
