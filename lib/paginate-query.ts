import { sql } from "@vercel/postgres";

interface PaginationResult {
  items: any[];
  pageNumber: number;
  pageLimit: number;
  totalPages: number;
  totalRecords: number;
}

export async function paginateQuery(
  pageNumber: number,
  pageLimit: number,
  query: string,
): Promise<PaginationResult> {
  try {
    // Calculate offset
    const offset = (pageNumber - 1) * pageLimit;

    // Append limit and offset to the query
    const paginatedQuery = `${query} limit ${pageLimit} offset ${offset}`;

    // Execute the query
    const result = await sql.query(paginatedQuery);

    // Calculate total records and total pages
    const totalRecords = Number(result.rows[0]?.total_records) || 0;
    const totalPages = Math.ceil(totalRecords / pageLimit);

    // Return the result along with pagination details
    return {
      items: result.rows,
      pageNumber: pageNumber,
      pageLimit: pageLimit,
      totalPages: totalPages,
      totalRecords: totalRecords,
    };
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Database query error");
  }
}
