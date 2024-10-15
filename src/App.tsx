import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Palette, Moon, Sun, Copy, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const defaultTailwindColors = {
  rose: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  pink: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  blue: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  green: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
};

function App() {
  const [tailwindColors, setTailwindColors] = useState(defaultTailwindColors);
  const [selectedColor, setSelectedColor] = useState('rose');
  const [selectedShade, setSelectedShade] = useState('500');
  const [isGridView, setIsGridView] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [numShades, setNumShades] = useState(11);
  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('');
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${text} has been copied to your clipboard.`,
    });
  };

  const addCustomColor = () => {
    if (newColorName && newColorValue) {
      setTailwindColors(prev => ({
        ...prev,
        [newColorName]: [newColorValue]
      }));
      setNewColorName('');
      setNewColorValue('');
      toast({
        title: "Custom color added",
        description: `${newColorName} has been added to the color palette.`,
      });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-background text-foreground`}>
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-3xl font-bold">
              <div className="flex items-center">
                <Palette className="mr-2 h-8 w-8" />
                Tailwind CSS Colors
              </div>
              <div className="flex items-center space-x-4">
                <Switch
                  checked={isGridView}
                  onCheckedChange={setIsGridView}
                  aria-label="Toggle grid view"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label htmlFor="colorSelect">Select Color</Label>
              <select
                id="colorSelect"
                className="w-full p-2 mt-1 border rounded-md bg-background text-foreground"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {Object.keys(tailwindColors).map((color) => (
                  <option key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <Label htmlFor="numShades">Number of Shades</Label>
              <Input
                id="numShades"
                type="number"
                min="1"
                max="11"
                value={numShades}
                onChange={(e) => setNumShades(parseInt(e.target.value))}
                className="mt-1"
              />
            </div>

            <div className={`${isGridView ? 'grid grid-cols-11' : 'flex flex-col'} gap-2 mb-6`}>
              {tailwindColors[selectedColor].slice(0, numShades).map((shade) => (
                <Button
                  key={shade}
                  className={`${isGridView ? 'w-full' : 'w-full'} h-12 rounded-md ${
                    selectedShade === shade ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                  style={{ backgroundColor: `rgb(var(--${selectedColor}-${shade}))` }}
                  onClick={() => setSelectedShade(shade)}
                >
                  {shade}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="colorCode">Color Code</Label>
                <div className="flex mt-1">
                  <Input
                    id="colorCode"
                    value={`${selectedColor}-${selectedShade}`}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button
                    className="rounded-l-none"
                    onClick={() => copyToClipboard(`${selectedColor}-${selectedShade}`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <Label htmlFor="colorPreview">Color Preview</Label>
                <div
                  id="colorPreview"
                  className="w-full h-10 mt-1 rounded-md"
                  style={{ backgroundColor: `rgb(var(--${selectedColor}-${selectedShade}))` }}
                ></div>
              </div>
            </div>

            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <Label htmlFor="newColorName">New Color Name</Label>
                <Input
                  id="newColorName"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="newColorValue">New Color Value</Label>
                <Input
                  id="newColorValue"
                  value={newColorValue}
                  onChange={(e) => setNewColorValue(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button onClick={addCustomColor}>
                <Plus className="h-4 w-4 mr-2" /> Add Color
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;