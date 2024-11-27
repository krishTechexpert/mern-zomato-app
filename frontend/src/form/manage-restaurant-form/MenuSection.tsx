import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import MenuItemInput from './MenuItemInput';

export default function MenuSection() {
  const {control} = useFormContext();
  //here below fields contains Array which has [{name:'',price:0}] default value hai
  // append -> add menu item in fields array
  // remove -> remove menu item in fields array
  // useField Array is used here to make input dynamic [onclick add new input]
  const{fields,append,remove}=useFieldArray({
    control,
    name:"menuItems"
  })
  return (
    <div className='space-y-2'>
      <div className='pb-6'>
        <h2 className='text-2xl font-bold'>Menu</h2>
        <FormDescription>
          create your menu and give each item a name and a price
        </FormDescription>
      </div>
      {/**  field yha per menuItems property hai jo ki ek array hai of objects such as [{name:'burger',price:30}] */}
      <FormField control={control} name="menuItems" render={() => (
      <FormItem>
        <div className='flex flex-col gap-2'>
          {/** 
           * _underscore: value is not used but since we need the index so we have to specify this like below(_,index)
           */}
          {fields.map((_,index) => (
            <MenuItemInput key={index} index={index} removeMenuItem={() => remove(index)} />
          ))}
        </div>
      </FormItem>
      )} />
      <Button type="button" onClick={() => append({name:'',price:''})}>Add Menu Item</Button>
    </div>
  )
}
