export const sideBarMenu = [
  {
    title: "Shops",
    icon: "fluent:building-shop-16-regular",
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
    icon: "fluent:building-shop-16-regular",
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
    icon: "fluent:building-shop-16-regular",
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
    icon: "icon-park-outline:sales-report",

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
    title: "Subscriptions",
    icon: "fluent-mdl2:packages",
    sublinks: [
      {
        name: "Subscribed Sellers",
        icon: "",
        link: "subscription",
      },
      {
        name: "Subscription Packages",
        icon: "",
        link: "subscription",
      },
      {
        name: "Subscription Offers",
        icon: "",
        link: "subscription",
      },
    ],
  },
  {
    title: "Sales Report",
    icon: "mdi:report-bar-stacked",
    sublinks: [
      {
        name: "Sales over time",
        icon: "",
        link: "sales",
      },
      // {
      //   name: "Products",
      //   icon: "",
      // },
    ],
  },

  {
    title: "Financial report",
    icon: "carbon:finance",
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
        link: "transactionReport",
      },
    ],
  },
  {
    title: "Integrations",
    icon: "streamline:interface-user-profile-focus-close-geometric-human-person-profile-focus-user",
    sublinks: [
      {
        name: "Shipping",
        icon: "",
      },
      {
        name: "Payment",
        icon: "",
      },
    ],
  },
  {
    title: "Profile",
    icon: "streamline:interface-user-profile-focus-close-geometric-human-person-profile-focus-user",
    sublinks: [
      {
        name: "My Account",
        icon: "",
      },
    ],
  },
];
