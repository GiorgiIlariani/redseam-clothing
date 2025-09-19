export const DELIVERY_COST = 5;

export const SORT_OPTIONS = [
  { value: "", label: "Sort by", isDefault: true },
  { value: "-created_at", label: "New products first" },
  { value: "price", label: "Price, low to high" },
  { value: "-price", label: "Price, high to low" },
];

export const DEFAULT_QUANTITY_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export const CART_SIDEBAR_WIDTH = "540px";

export const PRODUCT_GRID_SKELETON_COUNT = 9;

export const PAGINATION_MAX_VISIBLE = 5;
