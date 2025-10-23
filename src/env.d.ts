declare namespace NodeJS {
  interface ProcessEnv {
    OPENAI_API_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REFRESH_TOKEN: string;
    BLOGGER_BLOG_ID: string;
    DEFAULT_TOPIC?: string;
    DEFAULT_KEYWORDS?: string;
  }
}
