import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { SignupProvider } from "@/components/ui/SignupDialog";
import "./globals.css";

const font = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter-tight", display: "swap" });

const title = "NOVA AI — Your Intelligent Workspace";
const description =
  "Your intelligent workspace to automate tasks, organize ideas, and turn everyday work into effortless progress.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { type: "website", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ffffff" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NOVA AI",
  applicationCategory: "BusinessApplication",
  description: "AI assistant for task automation and productivity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SignupProvider>{children}</SignupProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
