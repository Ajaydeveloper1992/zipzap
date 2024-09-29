import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

// Define authOptions at the top level
const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: "Username or Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post('/api/auth/login', {
                        identifier: credentials.identifier,
                        password: credentials.password,
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });

                    const user = res.data;

                    if (res.status === 200 && user) {
                        return user; // Return user object to NextAuth
                    } else {
                        throw new Error(user.error || 'Login failed');
                    }
                } catch (error) {
                    throw new Error(error.response?.data?.error || 'Login failed');
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin', // Custom sign-in page
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.email = token.email;
            session.user.role = token.role;
            return session;
        }
    },
};

export async function GET(req) {
    return NextAuth(req, authOptions);
}

export async function POST(req) {
    return NextAuth(req, authOptions);
}
