import * as logos from "@/assets/logos";

export function getTopProducts() {
  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export function getInvoiceTableData() {
  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export function getTopChannels() {
  return [
    {
      name: "Google",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.google,
    },
    {
      name: "X.com",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.x,
    },
    {
      name: "Github",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.github,
    },
    {
      name: "Vimeo",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.vimeo,
    },
    {
      name: "Facebook",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.facebook,
    },
  ];
}
