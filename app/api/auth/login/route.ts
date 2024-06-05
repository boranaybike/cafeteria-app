import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      
      authorize: async (credentials) => {
        const user = { id: "1", name: "user", email: "user@example.com" }
        
        if (credentials?.username === "user" && credentials?.password === "pass") {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {}
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST }