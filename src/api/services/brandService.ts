import { Brand } from "@/types/Brand.type";
import { apiClient } from "../client";
import { endpoints } from "../endPoints";

export const brandService = {
  getAllBrands: async () => {
    const { data } = await apiClient.get(endpoints.brands);
    return data;
  },
  getBrandById: async (id: string) => {
    const { data } = await apiClient.get(endpoints.brandById(id));
    return data;
  },
  createBrand: async (brand: Omit<Brand, "id" | "createdAt" | "updatedAt">) => {
    const { data } = await apiClient.post(endpoints.brands, brand);
    return data;
  },
  updateBrand: async (id: string, brand: Partial<Brand>) => {
    const { data } = await apiClient.put(endpoints.brandById(id), brand);
    return data;
  },
  deleteBrand: async (id: string) => {
    const { data } = await apiClient.delete(endpoints.brandById(id));
    return data;
  },
};
