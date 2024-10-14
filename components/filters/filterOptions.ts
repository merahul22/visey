export const homePageFilterSection = [
  {
    name: "categories",
    label: "Categories",
    type: "checkbox", 
    options: [
      { id: "recents", label: "Recents" },
      { id: "home", label: "Home" },
      { id: "documents", label: "Documents" },
    ],
  },
  {
    name: "ratings",
    label: "Ratings",
    type: "radio",
    options: [
      { id: "3.5+", label: "Above 3.5" },
      { id: "4+", label: "Above 4" },
      { id: "4.5+", label: "Above 4.5" },
      { id: "5", label: "5 only" },
    ],
  },
  {
    name: "promotions",
    label: "Promotions",
    type: "checkbox",
    options: [
      { id: "promoted", label: "Promoted" },
      { id: "not-promoted", label: "Not Promoted" },
    ],
  },
  {
    name: "locations",
    label: "Locations",
    type: "checkbox",
    options: [
      { id: "delhi", label: "Delhi, India" },
      { id: "sector-10", label: "Sector Name (2)" },
    ],
  },
] as const;


export const productFilterSection = [
  {
    name: "brands",
    label: "Brands",
    type: "checkbox",
    options: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "xiaomi", label: "Xiaomi" },
      { id: "oneplus", label: "OnePlus" },
    ],
  },
  {
    name: "availability",
    label: "Availability",
    type: "radio",
    options: [
      { id: "in-stock", label: "In Stock" },
      { id: "out-of-stock", label: "Out of Stock" },
    ],
  },
  {
    name: "ratings",
    label: "Customer Ratings",
    type: "checkbox",
    options: [
      { id: "4+", label: "4 Stars & Above" },
      { id: "3+", label: "3 Stars & Above" },
      { id: "2+", label: "2 Stars & Above" },
    ],
  },
] as const;
