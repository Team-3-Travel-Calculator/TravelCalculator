import axios from 'axios';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'text' },
      },
      authorize: async (credentials) => {
        const userData = {
          email: credentials.email,
          password: credentials.password,
        };
        const response = await axios
          .post('http://localhost:9811/auth/login', userData)
          .then((res) => res);
        return Promise.resolve(response.data);
      },
    }),
  ],
  callbacks: {
    session(session, token) {
      return { ...session, token: token.user };
    },
    jwt(token, user) {
      if (user) {
        return { ...token, user };
      }
      return token;
    },
  },
});
