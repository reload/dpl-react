import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

export const useListItemLazyLoad = () => {
  const listItemRef = useRef(null);
  const intersection = useIntersection(listItemRef, {
    root: null,
    rootMargin: "0%",
    threshold: 0.33
  });
  const isInViewPort = Boolean(intersection?.isIntersecting);
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean | null>(null);

  // We need to track if the item has been visible already.
  // In that way we can make it stay visible when scrolling back up.
  useEffect(() => {
    if (hasBeenVisible || hasBeenVisible !== null) {
      return;
    }

    if (!hasBeenVisible && isInViewPort) {
      setHasBeenVisible(true);
    }
  }, [hasBeenVisible, isInViewPort]);

  return { listItemRef, isVisible: isInViewPort || hasBeenVisible };
};

export default {};
