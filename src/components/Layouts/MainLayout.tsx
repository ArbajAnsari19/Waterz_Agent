import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { ContactForm } from "../Contact/Contact";
import styles from "../../styles/Layouts/MainLayout.module.css";
import Loader1 from "../Loaders/Loader1";
import { useAppSelector } from "../../redux/store/hook";

type MainLayoutProps = {
    children: React.ReactNode; 
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const isLoading = useAppSelector((state) => state.loading.isLoading);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Enable scrolling
        }

        return () => {
            document.body.style.overflow = "auto"; // Reset on unmount
        };
    }, [isLoading]);

    return (
        <div className={styles.comp_body}>
            {isLoading && <Loader1 />}
            <Navbar />
            {children}
            <ContactForm />
        </div>
    );
};

export default MainLayout;
