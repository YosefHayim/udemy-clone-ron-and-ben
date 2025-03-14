import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <Link to="/login">
      <Button className="focus:outline-none text-sm font-bold hover:text-black bg-white border-solid hover:border-black font-Sans border-[0.01rem] border-purple-700 text-purple-700 rounded-[0.2rem] px-[1.2rem] py-[1.2rem] hover:bg-purple-100">
        Log in
      </Button>
    </Link>
  );
};

export default LoginBtn;
