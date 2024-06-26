import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../src";

describe("Button", () => {
  it("should render correctly", () => {
    const wrapper = render(<Button>Button</Button>);
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
