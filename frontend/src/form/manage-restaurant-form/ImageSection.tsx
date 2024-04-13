import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useFormContext } from 'react-hook-form'

export default function ImageSection() {
  const {control,watch}=useFormContext(); // retrive all hooks method
  const existingImageurl=watch("imageFile")
  return (
    <div className='space-y-2'>
      <div className='pb-6'>
        <h2 className='text-2xl font-bold'>Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the search result 
        </FormDescription>
      </div>
      <div className='flex flex-col gap-8 md:w-[50%]'>
        {existingImageurl && <>
          <AspectRatio ratio={16/9}>
            <img src={existingImageurl} className='rounded-md h-full w-full objec-cover'/>
          </AspectRatio>
        </>}
          <FormField control={control} name="imageFile" render={({field}) => (
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
