import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { db, User } from 'astro:db';
import type { AuthError } from '@auth/core/errors';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {

    //cokies
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

    //Creacion de usuario
    try {
      const user = {
        id: UUID(),
        name: name,
        email: email,
        password: bcrypt.hashSync(password),
        role: 'user',
      };

      await db.insert(User).values(user);

      return {
        ok: true,
        msg: 'Usuario creado exitosamente',
        user: {
          uid: user.id,
          email: user.email,
          //displayName: user.password,
        },
      };

    } catch (error) {
      const authError = error as AuthError;
      console.log(error);
      throw new Error(authError.message);
    }
  },
});
