import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

<<<<<<< HEAD
export const useItemHasBeenVisible = () => {
  const itemRef = useRef(null);
  const intersection = useIntersection(itemRef, {
    root: null,
    rootMargin: "0%",
    threshold: 0
  });
  const isInViewPort = Boolean(intersection?.isIntersecting);
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);

  // We need to track if the item has been visible already
  // in order to prevent rerunning setHasBeenVisible again.
  useEffect(() => {
    if (hasBeenVisible) {
      return;
    }

    if (isInViewPort) {
=======
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
>>>>>>> d24523e16 (Generalise list item lazy loading with a hook)
      setHasBeenVisible(true);
    }
  }, [hasBeenVisible, isInViewPort]);

<<<<<<< HEAD
  return { itemRef, hasBeenVisible: isInViewPort || hasBeenVisible };
=======
  return { listItemRef, isVisible: isInViewPort || hasBeenVisible };
>>>>>>> d24523e16 (Generalise list item lazy loading with a hook)
};

export default {};
