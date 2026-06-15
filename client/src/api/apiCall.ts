// ——— Imports —————————————————————————————————————————————————————————————————
import type { AxiosFn, RequestFn } from "../types";

// ——— Helper ——————————————————————————————————————————————————————————————————
export const apiCall = async <T>(fn: AxiosFn<T>): RequestFn<T> => {
  try {
    const { data } = await fn();
    return { ...data };
  } catch (err) {
    console.log("Error:", err);
    return {
      ok: false,
      message: `An unexpected error occurred: ${err}`,
    };
  }
};
