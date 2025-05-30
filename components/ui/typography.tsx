import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type WrapperProps = {
    children: ReactNode;
    className?: string;
};

export function TypographyH1({ children, className }: WrapperProps) {
    return (
        <h1 className={cn("scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance", className)}>
            {children}
        </h1>
    )
}


export function TypographyH2({ children, className }: WrapperProps) {
    return (
        <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
            {children}
        </h2>
    )
}

export function TypographyH3({ children, className }: WrapperProps) {
    return (
        <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
            {children}
        </h3>
    )
}

export function TypographyH4({ children, className }: WrapperProps) {
    return (
        <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
            {children}
        </h4>
    )
}
