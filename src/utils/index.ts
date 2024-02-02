import { SECRET_KEY } from '@/constants'
import Crypto from 'crypto-js'
/**
 *
 * @param phone 手机号
 * @returns 隐藏中间4位的手机号
 */
export const getMaskPhone = (phone: string) => phone.replace(/(?<=\d{3})(?<!\d{4})\d{4}/g, '****')

/**
 *
 * @param psw 要加密的数据
 * @returns 加密数据
 */
export const genEncryptPsw = (psw: string): string => Crypto.AES.encrypt(psw, SECRET_KEY).toString()

export const getDecryptPsw = (psw: string): string =>
  Crypto.AES.decrypt(psw, SECRET_KEY).toString(Crypto.enc.Utf8)
