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
      // eslint-disable-next-line no-param-reassign,functional/immutable-data
      session.user = token.user;
      return session;
    },
    jwt(token, user) {
      // eslint-disable-next-line no-param-reassign,functional/immutable-data
      if (user) token.user = user;
      return token;
    },
  },
});
