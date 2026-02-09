import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Check,
    Zap,
    Crown,
    Building2,
    ArrowRight,
    Shield,
    Clock,
    TrendingUp
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PricingPackage {
    id: string;
    name: string;
    price: number;
    currency: string;
    basePoints: number;
    bonusPoints: number;
    totalPoints: number;
    valuePerPoint: number;
    icon: any;
    popular?: boolean;
    features: string[];
    exportCapacity: string;
    bestFor: string;
}

const packages: PricingPackage[] = [
    {
        id: "basic",
        name: "Basic Package",
        price: 1000,
        currency: "₹",
        basePoints: 700,
        bonusPoints: 0,
        totalPoints: 700,
        valuePerPoint: 1.43,
        icon: Zap,
        features: [
            "700 points",
            "Export ~175 full jerseys",
            "All design features",
            "Points never expire",
            "High-quality exports (480 DPI)",
            "45+ professional fonts"
        ],
        exportCapacity: "~175 full jerseys",
        bestFor: "Small projects, occasional use"
    },
    {
        id: "professional",
        name: "Professional Package",
        price: 2500,
        currency: "₹",
        basePoints: 1800,
        bonusPoints: 200,
        totalPoints: 2000,
        valuePerPoint: 1.25,
        icon: Crown,
        popular: true,
        features: [
            "2,000 points (1,800 + 200 bonus)",
            "Export ~500 full jerseys",
            "Best value - ₹1.25 per point",
            "All design features",
            "Points never expire",
            "Priority support",
            "High-quality exports (480 DPI)",
            "45+ professional fonts"
        ],
        exportCapacity: "~500 full jerseys",
        bestFor: "Professional designers, regular use"
    },
    {
        id: "enterprise",
        name: "Enterprise Package",
        price: 0,
        currency: "₹",
        basePoints: 0,
        bonusPoints: 0,
        totalPoints: 0,
        valuePerPoint: 0,
        icon: Building2,
        features: [
            "Custom point amount",
            "Volume discounts",
            "Dedicated support",
            "Custom integrations",
            "Team collaboration",
            "Priority processing",
            "Unlimited exports",
            "Advanced analytics"
        ],
        exportCapacity: "Unlimited",
        bestFor: "Large teams, high-volume use"
    }
];

const exportCosts = [
    { type: "Front Image", points: 1 },
    { type: "Back Image", points: 2 },
    { type: "Sleeve (each)", points: 1 },
    { type: "Collar", points: 1 },
    { type: "Full Jersey (Front + Back + 2 Sleeves)", points: 4 },
    { type: "Full Jersey with Collar", points: 5 }
];

export const PricingPage = () => {
    const { user, profile, addPoints } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<string | null>(null);

    const handlePurchase = async (pkg: PricingPackage) => {
        if (!user) {
            toast.error("Please sign in to purchase points");
            navigate("/");
            return;
        }

        if (pkg.id === "enterprise") {
            toast.info("Please contact us for enterprise pricing");
            window.location.href = "mailto:support@jerseydesigner.com?subject=Enterprise Package Inquiry";
            return;
        }

        setLoading(pkg.id);

        try {
            // Simulate payment process
            // In production, integrate with Stripe/Razorpay here
            await new Promise(resolve => setTimeout(resolve, 1500));

            const result = await addPoints(
                pkg.totalPoints,
                `Purchased ${pkg.name} - ${pkg.currency}${pkg.price}`
            );

            if (result.success) {
                toast.success(`Successfully purchased ${pkg.totalPoints} points!`);
                navigate("/");
            } else {
                toast.error("Failed to add points. Please contact support.");
            }
        } catch (error) {
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
            {/* Header */}
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-gradient-accent text-accent-foreground">
                        Points-Based System
                    </Badge>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Pay once, use forever. No subscriptions, no expiry dates. Just buy points and export whenever you need.
                    </p>
                </div>

                {/* Current Balance (if logged in) */}
                {user && profile && (
                    <Card className="max-w-2xl mx-auto p-6 mb-12 bg-gradient-accent text-accent-foreground">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90 mb-1">Current Balance</p>
                                <p className="text-4xl font-bold">{profile.points_balance || 0} points</p>
                            </div>
                            <Shield className="w-16 h-16 opacity-20" />
                        </div>
                        <p className="text-sm opacity-75 mt-4">
                            You can export approximately {Math.floor((profile.points_balance || 0) / 4)} full jerseys
                        </p>
                    </Card>
                )}

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {packages.map((pkg) => {
                        const Icon = pkg.icon;
                        return (
                            <Card
                                key={pkg.id}
                                className={`relative p-8 ${pkg.popular
                                        ? 'border-2 border-primary shadow-2xl scale-105'
                                        : 'border border-border'
                                    }`}
                            >
                                {pkg.popular && (
                                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent text-accent-foreground">
                                        ⭐ Most Popular
                                    </Badge>
                                )}

                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                    <div className="mb-4">
                                        {pkg.price > 0 ? (
                                            <>
                                                <span className="text-5xl font-bold">{pkg.currency}{pkg.price}</span>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {pkg.currency}{pkg.valuePerPoint.toFixed(2)} per point
                                                </p>
                                            </>
                                        ) : (
                                            <span className="text-3xl font-bold">Custom Pricing</span>
                                        )}
                                    </div>
                                    {pkg.bonusPoints > 0 && (
                                        <Badge variant="secondary" className="mb-4">
                                            +{pkg.bonusPoints} Bonus Points!
                                        </Badge>
                                    )}
                                    <p className="text-muted-foreground text-sm">{pkg.bestFor}</p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    onClick={() => handlePurchase(pkg)}
                                    disabled={loading !== null}
                                    className={`w-full ${pkg.popular
                                            ? 'bg-gradient-accent text-accent-foreground hover:opacity-90'
                                            : ''
                                        }`}
                                    size="lg"
                                >
                                    {loading === pkg.id ? (
                                        "Processing..."
                                    ) : pkg.id === "enterprise" ? (
                                        <>
                                            Contact Sales <ArrowRight className="w-4 h-4 ml-2" />
                                        </>
                                    ) : (
                                        <>
                                            Buy Now <ArrowRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </Card>
                        );
                    })}
                </div>

                {/* Export Costs Table */}
                <Card className="max-w-4xl mx-auto p-8 mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Point Costs per Export</h2>
                    <div className="grid gap-3">
                        {exportCosts.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition"
                            >
                                <span className="font-medium">{item.type}</span>
                                <Badge variant="secondary" className="text-lg font-bold">
                                    {item.points} {item.points === 1 ? 'point' : 'points'}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Features Grid */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Points System?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Never Expire</h3>
                            <p className="text-sm text-muted-foreground">
                                Points stay in your account forever. Use them at your own pace.
                            </p>
                        </Card>

                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Pay Once</h3>
                            <p className="text-sm text-muted-foreground">
                                No recurring charges or hidden fees. Buy points when you need them.
                            </p>
                        </Card>

                        <Card className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Better Value</h3>
                            <p className="text-sm text-muted-foreground">
                                Larger packages offer better value per point. Save more when you buy more.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                        size="lg"
                    >
                        Back to Designer
                    </Button>
                </div>
            </div>
        </div>
    );
};
