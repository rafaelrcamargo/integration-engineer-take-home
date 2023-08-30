// ? This is a global collection of utility functions, meant to be used throughout the application.

/**
 * Check if any of the parameters are empty.
 * - This function is meant to be used for error handling with incoming parameters.
 * - It will return an object with a boolean indicating if any of the parameters are empty,
 *  and an array of the empty parameters.
 * @param params string[]
 * @returns `{ hasEmpty: boolean, params: string[] }`
 */

export const isEmpty = (params: { [key: string]: string }) => {
  const empty = Object.keys(params).filter((key) => !params[key]);
  return { hasEmpty: empty.length > 0, params: empty };
};
