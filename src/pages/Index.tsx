import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const generatePassword = () => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*";
  
  // Ensure one of each required character type
  let password = "";
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Fill remaining characters
  const allChars = uppercase + lowercase + numbers + special;
  for (let i = password.length; i < 8; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

const Index = () => {
  const [password, setPassword] = useState(generatePassword());
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
      duration: 2000,
    });
  };

  const handleGenerate = () => {
    setPassword(generatePassword());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Password Generator
          </h1>
          
          <div className="relative">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between group">
              <span className="font-mono text-lg text-gray-700">{password}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Generate New Password
          </Button>

          <div className="text-sm text-gray-500 space-y-2">
            <p>Password includes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>8 characters long</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character (!@#$%^&*)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;