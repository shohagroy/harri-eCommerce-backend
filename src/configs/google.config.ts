import envConfig from "./env.config";

export interface GoogleConfig {
  clientID: string | undefined;
  clientSecret: string | undefined;
  callbackURL: string | undefined;
}

const googleConfig: GoogleConfig = {
  clientID: envConfig.GOOGGLE_CLIENT_ID,
  clientSecret: envConfig.GOOGGLE_CLIENT_SECRET,
  callbackURL:
    envConfig.DEVELOPMENT !== "production"
      ? envConfig.GOOGGLE_CALL_BACK_URL
      : `${envConfig.SERVER_URL}/auth/callback`,
};

export default googleConfig;
