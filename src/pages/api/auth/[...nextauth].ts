import NextAuth, { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: "secret",
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    session: async ({ session, user, token }) => {
      if (session.user && token) {
        session.user.name = token.name;
        session.token = token;
      }
      return session;
    },
  },
  providers: [
    {
      id: "trackmania",
      name: "Trackmania",
      type: "oauth",
      wellKnown: "https://api.trackmania.com/.well-known/openid-configuration",
      authorization: { params: { scope: "clubs" } },
      idToken: false,
      clientId: "76f8d427c66af3ce718e",
      clientSecret: "a1db575b38950d3a7b49570ded570ae68eb8028d",
      checks: ["pkce", "state"],
      profile(profile: any) {
        return {
          id: profile.accountId,
          name: profile.displayName,
        };
      },
    },
  ],
};

export default NextAuth(authOptions);
