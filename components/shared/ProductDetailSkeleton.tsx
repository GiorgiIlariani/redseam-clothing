import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <main className="mt-4 sm:mt-[30px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[100px] pb-8 sm:pb-[110px]">
      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>

      <div className="mt-8 sm:mt-[49px] flex flex-col lg:flex-row gap-8 lg:gap-[168px]">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex sm:flex-col gap-2 sm:gap-[9px] overflow-x-auto sm:overflow-x-visible">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-16 h-16 sm:w-[100px] sm:h-[100px] bg-gray-200 rounded-lg animate-pulse flex-shrink-0"
              />
            ))}
          </div>

          <div className="w-full sm:w-[400px] md:w-[500px] lg:w-[703px] aspect-[3/4] lg:h-[937px] lg:aspect-auto bg-gray-200 rounded-lg animate-pulse" />
        </div>

        <div className="flex flex-1 flex-col gap-8 lg:gap-14">
          <div className="flex flex-col gap-4 lg:gap-[21px]">
            <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
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
              <div className="w-16 sm:w-[70px] h-[42px] bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="w-full h-12 sm:h-[50px] bg-gray-200 rounded-[10px] animate-pulse"></div>

          <div className="w-full my-8 sm:my-14 border border-[#E1DFE1]" />

          <div className="flex flex-col gap-2 sm:gap-[7px]">
            <div className="w-full flex justify-between items-center">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-16 sm:w-20 animate-pulse"></div>
              <div className="w-20 h-12 sm:w-[109px] sm:h-[61px] bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-[19px] mt-4">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 sm:w-24 animate-pulse"></div>
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
