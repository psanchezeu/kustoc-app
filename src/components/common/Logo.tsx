
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bloodRed text-white font-bold text-lg">
        P
      </div>
      <span className="font-bold text-xl tracking-tight">ProtoSpark</span>
    </Link>
  );
};

export default Logo;
