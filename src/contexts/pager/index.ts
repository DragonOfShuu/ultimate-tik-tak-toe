import { createContext, useContext } from "react"

// All pages in the application
export type Page = "settings"|"game"

// Values the PagerContext stores
export type PagerContextType = {
    page: Page,
    setPage: (newPage: Page) => unknown
}

// The PagerContext
const PagerContext = createContext<PagerContextType|null>(null);

// The PagerContext hook, which allows children to see and set the page
export const usePager = () => {
    return useContext(PagerContext) as PagerContextType;
}

export default PagerContext;