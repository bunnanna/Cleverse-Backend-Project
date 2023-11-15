export type TBacklistRepository = {
  addToBacklist: (token: string, exp: Date) => Promise<void>
  checkInBacklist: (token: string) => Promise<boolean>
}
