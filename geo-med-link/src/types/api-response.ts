export type ApiResponse<T = any> =
  | {
      status: "error";
      error: {
        [x: string]: string[] | undefined;
      };
    }
  | {
      status: "success";
      data: T;
    };
