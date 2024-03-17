import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form'

export default function ImageSection() {
  const {control}=useFormContext(); // retrive all hooks method
  return (
    <div className='space-y-2'>
      <div className='pb-6'>
        <h2 className='text-2xl font-bold'>Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the search result 
        </FormDescription>
      </div>
      <div className='flex flex-col gap-8 w-[50%]'>
          <FormField control={control} name="imageUrl" render={({field}) => (
            <FormItem>
              <FormControl>
                <Input className='bg-white' type='file' accept='.jpg,.png,.jpeg'
                  onChange={(e) => field.onChange(e.target.files? e.target.files[0]:null)}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
      </div>
    </div>
  )
}
