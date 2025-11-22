export const calculateDiscount = (price: number, salePrice: number | null) => {
  if (!salePrice || salePrice >= price) {
    return { amount: 0, percentage: 0 };
  }

  const amount = price - salePrice;
  const percentage = Math.round((amount / price) * 100);

  return { amount, percentage };
};
