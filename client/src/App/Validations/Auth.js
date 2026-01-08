import { z } from 'zod'


const registerSchema = z.object({
    name: z.string().min(3, "Name Is Too Short Must be at least 3 Letters").max(255),
    email: z.string().email().max(255),
    password: z.string().min(6).max(12, "Max Password Length is 12"),
    password_confirmation: z.string().min(6).max(12),
}).refine((d) => d.password === d.password_confirmation, {
    message: 'The password confirmation does not match.',
    path: ['password_confirmation'],
})


export { registerSchema };