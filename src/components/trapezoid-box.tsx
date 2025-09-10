import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/libs/cn";

interface TrapezoidBoxProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "red" | "white" | "dark-red";
}

const TrapezoidBox = forwardRef<HTMLDivElement, TrapezoidBoxProps>(
    ({ className, variant = "white", children, ...rest }, ref) => {
        return (
            <div
                ref={ref}
                {...rest}
                className={cn(
                    "skew-x-[-10deg] inline-block px-6 py-3 shadow-md",
                    variant === "red" && "bg-[#FF0000] text-white",
                    variant === "dark-red" && "bg-[#E20613] text-white",
                    variant === "white" && "bg-white text-black",
                    className
                )}
            >
                {/* counter-skew so text looks normal */}
                <div className="skew-x-[10deg]">{children}</div>
            </div>
        );
    }
);

TrapezoidBox.displayName = "TrapezoidBox";

export { TrapezoidBox };
