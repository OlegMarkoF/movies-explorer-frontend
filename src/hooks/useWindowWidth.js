import { useCallback, useEffect, useState } from "react";

export function useWindowWidth() {
    const getWindowWidth = useCallback(() => window.innerWidth, []);
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());

    useEffect(() => {
        function hendleResize() {
            setWindowWidth(getWindowWidth());
        };

        window.addEventListener('resize', resizePage, false);

        let resizeTimeout;

        function resizePage() {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                    resizeTimeout = null;
                    hendleResize();
                }, 2000);
            }
        };

        return () => window.removeEventListener('resize', hendleResize);
    }, [getWindowWidth]);

    return windowWidth;
};