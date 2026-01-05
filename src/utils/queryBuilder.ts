type SortOrder = 1 | -1;

export type QueryOptions = {
  page: number;
  limit: number;
  sort?: string;
  filters?: Record<string, any>;
};

export type WhitelistConfig = {
  sortableFields: readonly string[];
  filterableFields: readonly string[];
  searchableFields?: readonly string[];
  defaultSort: Record<string, SortOrder>;
};

export function buildSort(
  sort: string | undefined,
  allowedFields: readonly string[],
  defaultSort: Record<string, SortOrder>
): Record<string, SortOrder> {
  if (!sort) return defaultSort;

  const isDesc = sort.startsWith("-");
  const field = isDesc ? sort.slice(1) : sort;

  if (!allowedFields.includes(field)) {
    return defaultSort;
  }

  return { [field]: isDesc ? -1 : 1 };
}

export function buildFilters(
  query: Record<string, any>,
  allowedFields: readonly string[]
): Record<string, any> {
  const filters: Record<string, any> = {};

  for (const field of allowedFields) {
    if (query[field] !== undefined) {
      filters[field] = query[field];
    }
  }

  return filters;
}

export function buildSearch(
  search: string | undefined,
  searchableFields: readonly string[]
) {
  if (!search) return {};

  const q = search.trim();
  if (!q) return {};

  return {
    $or: searchableFields.map((field) => ({
      [field]: { $regex: q, $options: "i" },
    })),
  };
}

export function buildPagination(page = 1, limit = 10) {
  const safeLimit = Math.min(Math.max(limit, 1), 50);
  const safePage = Math.max(page, 1);

  return {
    skip: (safePage - 1) * safeLimit,
    limit: safeLimit,
    page: safePage,
  };
}

export const USER_QUERY_CONFIG = {
    sortableFields: ["createdAt", "email", "name"] as const,
    filterableFields: ["role"] as const,
    searchableFields: ["name", "email"] as const,
    defaultSort: { createdAt: -1 as const },
  };
  