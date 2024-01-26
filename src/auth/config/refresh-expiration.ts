type RefreshExpiration = { asString: string; asNumber: number };

const refreshExpiration: RefreshExpiration = {
  asString: '7d',
  asNumber: 1000 * 60 * 60 * 24 * 7,
} as const;

export default refreshExpiration;
