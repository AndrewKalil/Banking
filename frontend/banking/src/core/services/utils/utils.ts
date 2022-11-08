// converts camelcase to space separated string
export const toSpaceSeparated = (camelcase: string) => {
  const result = camelcase.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

// checks to see if an object (arg1) is of instance T (interface)
export const isInstanceOf = <T>(
  object: any,
  specialProp: string
): object is T => {
  return specialProp in object;
};

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

export declare const exactType: <T, U>(
  draft: T & Equals<T, U>,
  expected: U & Equals<T, U>
) => Equals<T, U>;
