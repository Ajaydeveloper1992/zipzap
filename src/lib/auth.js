import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Define your NextAuth options
export const authOptions = {
    providers: [
      CredentialsProvider({
        // Your credentials provider options
        async authorize(credentials) {
            const res = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: credentials.identifier,
                    password: credentials.password,
                }),
            });
        
            const user = await res.json();
        
            if (res.ok && user) {
                return user; // This will be accessible in your session
            } else {
                throw new Error(user.error || 'Login failed');
            }
        }
        
      }),
    ],
    // Other NextAuth options (callbacks, session strategy, etc.)
  };
  export default NextAuth(authOptions); 