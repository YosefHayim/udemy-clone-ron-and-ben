import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

interface DialogMultiFactorAuthProps {
  isAuthOpen: boolean;
  setAuthOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogMultiFactorAuth: React.FC<DialogMultiFactorAuthProps> = ({
  isAuthOpen,
  setAuthOpen,
}) => {
  return (
    <AlertDialog open={isAuthOpen} onOpenChange={setAuthOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            Enable multi-factor authentication
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enabling multi-factor authentication will log you out of Udemy from
            every device you`re currently logged in on.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button
            onClick={() => setAuthOpen(false)}
            className="font-bold p-[0.8em] rounded-[0.3em] bg-white hover:bg-purple-200 text-btnColor"
          >
            Cancel
          </button>
          <Link to="/logout">
            <button className="font-bold p-[0.8em] rounded-[0.3em] bg-btnColor hover:bg-purple-600 text-white">
              Confirm
            </button>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogMultiFactorAuth;
