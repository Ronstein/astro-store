import type { AuthError } from '@auth/core/errors';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { signIn } from 'auth-astro/client';

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
        path: '/'
      })
    } else {
      cookies.delete('email', {
        path: '/'
      })
    }

    try {

      return {
        ok: true,
        //msg: 'Usuario creado exitosamente',
        email,
      };

    } catch (error) {
      console.log(error);
      const authError = error as AuthError;
      throw new Error(`Auxilio! algo salío mal: ${authError.message}`);
    }
  },
});
