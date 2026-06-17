import { useAxios } from "@/hooks/useAxios";
import type { BulletinBoardEntryResponse } from "@/types/backend";

export const useFetchBulletinBoard = () => {
  return useAxios<BulletinBoardEntryResponse[]>("/orders/all", {
    method: "GET",
  });
};
