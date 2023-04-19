export interface ApiResponse {
  status: number;
  message: string;
  data: any;
}

export interface PaginatedData {
  content: any[];
  pagination: Pagination
}

export interface Pagination {
  firstPage: boolean;
  hasNextPage: boolean;
  lastPage: boolean;
  numberOfElements: number;
  numberOfPages: number;
  offset: number;
  page: number;
  size: number;
  totalNumberOfElements: number;
}
