/**
 * @file Extend UI-style banner primitive for prominent audit callouts.
 * Adapted from the extendlabs/ui registry Banner component.
 */
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "relative flex w-full items-center text-sm font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-accent text-foreground",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        success: "bg-green-600 text-white",
        warning: "bg-amber-500 text-white",
        info: "bg-blue-600 text-white",
        outline: "border border-input bg-background",
        subtle: "bg-muted text-muted-foreground",
        ghost: "text-foreground",
      },
      position: {
        top: "left-0 top-0 w-full",
        bottom: "bottom-0 left-0 w-full",
        center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
        static: "relative w-full",
      },
      size: {
        default: "px-4 py-3",
        sm: "px-3 py-2 text-xs",
        lg: "px-6 py-4",
      },
      width: {
        default: "w-full",
        auto: "w-auto",
        fixed: "max-w-md",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "static",
      size: "default",
      width: "default",
    },
  }
);

type BannerElementCheck = {
  hasDismiss: boolean;
  hasDescription: boolean;
};

type BannerContextValue = {
  handleDismiss: () => void;
  elementChecks: BannerElementCheck;
};

const BannerContext = React.createContext<BannerContextValue | undefined>(
  undefined
);

function useBannerContext() {
  const context = React.useContext(BannerContext);
  if (!context) {
    throw new Error("Banner components must be used within Banner");
  }
  return context;
}

function hasChildComponent(
  children: React.ReactNode,
  component: unknown
) {
  return React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === component
  );
}

interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  defaultVisible?: boolean;
  onDismiss?: () => void;
}

const BannerRoot = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant,
      position,
      size,
      width,
      defaultVisible = true,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(defaultVisible);
    const resolvedPosition = position ?? "static";

    const handleDismiss = React.useCallback(() => {
      setIsVisible(false);
      onDismiss?.();
    }, [onDismiss]);

    const elementChecks = React.useMemo(
      () => ({
        hasDismiss: hasChildComponent(children, BannerDismiss),
        hasDescription: hasChildComponent(children, BannerDescription),
      }),
      [children]
    );

    if (!isVisible) return null;

    return (
      <BannerContext.Provider value={{ handleDismiss, elementChecks }}>
        <div
          ref={ref}
          role="alert"
          className={cn(
            bannerVariants({ variant, position: resolvedPosition, size, width }),
            resolvedPosition !== "static" && "absolute z-50",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "flex w-full items-center justify-between gap-3",
              elementChecks.hasDismiss && "pr-8"
            )}
          >
            {children}
          </div>
        </div>
      </BannerContext.Provider>
    );
  }
);
BannerRoot.displayName = "Banner";

interface BannerIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const BannerLeftIcon = React.forwardRef<HTMLSpanElement, BannerIconProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("flex shrink-0 items-center", className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </span>
  )
);
BannerLeftIcon.displayName = "Banner.LeftIcon";

interface BannerDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "center" | "right";
}

const BannerDescription = React.forwardRef<HTMLDivElement, BannerDescriptionProps>(
  ({ className, position = "left", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 text-sm",
        position === "left" && "text-left",
        position === "center" && "text-center",
        position === "right" && "text-right",
        className
      )}
      {...props}
    />
  )
);
BannerDescription.displayName = "Banner.Description";

interface BannerDismissProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const BannerDismiss = React.forwardRef<HTMLButtonElement, BannerDismissProps>(
  ({ className, onClick, icon = <X className="h-4 w-4" />, ...props }, ref) => {
    const { handleDismiss } = useBannerContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          handleDismiss();
          onClick?.(event);
        }}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-70 transition-all hover:bg-black/10 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2",
          className
        )}
        aria-label="Dismiss"
        {...props}
      >
        {icon}
      </button>
    );
  }
);
BannerDismiss.displayName = "Banner.Dismiss";

const Banner = Object.assign(BannerRoot, {
  LeftIcon: BannerLeftIcon,
  Description: BannerDescription,
  Dismiss: BannerDismiss,
});

export { Banner, bannerVariants };
