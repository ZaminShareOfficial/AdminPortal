import { listIpos } from "@/features/ipo/services/IpoApiService";
import { listOpenOrders } from "@/features/orders/services/open-orders";
import { listProperties } from "@/features/properties/services/PropertiesApiService";
import {
  listPortfolioProperties,
  listUserPortfolios
} from "@/lib/services/portfolio-api-service";

export const loadDashboardData = async () => {
  const [properties, ipos, openOrders, portfolioProperties, userPortfolios] =
    await Promise.all([
      listProperties(),
      listIpos({ active: true }),
      listOpenOrders(),
      listPortfolioProperties(),
      listUserPortfolios()
    ]);

  return {
    properties,
    ipos,
    openOrders,
    portfolioProperties,
    userPortfolios
  };
};
