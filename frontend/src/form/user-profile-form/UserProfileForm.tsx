import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().optional(),
  addressLine1: z.string().min(1, "address Line 1 is required"),
  city: z.string().min(1, "city is required"),
  country: z.string().min(1, "country is required"),
})

type UserFormData = z.infer<typeof formSchema>

type Props = {
  currentUser:UserProps,
  onSave: (userProfileData: UserFormData) => void,
  isLoading: boolean  
}

export default function UserProfileForm({ onSave, isLoading,currentUser }: Props) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues:currentUser
  })
  

  useEffect(() => {
   form.reset(currentUser)
  },[currentUser,form])

  //1.) current user dependecy array
  //jab hum ek page s dosry page per navigate krogy toh UserProfilePage component re-render hga and get the currrent user from api. and put current user in form field using form.reset()

  //2.) form dependency array
  // jab bi form ki value change krogy toh userprofileForm component re-render hoga and form ki value ko update ker dega

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className='space-x-4 space-y-4 bg-gray-50 rounded-lg md-p-10'>
        <div className="p-4">
          <h2 className='text-2xl font-bold'>Hi, {form.getValues("name")} </h2>
          <FormDescription>
            view and change your profile information here
          </FormDescription>
        </div>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} disabled className='bg-white' />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} className='bg-white' />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} />

        <div className='flex flex-col md:flex-row gap-4'>
          <FormField control={form.control} name="addressLine1" render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Address Line1</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />


          <FormField control={form.control} name="country" render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
        </div>
            {isLoading ? <LoadingButton/> : <Button type="submit" className='bg-orange-500'> Submit</Button>}
      </form>
    </Form>
  )
}
