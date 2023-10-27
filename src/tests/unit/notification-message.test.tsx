import { describe, expect, it, vi } from "vitest";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useNotificationMessage } from "../../core/utils/useNotificationMessage";

const ComponentWithNotificationMessage = ({
  wrapperTitle,
  buttonTitle
}: {
  wrapperTitle: string;
  buttonTitle: string;
}) => {
  const [NotificationMessage, handler] = useNotificationMessage();

  return (
    <div title={wrapperTitle}>
      <NotificationMessage />
      <button
        title={buttonTitle}
        type="button"
        onClick={() => handler("Some message")}
      >
        Click me
      </button>
    </div>
  );
};

describe("useNotification hook", () => {
  it("Does not show a message if button is not clicked", async () => {
    const { getByTitle } = render(
      <ComponentWithNotificationMessage
        wrapperTitle="test-1"
        buttonTitle="test-1-button"
      />
    );
    const wrapper = getByTitle("test-1");

    expect(wrapper).toMatchInlineSnapshot(`
      <div
        title="test-1"
      >
        <button
          title="test-1-button"
          type="button"
        >
          Click me
        </button>
      </div>
    `);
  });

  it("Does shows a message if button is clicked", async () => {
    vi.spyOn(window, "scrollTo");
    vi.spyOn(window, "setTimeout");

    const { getByTitle } = render(
      <ComponentWithNotificationMessage
        wrapperTitle="test-2"
        buttonTitle="test-2-button"
      />
    );
    const wrapper = getByTitle("test-2");
    const button = getByTitle("test-2-button");

    fireEvent.click(button);

    // We expect that the hook has scrolled to the top of the page.
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    // And the message is gone after 5 seconds.
    expect(window.setTimeout).toHaveBeenCalledTimes(1);
    // And shows us a message.
    expect(wrapper).toMatchInlineSnapshot(`
      <div
        title="test-2"
      >
        <section
          class="promo-bar"
        >
          <img
            alt=""
            class="ml-4"
            src="/node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-info.svg"
          />
          <p
            class="text-small-caption"
          >
            Some message
          </p>
        </section>
        <button
          title="test-2-button"
          type="button"
        >
          Click me
        </button>
      </div>
    `);
  });
});
