import { LoaderProps } from "@/types/types";
import styles from "./Loader.module.css";
import smallStyles from "./SmallLoader.module.css";

const Loader: React.FC<LoaderProps> = ({
  hSize = "1000px",
  useSmallLoading = false,
  paddingSetTo = "25em",
}) => {
  return (
    <div
      className={`flex flex-row items-center justify-center h-[${hSize}] p-[${paddingSetTo}]`}
    >
      <div
        className={useSmallLoading ? smallStyles.loader : styles.loader}
      ></div>
    </div>
  );
};

export default Loader;
