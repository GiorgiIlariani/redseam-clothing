import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <main className="mt-[30px] px-[100px] pb-[110px]">
      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>

      <div className="mt-[49px] flex gap-[168px]">
        <div className="flex gap-6">
          <div className="flex flex-col gap-[9px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[100px] h-[100px] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>

          <div className="w-[703px] h-[937px] bg-gray-200 rounded-lg animate-pulse" />
        </div>

        <div className="flex flex-1 flex-col gap-14">
          <div className="flex flex-col gap-[21px]">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="flex gap-[13px]">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="flex gap-[10px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[70px] h-[42px] bg-gray-200 rounded-[10px] animate-pulse"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="w-[70px] h-[42px] bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="w-full h-[50px] bg-gray-200 rounded-[10px] animate-pulse"></div>

          <div className="w-full my-14 border border-[#E1DFE1]" />

          <div className="flex flex-col gap-[7px]">
            <div className="w-full flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="w-[109px] h-[61px] bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-[19px] mt-4">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailSkeleton;
