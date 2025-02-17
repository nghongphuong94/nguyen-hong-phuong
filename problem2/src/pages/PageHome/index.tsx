import SwapForm from "../../components/SwapForm";

import styles from "./PageHome.module.scss";

const PageHome = () => {
  return (
    <div className={`${styles.container} min-h-screen flex items-center justify-center bg-[#090524]`}>
      <SwapForm />
    </div>
  )
};

export default PageHome;