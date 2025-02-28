import { 
    useState,
     useEffect 
} from "react";

export default function useMobileLayout() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // window width is mobile dimensions
            setIsMobile(window.innerWidth < 600);
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    return isMobile;
}