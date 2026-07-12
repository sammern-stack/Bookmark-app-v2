import type { AxiosError, AxiosResponse } from "axios";

type BaseRequest<D, P> = (
  params?: P,
) => Promise<AxiosResponse<SuccessResponse<D>>>;

type SuccessResponse<D> = {
  ok: true;
  message: string;
  data: D;
  meta: Record<string, unknown>;
};

export const requestHandler = <D, P = void, E extends AxiosError = AxiosError>(
  request: BaseRequest<D, P>,
) => {
  return async (params?: P): Promise<D> => {
    try {
      const res = await request(params);
      return res.data.data;
    } catch (error) {
      throw (error as E).response?.data;
    }
  };
};
