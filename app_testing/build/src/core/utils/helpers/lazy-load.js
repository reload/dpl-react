"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useItemHasBeenVisible = void 0;
const react_1 = require("react");
const react_use_1 = require("react-use");
const useItemHasBeenVisible = () => {
    const itemRef = (0, react_1.useRef)(null);
    const intersection = (0, react_use_1.useIntersection)(itemRef, {
        root: null,
        rootMargin: "0%",
        threshold: 0
    });
    const isInViewPort = Boolean(intersection?.isIntersecting);
    const [hasBeenVisible, setHasBeenVisible] = (0, react_1.useState)(false);
    // We need to track if the item has been visible already
    // in order to prevent rerunning setHasBeenVisible again.
    (0, react_1.useEffect)(() => {
        if (hasBeenVisible) {
            return;
        }
        if (isInViewPort) {
            setHasBeenVisible(true);
        }
    }, [hasBeenVisible, isInViewPort]);
    return { itemRef, hasBeenVisible: isInViewPort || hasBeenVisible };
};
exports.useItemHasBeenVisible = useItemHasBeenVisible;
exports.default = {};
