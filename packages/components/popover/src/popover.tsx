import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  type Placement,
} from "@floating-ui/react";
import { useControlledState } from "@jamsr-ui/hooks";
import { cn } from "@jamsr-ui/utils";
import { cloneElement, useRef } from "react";

export type PopoverProps = {
  children: React.ReactNode;
  trigger: JSX.Element;
  initialOpen?: boolean;
  placement?: Placement;
  isModal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  enabled?: boolean;
  triggerOn?: "click" | "hover";
  showArrow?: boolean;
  className?: string;
  applyWidth?: boolean;
  offset?: number;
};

export const Popover = (props: PopoverProps) => {
  const {
    trigger,
    children,
    open: propOpen,
    onOpenChange,
    initialOpen = false,
    isModal = true,
    enabled = true,
    placement = "top",
    triggerOn = "click",
    showArrow = false,
    className,
    applyWidth,
    offset: offsetValue = 4,
  } = props;

  const [open, setOpen] = useControlledState({
    prop: propOpen,
    onChange: onOpenChange,
    defaultProp: initialOpen,
  });
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(offsetValue),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 4,
      }),
      shift({ padding: 4 }),
      showArrow
        ? arrow({
            element: arrowRef,
          })
        : undefined,
      size({
        apply({ rects, elements, availableHeight }) {
          if (!applyWidth) return;
          Object.assign(elements.floating.style, {
            width: `${Math.max(100, rects.reference.width)}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    enabled: triggerOn === "click",
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const hover = useHover(context, {
    enabled: triggerOn === "hover",
    handleClose: safePolygon({ blockPointerEvents: true }),
  });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
    hover,
  ]);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const ref = context.refs.setReference;

  const triggerContent = cloneElement(
    trigger,
    getReferenceProps({
      ref,
    }),
  );
  if (!enabled) return trigger;

  return (
    <>
      {triggerContent}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={isModal}
          >
            <div
              data-component="popover"
              className={cn(
                "z-popover rounded-2xl border border-divider bg-background p-2 shadow-card focus:outline-none",
                className,
              )}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  className="fill-background-neutral"
                />
              )}
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
