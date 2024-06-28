import { useEffect } from "react";
import defaultTheme from "./defaultTheme";
import { useTheme } from "../../../contexts/theme";
import "./defaultTheme.sass";

const DefaultThemeComp = () => {
    const { themeDispatch } = useTheme();

    useEffect(() => {
        themeDispatch({ changes: defaultTheme });
    }, [themeDispatch]);

    return null;
};

export default DefaultThemeComp;
