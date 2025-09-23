import { Suspense } from "react";
import ProductsPage from "@/components/shared/ProductsPage";

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
};

export default HomePage;
