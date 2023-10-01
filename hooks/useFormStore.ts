import { create } from 'zustand';
import z from 'zod'
import { propertyValuationFormSchema } from '@/components/property/valuation';

type FormValues = z.infer<typeof propertyValuationFormSchema>;

interface FormStore {
    values: FormValues;
    setValues: (values: FormValues) => void;
}

const useFormStore = create<FormStore>((set) => ({
    values: {
        propertyType: '',
        address: '',
        location: '',
        sqm: 0,
        yearBuilt: '',
        whenAreyouLookingToSell: '',
    } as z.infer<typeof propertyValuationFormSchema>,
    setValues: (values) => set(() => ({ values })),
}));

export default useFormStore