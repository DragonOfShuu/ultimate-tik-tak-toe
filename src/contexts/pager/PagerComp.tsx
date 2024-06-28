import { useState, ReactNode } from "react";
import PagerContext, { Page } from ".";

type Props = {
    // This is where the parent can set these values
    startingPage: Page;
    children?: ReactNode;
};

const PagerComp = (props: Props) => {
    const [page, setPage] = useState(props.startingPage);

    return (
        <PagerContext.Provider value={{ page, setPage }}>
            {/** All children will now have access to this context, and can use the usePager() */}
            {props.children}
        </PagerContext.Provider>
    );
};

export default PagerComp;
