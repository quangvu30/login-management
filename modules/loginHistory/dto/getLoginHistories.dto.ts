export interface GetLoginHistoryDto {
  page: number;
  limit: number;
  email: string | undefined | null;
}
