import React, { ComponentPropsWithoutRef, ElementType } from "react";
import s from "./Typography.module.css";

type VariantType = "a" | "p" | "h1" | "h2" | "h3" | 'small';

type TypographyProps = {
  variant: VariantType;
  className?: string;
} & ComponentPropsWithoutRef<VariantType>;

export const Typography = ({ variant, className, ...restProps }: TypographyProps) => {
  const Component = variant as ElementType;

  return <Component className={`${s[variant]} ${className || ""}`} {...restProps} />;
};
