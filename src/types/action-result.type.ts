

export type SuccessActionResult<T = any> = {
  success: true;
  data?: T;
  message?: string;
};
export type ErrorActionResult = {
  success: false;
  message: string;
  details?: any;
};

export type ActionResult = SuccessActionResult | ErrorActionResult;
