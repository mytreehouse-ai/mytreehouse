import { create } from "zustand";

type Step = {
  steps: {
    id: string;
    value: string;
    label: string;
  }[];
};

interface StepValue {
  id: string;
  name: string;
  status: any;
}

interface StepperState {
  steps: StepValue[];
  currentStepIndex: number;
}

type StepperActions = {
  setCurrentStepIndex: (index: number) => void;
  markStepAsComplete: (id: string) => void;
};

const initialSteps: StepValue[] = [
  { id: "Step 1", name: "Property", status: "current" },
  { id: "Step 2", name: "Personal", status: "upcoming" },
  { id: "Step 3", name: "Results", status: "upcoming" },
];

const initialState: StepperState = {
  steps: initialSteps,
  currentStepIndex: 0,
};

const switchStepStatus = (
  step: StepValue,
  index: number,
  currentIndex: number,
) => {
  if (index === currentIndex) {
    return { ...step, status: "current" };
  } else if (index < currentIndex) {
    return { ...step, status: "complete" };
  } else {
    return { ...step, status: "upcoming" };
  }
};

const ValuationStepper = create<StepperState & StepperActions>((set) => ({
  ...initialState,
  setCurrentStepIndex: (index: number) => {
    set((state) => {
      const updatedSteps = state.steps.map((step, i) =>
        switchStepStatus(step, i, index),
      );

      return {
        ...state,
        currentStepIndex: index,
        steps: updatedSteps,
      };
    });
  },
  markStepAsComplete: (id: string) => {
    set((state) => {
      const updatedSteps = state.steps.map((step) =>
        step.id === id ? { ...step, status: "complete" } : step,
      );

      return {
        ...state,
        steps: updatedSteps,
      };
    });
  },
}));

export default ValuationStepper;
