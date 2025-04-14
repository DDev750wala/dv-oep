import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Bar Chart", href: "/bar-chart" },
        { name: "Bubble Chart", href: "/bubble-chart" },
        { name: "Doughnut Chart", href: "/doughnut-chart" },
        { name: "Line Chart", href: "/line-chart" },
        { name: "Stacked Bar Chart", href: "/stackedbar-chart" },
        { name: "Pie Chart", href: "/pie-chart" },
        { name: "Scatter Chart", href: "/scatter-chart" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition-colors ${
            isActive
                ? "text-primary underline underline-offset-4"
                : "text-muted-foreground hover:text-foreground"
        }`;

    return (
        <nav className="w-full px-4 md:px-8 py-4 border-b bg-background shadow-sm sticky top-0 z-50 mb-9">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <NavLink to="/" className="text-2xl font-extrabold tracking-tight text-primary">
                    🚀 Data Visualization - OEP
                </NavLink>

                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            to={link.href}
                            className={linkClass}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <div className="md:hidden">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu size={20} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="flex flex-col gap-4 pt-10 px-6">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `text-base font-medium ${
                                            isActive ? "text-primary underline" : "hover:text-primary"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
