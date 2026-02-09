import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { JERSEY_FONTS, FONT_CATEGORIES, getFontsByCategory } from "@/lib/fonts";
import { Type } from "lucide-react";

interface FontSelectorProps {
    value: string;
    onChange: (font: string) => void;
    label?: string;
    showPreview?: boolean;
}

export const FontSelector = ({
    value,
    onChange,
    label = "Font Family",
    showPreview = true
}: FontSelectorProps) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const filteredFonts = getFontsByCategory(selectedCategory);

    return (
        <div className="space-y-3">
            <Label className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                {label}
            </Label>

            {/* Category Tabs */}
            {/* Category Tabs - Scrollable */}
            <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                <div className="flex gap-2">
                    {FONT_CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                                ${selectedCategory === category
                                    ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                                    : 'bg-secondary hover:bg-muted text-secondary-foreground hover:scale-105'}
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Font Selector */}
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                    {filteredFonts.map(font => (
                        <SelectItem
                            key={font.value}
                            value={font.value}
                            style={{ fontFamily: font.value }}
                            className="cursor-pointer"
                        >
                            <span style={{ fontFamily: font.value }}>
                                {font.label}
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Preview */}
            {showPreview && value && (
                <Card className="p-4 bg-muted/30">
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                        <p
                            className="text-3xl font-bold"
                            style={{ fontFamily: value }}
                        >
                            ABCXYZ 123
                        </p>
                        <p
                            className="text-xl mt-1"
                            style={{ fontFamily: value }}
                        >
                            Player Name #99
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};
