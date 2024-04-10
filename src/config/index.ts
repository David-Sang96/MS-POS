interface Config {
  googleClientId: string;
  googleClientSecret: string;
  backofficeApiBaseUrl: string;
  spaceEndPoint: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
}

export const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backofficeApiBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
  spaceEndPoint: process.env.SPACE_ENDPOINT || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
};
