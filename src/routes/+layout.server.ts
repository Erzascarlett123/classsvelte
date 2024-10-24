import type {LayoutServerLoad} from "./$types"

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session } = await safeGetSession()
  return {
    session,
    cookies: cookies.getAll(),
  }
}

// src/routes/$types.ts
export interface RouteParams {
  class: string; // Mendefinisikan class sebagai string
}
