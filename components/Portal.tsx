import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/Portal.module.css";

interface PortalProps {
  closeHandler: VoidFunction;
  children: ReactNode;
}

export const Portal = ({ children, closeHandler }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 27) {
      closeHandler();
    }
  };

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (mounted && ref.current)
    ? createPortal(
        <div className={styles.overlay}>
          <div className={styles.content}>
            <button className={styles.close} onClick={closeHandler}>
              X
            </button>
            {children}
          </div>
        </div>,
        ref.current
      )
    : null;
};
