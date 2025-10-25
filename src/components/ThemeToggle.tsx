"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
// Import the native DOM MouseEvent type
type NativeMouseEvent = globalThis.MouseEvent;
import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaLaptop, FaCog, FaTimes } from "react-icons/fa";

// --- Configuration Constants ---
const DRAG_MIN_Y = 2; // 2% from top
const DRAG_MAX_Y = 90; // 90% from top
const DRAG_THRESHOLD = 5; // Pixels threshold to distinguish click from drag
const ORBITAL_RADIUS = 70; // Pixel radius for the fanned-out buttons
const INITIAL_POSITION_Y = 50; // Centered vertically

// --- TypeScript Types ---
type ThemeType = "light" | "dark" | "system" | undefined;
type DragPosition = { x: number; y: number };

// Helper function to get the current theme icon
const getThemeIcon = (currentTheme: ThemeType) => {
  const iconProps = { className: "w-5 h-5" };
  switch (currentTheme) {
    case "light":
      return <FaSun {...iconProps} />;
    case "dark":
      return <FaMoon {...iconProps} />;
    case "system":
      return <FaLaptop {...iconProps} />;
    default:
      return <FaCog {...iconProps} />;
  }
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [positionY, setPositionY] = useState<number>(INITIAL_POSITION_Y);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<DragPosition>({
    x: 0,
    y: 0,
  });

  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // --- Drag handlers (Unchanged, remains type-safe) ---

  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (toggleRef.current && toggleRef.current.contains(e.target as Node)) {
      setIsDragging(true);
      setDragStartPos({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: NativeMouseEvent) => {
      if (!isDragging) return;

      const viewportHeight = window.innerHeight;
      let newTopPercent = (e.clientY / viewportHeight) * 100;
      newTopPercent = Math.max(DRAG_MIN_Y, Math.min(DRAG_MAX_Y, newTopPercent));
      setPositionY(newTopPercent);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(
    (e: NativeMouseEvent) => {
      if (!isDragging) return;

      setIsDragging(false);

      const movedX = Math.abs(e.clientX - dragStartPos.x);
      const movedY = Math.abs(e.clientY - dragStartPos.y);

      if (movedX < DRAG_THRESHOLD && movedY < DRAG_THRESHOLD) {
        setIsOpen((prev) => !prev);
      }
    },
    [isDragging, dragStartPos]
  );

  useEffect(() => {
    const mouseMoveListener = handleMouseMove as unknown as EventListener;
    const mouseUpListener = handleMouseUp as unknown as EventListener;

    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mouseup", mouseUpListener);

    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseup", mouseUpListener);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (!mounted) return null;

  // --- Styling Logic ---
  const currentIcon = getThemeIcon(theme as ThemeType);
  const isSelected = (t: string) => theme === t;

  const orbClasses: string =
    "w-10 h-10 p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out border-2 border-transparent hover:scale-110 active:scale-90 flex items-center justify-center text-ug-text-dark dark:text-ug-text-light";

  const coreClasses: string = `w-14 h-14 p-3 rounded-full shadow-2xl transition-all duration-300 ease-in-out relative z-10 flex items-center justify-center 
    ${
      isDragging
        ? "cursor-grabbing shadow-ug-purple-primary/50 scale-105"
        : "cursor-grab"
    } 
    ${isOpen ? "shadow-ug-purple-primary/70" : "shadow-md hover:shadow-lg"}`;

  const coreThemeColor: string = isOpen
    ? `bg-ug-purple-primary text-white`
    : isSelected("light")
    ? "bg-ug-neutral-light text-ug-text-dark"
    : isSelected("dark")
    ? "bg-ug-neutral-dark text-ug-text-light"
    : "bg-ug-neutral-light dark:bg-ug-neutral-dark text-ug-text-dark dark:text-ug-text-light";

  // MODIFICATION: Angles changed to place icons in an arc on the left side
  const orbitalButtons = [
    { theme: "light", icon: <FaSun className="w-5 h-5" />, position: 225 }, // Top-Left position
    { theme: "dark", icon: <FaMoon className="w-5 h-5" />, position: 270 }, // Mid-Left position
    { theme: "system", icon: <FaLaptop className="w-5 h-5" />, position: 315 }, // Bottom-Left position
  ];

  // --- Render ---

  return (
    <div
      ref={toggleRef}
      // Since the icons are fanning out to the left, we can keep the toggle on the right side of the screen
      className={`fixed right-4 z-50 ${
        isDragging ? "pointer-events-none" : ""
      }`}
      style={{ top: `${positionY}%` }}
    >
      {/* Orbital Halo Buttons */}
      {orbitalButtons.map(({ theme: t, icon, position }) => {
        // Calculate X and Y based on the new orbital arc angles
        const rad = (position * Math.PI) / 180;
        const x = isOpen ? ORBITAL_RADIUS * Math.cos(rad) : 0;
        const y = isOpen ? -ORBITAL_RADIUS * Math.sin(rad) : 0;

        return (
          <div
            key={t}
            className={`absolute transition-all duration-500 ease-out`}
            style={{
              // The translation shifts the icon from the center (0,0) to its orbital position (x, y)
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
              zIndex: isOpen ? 5 : 0,
            }}
          >
            <button
              aria-label={`Set ${t} theme`}
              onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                setTheme(t);
                setIsOpen(false);
              }}
              className={`${orbClasses} ${
                isSelected(t)
                  ? "bg-ug-purple-primary text-white scale-110 shadow-ug-purple-primary/50"
                  : "bg-ug-neutral-light dark:bg-ug-neutral-dark/80 hover:bg-ug-neutral-light/70 dark:hover:bg-ug-neutral-dark"
              }`}
            >
              {icon}
            </button>
          </div>
        );
      })}

      {/* Theme Core Button - The draggable and clickable center */}
      <div className="relative group w-14 h-14" onMouseDown={handleMouseDown}>
        <button
          aria-label="Toggle Theme Menu"
          className={`${coreClasses} ${coreThemeColor}`}
          type="button"
        >
          {/* Icon switches from current theme to a cog when open */}
          <span
            className={`transition-opacity duration-300 ${
              isOpen ? "opacity-0 absolute" : "opacity-100"
            }`}
          >
            {currentIcon}
          </span>
          <span
            className={`transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaCog className="w-6 h-6" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
