import {
  type MouseEvent as ReactMouseEvent,
  useMemo,
  useSyncExternalStore,
} from "react";

const LOCATION_CHANGE_EVENT = "studio:locationchange";

interface BrowserLocation {
  pathname: string;
  search: string;
}

const getLocationSnapshot = (): string =>
  `${window.location.pathname}${window.location.search}`;

const getServerLocationSnapshot = (): string => "/";

const emitLocationChange = () => {
  window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
};

const subscribeToLocation = (onStoreChange: () => void): (() => void) => {
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(LOCATION_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(LOCATION_CHANGE_EVENT, onStoreChange);
  };
};

export const useBrowserLocation = (): BrowserLocation => {
  const snapshot = useSyncExternalStore(
    subscribeToLocation,
    getLocationSnapshot,
    getServerLocationSnapshot
  );

  return useMemo(() => {
    const url = new URL(snapshot, window.location.origin);

    return {
      pathname: url.pathname,
      search: url.search,
    };
  }, [snapshot]);
};

export const usePathname = (): string => useBrowserLocation().pathname;

export const useSearchParams = (): URLSearchParams => {
  const { search } = useBrowserLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

export const replaceBrowserUrl = (href: string): void => {
  window.history.replaceState(window.history.state, "", href);
  emitLocationChange();
};

export const pushBrowserUrl = (href: string): void => {
  window.history.pushState(window.history.state, "", href);
  emitLocationChange();
};

export const navigateWithAnchorClick = (
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
  options?: { disabled?: boolean }
): void => {
  if (options?.disabled) {
    event.preventDefault();
    return;
  }

  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  ) {
    return;
  }

  const url = new URL(href, window.location.href);

  if (url.origin !== window.location.origin) {
    return;
  }

  event.preventDefault();
  pushBrowserUrl(`${url.pathname}${url.search}${url.hash}`);
};
