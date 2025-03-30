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
      {/* Power Control 헤더 */}
      <span className="flex w-full justify-center font-bold">Power Control</span>

      {/* 잠금 버튼 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLockClick}
        className="absolute right-0 top-0"
      >
        {isLocked ? <LockKeyhole className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
      </Button>
    </div>
  );
};