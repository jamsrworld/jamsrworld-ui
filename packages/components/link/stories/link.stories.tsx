import { type Meta, type StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Link } from "../src/link";

const meta = {
  title: "Components/Link",
  component: Link,
  
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Primary" },
};