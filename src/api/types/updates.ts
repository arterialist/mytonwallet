import {
  ApiStakingState,
  ApiToken,
  ApiTransaction,
  ApiTransactionDraftError,
  ApiDapp,
  ApiBackendStakingState,
  ApiDappTransaction,
} from './misc';

export type ApiUpdateBalance = {
  type: 'updateBalance';
  accountId: string;
  slug: string;
  balance: string;
};

export type ApiUpdateNewTransactions = {
  type: 'newTransactions';
  accountId: string;
  transactions: ApiTransaction[];
};

export type ApiUpdateNewLocalTransaction = {
  type: 'newLocalTransaction';
  accountId: string;
  transaction: ApiTransaction;
};

export type ApiUpdateTokens = {
  type: 'updateTokens';
  tokens: Record<string, ApiToken>;
};

export type ApiUpdateCreateTransaction = {
  type: 'createTransaction';
  promiseId: string;
  toAddress: string;
  amount: string;
  fee: string;
  comment?: string;
};

export type ApiUpdateCreateSignature = {
  type: 'createSignature';
  promiseId: string;
  dataHex: string;
};

export type ApiUpdateTxComplete = {
  type: 'updateTxComplete';
  accountId: string;
  toAddress: string;
  amount: string;
  txId: string;
  localTxId: string;
};

export type ApiUpdateShowTxDraftError = {
  type: 'showTxDraftError';
  error?: ApiTransactionDraftError;
};

export type ApiUpdateTonProxyState = {
  type: 'updateTonProxyState';
  isEnabled: boolean;
};

export type ApiUpdateTonMagicState = {
  type: 'updateTonMagicState';
  isEnabled: boolean;
};

export type ApiUpdateDeeplinkHookState = {
  type: 'updateDeeplinkHookState';
  isEnabled: boolean;
};

export type ApiUpdateStakingState = {
  type: 'updateStakingState';
  accountId: string;
  stakingState: ApiStakingState;
};

export type ApiUpdateBackendStakingState = {
  type: 'updateBackendStakingState';
  backendStakingState: ApiBackendStakingState;
};

export type ApiUpdateActiveDapp = {
  type: 'updateActiveDapp';
  accountId: string;
  origin?: string;
};

export type ApiUpdateDappSendTransactions = {
  type: 'dappSendTransactions';
  promiseId: string;
  accountId: string;
  dapp: ApiDapp;
  transactions: ApiDappTransaction[];
  fee: string;
};

export type ApiUpdateDappConnect = {
  type: 'dappConnect';
  promiseId: string;
  accountId: string;
  dapp: ApiDapp;
  permissions: {
    address: boolean;
    proof: boolean;
  };
};

export type ApiUpdateDappDisconnect = {
  type: 'dappDisconnect';
  accountId: string;
  origin: string;
};

export type ApiUpdatePrepareTransaction = {
  type: 'prepareTransaction';
  toAddress: string;
  amount?: string;
  comment?: string;
};

export type ApiUpdate =
  ApiUpdateBalance
  | ApiUpdateNewTransactions
  | ApiUpdateNewLocalTransaction
  | ApiUpdateTokens
  | ApiUpdateCreateTransaction
  | ApiUpdateCreateSignature
  | ApiUpdateTxComplete
  | ApiUpdateShowTxDraftError
  | ApiUpdateTonProxyState
  | ApiUpdateTonMagicState
  | ApiUpdateDeeplinkHookState
  | ApiUpdateStakingState
  | ApiUpdateActiveDapp
  | ApiUpdateDappSendTransactions
  | ApiUpdateDappConnect
  | ApiUpdateDappDisconnect
  | ApiUpdateBackendStakingState
  | ApiUpdatePrepareTransaction;

export type OnApiUpdate = (update: ApiUpdate) => void;
