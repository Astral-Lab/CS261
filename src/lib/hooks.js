import { 
    useState,
     useEffect 
} from "react";

/**
 * Custom hook to check if device screen dimensions
 * are of mobile widths. Used for conditional rendering
 * inside components.
 * 
 * @returns boolean indicating if mobile
 */
export default function useMobileLayout() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // window width is mobile dimensions
            setIsMobile(window.innerWidth < 600);
        }

        // call on the initial mount to prevent "undefined"
        handleResize();

        window.addEventListener("resize", handleResize);

        // cleanup function
        return () => window.removeEventListener("resize", handleResize);

    }, []);

    return isMobile;
}