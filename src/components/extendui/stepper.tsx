/**
 * @file Extend UI-style stepper primitive for dossier workflow progress.
 * Adapted from the extendlabs/ui registry Stepper component.
 */
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const stepperVariants = cva("group/stepper inline-flex", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const stepperItemVariants = cva("group/step flex items-center", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const indicatorVariants = cva(
  "relative flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-muted-foreground data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground",
        outline:
          "border-2 border-muted bg-transparent text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:border-primary data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground",
        dotted:
          "border-2 border-dotted border-muted bg-transparent text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:border-primary data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type StepState = "active" | "completed" | "inactive" | "loading";

type StepperContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
  separatorWidth: string;
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
};

const StepperContext = React.createContext<StepperContextValue | undefined>(
  undefined
);
const StepItemContext = React.createContext<StepItemContextValue | undefined>(
  undefined
);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) throw new Error("useStepper must be used within Stepper");
  return context;
}

function useStepItem() {
  const context = React.useContext(StepItemContext);
  if (!context) throw new Error("useStepItem must be used within Stepper.Item");
  return context;
}

interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  defaultValue?: number;
  value?: number;
  separatorWidth?: number;
  onValueChange?: (value: number) => void;
}

const StepperRoot = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      defaultValue = 0,
      value,
      separatorWidth = 56,
      onValueChange,
      orientation = "horizontal",
      className,
      ...props
    },
    ref
  ) => {
    const [activeStep, setInternalStep] = React.useState(defaultValue);
    const currentStep = value ?? activeStep;

    const setActiveStep = React.useCallback(
      (step: number) => {
        if (value === undefined) setInternalStep(step);
        onValueChange?.(step);
      },
      [onValueChange, value]
    );

    return (
      <StepperContext.Provider
        value={{
          activeStep: currentStep,
          setActiveStep,
          orientation: orientation ?? "horizontal",
          separatorWidth: `${separatorWidth}px`,
        }}
      >
        <div
          ref={ref}
          data-slot="stepper"
          data-orientation={orientation}
          className={cn(stepperVariants({ orientation }), className)}
          {...props}
        />
      </StepperContext.Provider>
    );
  }
);
StepperRoot.displayName = "Stepper";

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  (
    { step, completed = false, disabled = false, loading = false, className, children, ...props },
    ref
  ) => {
    const { activeStep, orientation } = useStepper();
    const state: StepState =
      completed || step < activeStep
        ? "completed"
        : activeStep === step
          ? "active"
          : "inactive";
    const isLoading = loading && step === activeStep;

    return (
      <StepItemContext.Provider
        value={{
          step,
          state: isLoading ? "loading" : state,
          isDisabled: disabled,
          isLoading,
        }}
      >
        <div
          ref={ref}
          data-slot="stepper-item"
          data-state={state}
          data-loading={isLoading || undefined}
          className={cn(stepperItemVariants({ orientation }), className)}
          {...props}
        >
          {children}
        </div>
      </StepItemContext.Provider>
    );
  }
);
StepperItem.displayName = "StepperItem";

type StepperTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { setActiveStep } = useStepper();
    const { step, isDisabled } = useStepItem();

    return (
      <button
        ref={ref}
        type="button"
        data-slot="stepper-trigger"
        className={cn(
          "inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={() => setActiveStep(step)}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
StepperTrigger.displayName = "StepperTrigger";

interface StepperIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof indicatorVariants> {}

const StepperIndicator = React.forwardRef<HTMLSpanElement, StepperIndicatorProps>(
  ({ className, variant, children, ...props }, ref) => {
    const { state, step, isLoading } = useStepItem();

    return (
      <span
        ref={ref}
        data-slot="stepper-indicator"
        data-state={state}
        className={cn(indicatorVariants({ variant }), className)}
        {...props}
      >
        {children ?? (
          <>
            <span className="transition-all group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0 group-data-loading/step:scale-0 group-data-loading/step:opacity-0">
              {step}
            </span>
            <CheckIcon
              className="absolute scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
              size={16}
              aria-hidden="true"
            />
            {isLoading && (
              <LoaderCircleIcon
                className="absolute animate-spin"
                size={14}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </span>
    );
  }
);
StepperIndicator.displayName = "StepperIndicator";

const StepperTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="stepper-title"
    className={cn("text-sm font-medium", className)}
    {...props}
  />
));
StepperTitle.displayName = "StepperTitle";

const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="stepper-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
StepperDescription.displayName = "StepperDescription";

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation, separatorWidth } = useStepper();

  return (
    <div
      ref={ref}
      data-slot="stepper-separator"
      className={cn(
        "m-1.5 bg-muted group-data-[state=completed]/step:bg-primary",
        orientation === "horizontal" ? "h-0.5 flex-1" : "w-0.5",
        className
      )}
      style={{
        ...(orientation === "horizontal" ? { width: separatorWidth } : {}),
        ...(orientation === "vertical" ? { height: separatorWidth } : {}),
      }}
      {...props}
    />
  );
});
StepperSeparator.displayName = "StepperSeparator";

type StepperType = typeof StepperRoot & {
  Item: typeof StepperItem;
  Trigger: typeof StepperTrigger;
  Indicator: typeof StepperIndicator;
  Title: typeof StepperTitle;
  Description: typeof StepperDescription;
  Separator: typeof StepperSeparator;
};

const Stepper = StepperRoot as StepperType;

Stepper.Item = StepperItem;
Stepper.Trigger = StepperTrigger;
Stepper.Indicator = StepperIndicator;
Stepper.Title = StepperTitle;
Stepper.Description = StepperDescription;
Stepper.Separator = StepperSeparator;

export { Stepper };
