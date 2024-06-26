import { type ComponentPropsWithAs } from "@jamsr-ui/utils";
import { Children, useCallback, useMemo, useState } from "react";
import {
  AccordionProvider,
  type AccordionContextType,
} from "./accordion-context";
import { useAccordion, type UseAccordionProps } from "./use-accordion";

export const ItemProvider = (
  props: AccordionContextType & {
    children: React.ReactNode;
  },
) => {
  const { index, isOpen, onChangeIndex, children } = props;
  const value = useMemo(
    () => ({ index, isOpen, onChangeIndex }),
    [index, isOpen, onChangeIndex],
  );
  return (
    <AccordionProvider
      key={index}
      value={value}
    >
      {children}
    </AccordionProvider>
  );
};

export type AccordionProps = UseAccordionProps;

export const Accordion = <T extends React.ElementType = "div">(
  props: ComponentPropsWithAs<T, AccordionProps>,
) => {
  const { Component, children, getBaseProps } = useAccordion(props);
  const [activeIndex, setActiveIndex] = useState(-1);
  const onChangeIndex = useCallback(
    (index: number) => setActiveIndex(index),
    [],
  );

  return (
    <Component
      data-component="accordion"
      data-slot="base"
      {...getBaseProps()}
    >
      {Children.map(children, (child, index) => {
        const isOpen = activeIndex === index;
        return (
          <ItemProvider
            key={index}
            isOpen={isOpen}
            index={index}
            onChangeIndex={onChangeIndex}
          >
            {child}
          </ItemProvider>
        );
      })}
    </Component>
  );
};
