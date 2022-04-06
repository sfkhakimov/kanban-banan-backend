export type PaginationQueryType = {
    limit?: number
    page?: number
}

export type PaginationResponseType<T extends Record<string, unknown>> = {
    limit: number
    count: number
    page: number
    items: T
}
