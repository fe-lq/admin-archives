/** 后面整合到基座，下发的方式 */
export type RequiredPick<T, K extends keyof T> = {
  [P in K]-?: T[P]
}
