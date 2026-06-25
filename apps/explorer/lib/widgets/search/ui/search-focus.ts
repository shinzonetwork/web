const DROPDOWN_FOCUSABLE_SELECTOR = "[data-search-focusable]";
const PAGE_FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function isHTMLElement(value: Element | null): value is HTMLElement {
  return value instanceof HTMLElement;
}

function isVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  return style.visibility !== "hidden" &&
    style.display !== "none" &&
    element.getClientRects().length > 0;
}

export function getDropdownFocusableElements(
  container: HTMLElement | null,
): HTMLElement[] {
  if (!container) return [];

  return Array
    .from(container.querySelectorAll(DROPDOWN_FOCUSABLE_SELECTOR))
    .filter(isHTMLElement)
    .filter((element) => (
      element.getAttribute("aria-disabled") !== "true" &&
      !element.hasAttribute("disabled") &&
      isVisible(element)
    ));
}

export function focusDropdownBoundary(
  container: HTMLElement | null,
  boundary: "first" | "last",
): boolean {
  const elements = getDropdownFocusableElements(container);
  const element = boundary === "first" ? elements[0] : elements.at(-1);

  if (!element) return false;

  element.focus();
  return true;
}

export function focusAdjacentDropdownElement({
  container,
  direction,
  wrap,
}: {
  container: HTMLElement | null;
  direction: -1 | 1;
  wrap: boolean;
}): boolean {
  const elements = getDropdownFocusableElements(container);
  if (elements.length === 0) return false;

  const activeElement = document.activeElement;
  const currentIndex = elements.findIndex((element) => element === activeElement);
  const fallbackIndex = direction === 1 ? 0 : elements.length - 1;
  const nextIndex = currentIndex === -1
    ? fallbackIndex
    : currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < elements.length) {
    elements[nextIndex]?.focus();
    return true;
  }

  if (!wrap) return false;

  elements[direction === 1 ? 0 : elements.length - 1]?.focus();
  return true;
}

export function isFirstDropdownElementFocused(
  container: HTMLElement | null,
): boolean {
  const elements = getDropdownFocusableElements(container);
  return elements[0] === document.activeElement;
}

export function isLastDropdownElementFocused(
  container: HTMLElement | null,
): boolean {
  const elements = getDropdownFocusableElements(container);
  return elements.at(-1) === document.activeElement;
}

export function focusNextPageElementAfter(
  root: HTMLElement | null,
  dropdownContent: HTMLElement | null,
): boolean {
  if (!root) return false;

  const focusableElements = Array
    .from(document.querySelectorAll(PAGE_FOCUSABLE_SELECTOR))
    .filter(isHTMLElement)
    .filter((element) => (
      element.tabIndex >= 0 &&
      isVisible(element) &&
      !dropdownContent?.contains(element)
    ));
  const rootElements = focusableElements.filter((element) => (
    root.contains(element)
  ));
  const lastRootElement = rootElements.at(-1);
  const rootIndex = lastRootElement
    ? focusableElements.indexOf(lastRootElement)
    : focusableElements.indexOf(root);
  const nextElement = focusableElements[rootIndex + 1];

  if (!nextElement) return false;

  nextElement.focus();
  return true;
}
