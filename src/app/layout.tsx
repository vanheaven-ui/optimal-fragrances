import DrawerNavigation from "components/DrawerNavigation";
import "./globals.css";
import DeliveryMotorbikeSVG from "components/DeliveryBikeSVG";
import Footer from "components/Footer";
import { FirebaseProvider } from "context/FirebaseContext";

// const inter = Inter({ subsets: ['latin'] }); // No longer needed

export const metadata = {
  title: "Optimal Fragrance - Discover Your Scent",
  description:
    "Explore a luxurious collection of exquisite perfumes for every occasion at Optimal Fragrance.",
};

// DeliveryMotorbikeSVG definition moved to src/components/DeliveryMotorbikeSVG.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans bg-ug-neutral-bg text-ug-text-dark relative`}>
        {" "}
        {/* Used generic font-sans */}
        <FirebaseProvider>
          <DrawerNavigation />
          {/* Delivery Motorbike SVG positioned at top right, now with responsive sizing */}
          <div className="fixed top-4 right-4 z-10 w-20 sm:w-28 animate-moveBike">
            <DeliveryMotorbikeSVG />
          </div>
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </FirebaseProvider>
      </body>
    </html>
  );
}
