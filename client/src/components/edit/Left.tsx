import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EditGuideFormData } from '@/lib/schemas';
import { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';

const Left = ({ form }: { form: UseFormReturn<EditGuideFormData> }) => {
  const [img, setImg] = useState<string>('');

  return (
    <div className="guide-edit__form-box">
      <div className="flex flex-row w-full gap-4 mb-5">
        <div className="guide-edit__form-thumbnail">
          <Image
            key={img || '/placeholder.svg'}
            src={img || '/placeholder.svg'}
            alt="guide thumbnail"
            width={400}
            height={350}
            priority
            className="w-full h-full object-cover transition-transform"
          />
        </div>
        <div className="flex flex-col gap-4 w-2/5">
          <Label>Thumbnail</Label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setImg(file ? URL.createObjectURL(file) : '');
            }}
          />
        </div>
      </div>

      <Form {...form}>
        <form className="gap-4 sm:w-4/5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel className="guide-edit__form-label">Title</FormLabel>
                <FormControl>
                  <Input {...field} className="guide-edit__form-input" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel className="guide-edit__form-label">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="guide-edit__form-textarea" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Left;
