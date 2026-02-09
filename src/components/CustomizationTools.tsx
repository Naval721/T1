import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontSelector } from "@/components/FontSelector";
import { Slider } from "@/components/ui/slider";
import { Upload, Type } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface CustomizationToolsProps {
  onAddText?: (text: string, fontFamily: string, fontSize: number, fill: string, stroke: string, strokeWidth: number) => void;
  onAddLogo?: (logoUrl: string) => void;
}

export const CustomizationTools = ({ onAddText, onAddLogo }: CustomizationToolsProps) => {
  const [customText, setCustomText] = useState("");
  const [selectedFont, setSelectedFont] = useState("Anton");
  const [fontSize, setFontSize] = useState(60);
  const [textColor, setTextColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleAddText = () => {
    if (!customText.trim()) {
      toast.error("Please enter some text");
      return;
    }
    onAddText?.(customText, selectedFont, fontSize, textColor, strokeColor, strokeWidth);
    setCustomText("");
    toast.success("Text added to canvas");
  };

  const handleAddLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const logoUrl = event.target?.result as string;
      onAddLogo?.(logoUrl);
      toast.success("Logo added to canvas");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div>
        <Label className="mb-2 block font-semibold">Custom Text</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter text..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddText()}
          />
          <Button onClick={handleAddText} size="icon">
            <Type className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Font Selector */}
      <FontSelector
        value={selectedFont}
        onChange={setSelectedFont}
        label="Font Style"
        showPreview={true}
      />

      {/* Font Size */}
      <div>
        <Label className="mb-2 block">Font Size: {fontSize}px</Label>
        <Slider
          value={[fontSize]}
          onValueChange={(value) => setFontSize(value[0])}
          min={20}
          max={200}
          step={5}
          className="w-full"
        />
      </div>

      {/* Text Color */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block">Text Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="flex-1"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* Stroke Color */}
        <div>
          <Label className="mb-2 block">Stroke Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="flex-1"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>

      {/* Stroke Width */}
      <div>
        <Label className="mb-2 block">Stroke Width: {strokeWidth}px</Label>
        <Slider
          value={[strokeWidth]}
          onValueChange={(value) => setStrokeWidth(value[0])}
          min={0}
          max={10}
          step={0.5}
          className="w-full"
        />
      </div>

      {/* Logo Upload */}
      <div>
        <Label className="mb-2 block font-semibold">Custom Logo</Label>
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          onChange={handleAddLogo}
          className="hidden"
        />
        <Button
          onClick={() => logoInputRef.current?.click()}
          variant="outline"
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Logo
        </Button>
      </div>
    </div>
  );
};
