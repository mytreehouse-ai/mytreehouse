import { create } from "zustand";
import { z } from "zod";
import {
  propertyValuationFormSchema,
  personalDetailsFormSchema,
} from "@/components/property/valuation";

type PropertyFormType = z.infer<typeof propertyValuationFormSchema>;
type PersonalFormType = z.infer<typeof personalDetailsFormSchema>;

interface FormStore {
  propertyDetailValues: PropertyFormType;
  personalDetailValues: PersonalFormType;
  setPropertyDetailValues: (values: PropertyFormType) => void;
  setPersonalDetailValues: (values: PersonalFormType) => void;
}

const useValuationFormStore = create<FormStore>((set) => ({
  propertyDetailValues: {
    propertyType: "",
    address: "",
    location: "",
    sqm: 0,
    yearBuilt: "",
    whenAreyouLookingToSell: "",
  } as PropertyFormType,
  personalDetailValues: {} as PersonalFormType,
  setPropertyDetailValues: (values) =>
    set(() => ({ propertyDetailValues: values })),
  setPersonalDetailValues: (values) =>
    set(() => ({ personalDetailValues: values })),
}));

export default useValuationFormStore;
