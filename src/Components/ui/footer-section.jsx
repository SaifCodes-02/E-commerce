import * as React from "react";
import { button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Facebook,
  Instagram,
  Linkedin,
  Moon,
  Send,
  Sun,
  Globe,
} from "lucide-react";

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  // React.useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-gray-950 text-white  transition-colors duration-300 dark:bg-gray-950 dark:text-gray-50 mt-20">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight ">
              Stay Connected
            </h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-gray-900 text-gray-50 transition-transform hover:scale-105 dark:bg-gray-50 dark:text-gray-900"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-gray-900/10 blur-2xl dark:bg-gray-50/10" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#"
                className="block transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              >
                Home
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              >
                About Us
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              >
                Services
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              >
                Products
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              >
                Contact
              </a>
            </nav>
          </div>
          {/* Contact Info Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p className="underline">
                <a
                  href="https://saifcodes.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website: saifcodes.vercel.app
                </a>
              </p>
              <p>Lahore, Pakistan</p>
              <p>
                <a href="tel:+923164291760">Phone: (+92) 316-4291760</a>
              </p>
              <p className="underline">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=saifijamil00@gmail.com"
                  onClick={(e) => {
                    if (!navigator.userAgent.includes("Chrome")) {
                      window.location.href = "mailto:saifijamil00@gmail.com";
                      e.preventDefault();
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email: saifijamil00@gmail.com
                </a>
              </p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full text-white "
                    >
                      <Facebook className="h-4 w-4 text-gray-950 " />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://saifcodes.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex" // Important for proper button styling
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Globe className="h-4 w-4 text-gray-950" />
                        <span className="sr-only">Visit our website</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit our Website</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Instagram className="h-4 w-4 text-gray-950" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Linkedin className="h-4 w-4 text-gray-950" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div> */}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025-2026 SaifCodes. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a
              href="#"
              className="transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            >
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
