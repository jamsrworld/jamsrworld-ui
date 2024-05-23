import { type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export const Skeleton = (props: Props) => {
  return (
    <div
      className="bg-blue-50"
      {...props}
    >
      Skeleton
    </div>
  );
};
