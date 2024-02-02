export interface User {
  userId: number
  userName: string
  password: string
  phone: string
  status: boolean
  role: string
  permissionId: number
  email?: string
  createData?: string
}
