import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = () => {
  return (
    <>
      <Breadcrumb pageName="All Products" parentPage="Products" />

      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <TopProducts />
        </Suspense>
      </div>
    </>
  );
};

export default ProductsPage;
