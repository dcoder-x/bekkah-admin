export const sideBarMenu = [
  {
    title: "Shops",
    icon:'fluent:building-shop-16-regular',
    sublinks: [
      {
        name: "Manage Shops",
        link: "manage-shop",
        icon: "",
      },
      {
        name: "Manage Sellers",
        link: "manage-sellers",
        icon: "",
      },
      {
        name: "Shop Inventory",
        icon: "",
        link: "products",
      },
    ],
  },
  {
    title: "Buyers",
    icon:'fluent:building-shop-16-regular',
    sublinks: [
      {
        name: "All Buyers",
        link: "buyers",
        icon: "",
      },
      {
        name: "Restricted Buyers",
        link: "restricted-buyers",
        icon: "",
      },
    ],
  },
  {
    title: "Requests",
    icon:'fluent:building-shop-16-regular',
    sublinks: [
      {
        name: "Account Approval",
        link: "sellerApproval",
        icon: "",
      },
      {
        name: "Withrawal Requests",
        link: "restricted-buyers",
        icon: "",
      },
      {
        name: "Order Cancellation Requests",
        link: "restricted-buyers",
        icon: "",
      },
      {
        name: "Order Return Requests",
        link: "restricted-buyers",
        icon: "",
      },
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
      },
      {
        name: "Order Return Request",
        icon: "",
      },
    ],
  },
  {
    title: "Subscriptions",
    icon:'fluent-mdl2:packages',
    sublinks: [
      {
        name: "Subscribed Sellers",
        icon: "",
        link:'subscription'
      }
    ],
  },
  {
    title: "Sales Report",
    icon:'mdi:report-bar-stacked',
    sublinks: [
      {
        name: "Sales over time",
        icon: "",
      },
      {
        name: "Products",
        icon: "",
      },
    ],
  },

  {
    title: "Financial report",
    icon:'carbon:finance',
    sublinks: [
      {
        name: "Profit by products",
        icon: "",
      },
      {
        name: "Payout",
        icon: "",
      },
      {
        name: "Transaction report",
        icon: "",
      },
    ],
  },
  {
    title: "Inventory Reports",
    icon:'material-symbols:inventory-sharp',
    sublinks: [
      {
        name: "Products Inventory",
        icon: "",
      },
      {
        name: "Products Inventory Stock Status",
        icon: "",
      },
      {
        name: "Products Performance Report",
        icon: "",
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
