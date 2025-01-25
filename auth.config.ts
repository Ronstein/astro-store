
import type { AdapterUser } from '@auth/core/adapters';
import Credentials from '@auth/core/providers/credentials'
import Google from '@auth/core/providers/google';
import { db, eq, User, and } from 'astro:db';
import { defineConfig } from 'auth-astro';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';

export default defineConfig({
    providers: [
        //TODO:
        // GitHub({
        //     clientId: import.meta.env.GITHUB_CLIENT_ID,
        //     clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        // }),
        Google({
            clientId: import.meta.env.GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'select_account', // Fuerza siempre la selección de cuenta
                },
            },
            profile: async (profile) => {
                // Verifica si el usuario de Google ya está en la base de datos
                const [user] = await db.select()
                    .from(User)
                    .where(and(
                        eq(User.email, profile.email as string),
                        eq(User.isGoogle, true)
                    ));

                if (!user) {
                    // Si no está, crea un nuevo usuario en la base de datos
                    const newUser = {
                        id: UUID(),
                        name: profile.name as string,
                        email: profile.email as string,
                        password: '',
                        isGoogle: true,
                        role: 'user',

                    };

                    await db.insert(User).values(newUser);

                    const { password: _, ...rest } = newUser;
                    //console.log({ rest });

                    return rest;
                }
                const { password: _, ...rest } = user;
                return user;
            },
        }),
        Credentials({
            credentials: {
                email: { label: 'Correo', type: 'email' },
                password: { label: 'Contraseña', type: 'password' },
            },
            authorize: async ({ email, password }) => {
                const [user] = await db.select()
                    .from(User)
                    .where(and(
                        eq(User.email, email as string),
                        eq(User.isGoogle, false)
                    ))

                if (!user) {
                    throw new Error("User Not found");
                }

                if (!bcrypt.compareSync(password as string, user.password)) {
                    throw new Error("Invalid Credentials");
                }

                const { password: _, ...rest } = user;
                console.log({ rest });

                return rest;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: ({ session, token }) => {
            session.user = token.user as AdapterUser;
            // console.log({ SessionUser: session.user });
            return session;
        },
    }
});