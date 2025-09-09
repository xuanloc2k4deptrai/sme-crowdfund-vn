import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { createCampaign } from '../../services/campaignService';
import Button from '../../components/ui/Button';
import PrivateRoute from '../../components/auth/PrivateRoute';

// Validation schema for campaign creation
const campaignSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  summary: z.string().min(20, { message: "Summary must be at least 20 characters" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters" }),
  target: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 10000000, {
    message: "Funding target must be at least 10,000,000 VND"
  }),
  imageUrl: z.string().url({ message: "Please enter a valid URL for the image" }).optional().or(z.literal('')),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

const CreateCampaignPage = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: '',
      summary: '',
      description: '',
      target: '',
      imageUrl: ''
    }
  });
  
  const onSubmit = async (data: CampaignFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const campaignData = {
        ...data,
        target: Number(data.target),
      };
      
      await createCampaign(campaignData);
      router.push('/campaigns');
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to create campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {submitError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Title *
              </label>
              <input
                id="title"
                type="text"
                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.title ? 'border-red-500' : ''
                }`}
                {...register('title')}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                Summary *
              </label>
              <input
                id="summary"
                type="text"
                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.summary ? 'border-red-500' : ''
                }`}
                {...register('summary')}
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Full Description *
              </label>
              <textarea
                id="description"
                rows={6}
                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.description ? 'border-red-500' : ''
                }`}
                {...register('description')}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
                Funding Target (VND) *
              </label>
              <input
                id="target"
                type="number"
                min="10000000"
                step="1000000"
                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.target ? 'border-red-500' : ''
                }`}
                {...register('target')}
              />
              {errors.target && (
                <p className="mt-1 text-sm text-red-600">{errors.target.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">Minimum target amount: 10,000,000 VND</p>
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                  errors.imageUrl ? 'border-red-500' : ''
                }`}
                {...register('imageUrl')}
              />
              {errors.imageUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => router.back()}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Campaign'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
};

// Add getServerSideProps to avoid SSR issues
export const getServerSideProps = async () => {
  return {
    props: {}
  };
};

export default CreateCampaignPage;
