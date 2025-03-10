export type ApiBlockchainKey = 'ton';
export type ApiNetwork = 'mainnet' | 'testnet';

export interface AccountIdParsed {
  id: number;
  blockchain: ApiBlockchainKey;
  network: ApiNetwork;
}

export interface ApiInitArgs {
  origin: string;
  newestTxId?: string;
}

export interface ApiBaseToken {
  name: string;
  symbol: string;
  slug: string;
  decimals: number;
  minterAddress?: string;
  image?: string;
  id?: number;
}

export interface ApiToken extends ApiBaseToken {
  quote: ApiTokenPrice;
}

export interface ApiTokenPrice {
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d: number;
  history24h?: ApiHistoryList;
  history7d?: ApiHistoryList;
  history30d?: ApiHistoryList;
}

export type ApiKnownAddresses = Record<string, ApiAddressInfo>;

export interface ApiAddressInfo {
  name?: string;
  isScam?: boolean;
}

export type ApiTxIdBySlug = Record<string, string | undefined>;
export type ApiTransactionType = 'stake' | 'unstake' | 'unstakeRequest' | undefined;

export interface ApiTransaction {
  txId: string;
  timestamp: number;
  amount: string;
  fromAddress: string;
  toAddress: string;
  comment?: string;
  fee: string;
  slug: string;
  isIncoming: boolean;
  type?: ApiTransactionType;
  metadata?: ApiTransactionMetadata;
}

export interface ApiTransactionMetadata extends ApiAddressInfo {
}

export enum ApiTransactionDraftError {
  InvalidAmount = 'InvalidAmount',
  InvalidToAddress = 'InvalidToAddress',
  InsufficientBalance = 'InsufficientBalance',
  Unexpected = 'Unexpected',
  DomainNotResolved = 'DomainNotResolved',
}

export type ApiParsedPayload = {
  type: 'comment';
  comment: string;
} | {
  type: 'transfer-nft';
  nftAddress: string;
  toAddress: string;
  nftName?: string;
} | {
  type: 'transfer-tokens';
  slug: string;
  toAddress: string;
  amount: string;
  comment?: string;
} | {
  type: 'unknown';
  base64: string;
};

export interface ApiNft {
  index: number;
  name?: string;
  address: string;
  thumbnail: string;
  image: string;
  collectionName: string;
  collectionAddress: string;
  isOnSale: boolean;
}

export type ApiHistoryList = Array<[number, number]>;
export type ApiTokenSimple = Omit<ApiToken, 'quote'>;

export interface ApiPoolState {
  startOfCycle: number;
  endOfCycle: number;
  lastApy: number;
  minStake: number;
}

export interface ApiStakingState {
  amount: number;
  pendingDepositAmount: number;
  isUnstakeRequested: boolean;
}

export interface ApiBackendStakingState {
  poolAddress: string;
  balance: number;
  totalProfit: number;
  poolState: ApiPoolState;
  profitHistory: {
    timestamp: number;
    profit: number;
  }[];
}

export interface ApiDapp {
  origin: string;
  url: string;
  name: string;
  iconUrl: string;
  manifestUrl: string;
}

export interface ApiDappPermissions {
  isAddressRequired?: boolean;
  isPasswordRequired?: boolean;
}

export type ApiDappRequest = {
  origin?: string;
  accountId?: string;
} | {
  origin: string;
  accountId: string;
};

export interface ApiDappTransaction {
  toAddress: string;
  amount: string;
  payload?: ApiParsedPayload;
}
