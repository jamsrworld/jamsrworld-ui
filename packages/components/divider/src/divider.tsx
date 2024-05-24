import { type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export const Divider = (props: Props) => {
  return (
    <div
      className="bg-blue-50"
      {...props}
    >
      Divider
    </div>
  );
};