'use server'
 
import { redirect } from 'next/navigation'
 
export async function redirectPath(path: string) {
  redirect(`${path}`)
}