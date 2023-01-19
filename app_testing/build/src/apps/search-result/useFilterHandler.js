"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useFilterHandler = () => {
    const [filters, setFilters] = (0, react_1.useState)({});
    const filterHandler = ({ filterItem: { facet, term }, action }) => {
        if (action === "add") {
            if (Object.keys(filters).includes(facet)) {
                setFilters({
                    ...filters,
                    [facet]: { ...filters[facet], [term.term]: term }
                });
            }
            else {
                setFilters({
                    ...filters,
                    [facet]: { [term.term]: term }
                });
            }
        }
        if (action === "remove") {
            const copy = { ...filters };
            if (Object.keys(filters).includes(facet)) {
                // this removes the facet if it's the last term
                if (Object.keys(filters[facet]).length === 1) {
                    delete copy[facet];
                    setFilters(copy);
                }
                else {
                    delete copy[facet][term.term];
                    setFilters(copy);
                }
            }
        }
    };
    return { filters, filterHandler };
};
exports.default = useFilterHandler;
