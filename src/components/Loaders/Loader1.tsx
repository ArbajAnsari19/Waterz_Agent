import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from "../../styles/Loaders/Loader1.module.css";

const Loader1 = () => {
  return (
    <div className={styles.body} >
        <div className={styles.container}>
            <DotLottieReact
              src="https://lottie.host/3f97fadb-b566-4279-bc2e-13b59aca1a23/7WYMC9Qw4I.lottie"
              loop
              autoplay
            />
        </div>
    </div>
  );
};


export default Loader1;