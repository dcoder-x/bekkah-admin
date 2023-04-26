export const sideBarMenu = [
  {
    title: "Shop",
    icon:'fluent:building-shop-16-regular',
    sublinks: [
      {
        name: "Manage Shop",
        link: "manage-shop",
        icon: "",
      },
      {
        name: "Shop Inventory",
        icon: "",
        link: "products",
      },
      // {
      //   name: "Product tags",
      //   icon: "",
      //   // link: "manage-shop",

      // },
      // {
      //   name: "Product Options",
      //   icon: "",
      // },
      // {
      //   name: "Tax Category",
      //   icon: "",
      // },
      // {
      //   name: "Requests",
      //   icon: "",
      // },
    ],
  },
  {
    title: "Sales",
    icon:'icon-park-outline:sales-report',

    sublinks: [
      {
        name: "Orders",
        link: "orders",
        icon: "",
      },
      {
        name: "Cancellation Requests",
        icon: "",
        link: "cancellationRequest",

      },
      {
        name: "Order Return Request",
        icon: "",
        link: "returnRequest",

      },
    ],
  },
  {
    title: "Promotions",
    icon:'icons8:advertising',
    sublinks: [
      {
        name: "Special Price",
        // link: "./",
        icon: "",
      },
      {
        name: "Volume Discount",
        icon: "",
      },
      {
        name: "Buy Together Products",
        icon: "",
      },
      // {
      //   name: "Similar Products",
      //   icon: "",
      // },
      // {
      //   name: "Google Shopping feed",
      //   icon: "",
      // },
      {
        name: "Badges",
        icon: "",
      },
      {
        name: "Ribbon",
        icon: "",
      },
    ],
  },
  {
    title: "Subscriptions",
    icon:'fluent-mdl2:packages',
    sublinks: [
      {
        name: "My Subscriptions",
        icon: "",
        link:'subscription'
      },
      {
        name: "Subscription Packages",
        icon: "",
        link:'subscription'
      },
      {
        name: "Subscription Offers",
        icon: "",
        link:'subscription'
      },
    ],
  },
  {
    title: "Sales Report",
    icon:'mdi:report-bar-stacked',
    sublinks: [
      {
        name: "Sales over time",
        icon: "",
        link:'sales'

      },
      // {
      //   name: "Products",
      //   icon: "",
      // },
    ],
  },

  {
    title: "Financial report",
    icon:'carbon:finance',
    sublinks: [
      // {
      //   name: "Profit by products",
      //   icon: "",
      // },
      // {
      //   name: "Payout",
      //   icon: "",
      // },
      {
        name: "Transaction report",
        icon: "",
        link:'transactionReport'

      },
    ],
  },
  {
    title: "Inventory Reports",
    icon:'material-symbols:inventory-sharp',
    sublinks: [
      // {
      //   name: "Products Inventory",
      //   icon: "",
      // },
      // {
      //   name: "Products Inventory Stock Status",
      //   icon: "",
      // },
      {
        name: "Products Performance Report",
        icon: "",
        link:'productPerfomance'
      },
    ],
  },
  {
    title: "Profile",
    icon:'streamline:interface-user-profile-focus-close-geometric-human-person-profile-focus-user',
    sublinks: [
      {
        name: "My Account",
        icon: "",
      },
      {
        name: "Bank Account",
        icon: "",
      },
      // {
      //   name: "Cookie preferences",
      //   icon: "",
      // },
      // {
      //   name: "Messages",
      //   icon: "",
      // },
      {
        name: "My Credits",
        icon: "",
      },
      {
        name: "Update Credentials",
        icon: "",
      },
    ],
  },
];
