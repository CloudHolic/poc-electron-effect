import {useState} from "react";
import {Button} from "./components/ui/button";
import {LockKeyhole, LockOpen} from "lucide-react";

export default function App() {
  const [isLocked, setIsLocked] = useState(true);

  const handleLockClick = () => {
    setIsLocked(!isLocked);
  }

  console.log('App is running');

  return (
    <div className="sideContainer relative flex w-full flex-col items-center">
      <span className="flex w-full justify-center font-bold">Power Control</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLockClick}
        className="absolute right-0 top-0">
        {isLocked ? <LockKeyhole className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
      </Button>
    </div>
  );
};