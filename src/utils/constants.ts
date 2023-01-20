export const DAO_NAME = 'FDD';
export const DAO_ADDRESS = '0x24f7812b7ea1ebf27c98e44b487dd1267d8eacb8';
export const DAO_CHAIN = '0x5';
export const SAFE_ADDRESS = '0x36945b167363976a26ea2f64190770e2bb5dd093';

export const PROPOSAL_FILTERS: { [key: string]: string } = {
  unsponsored: 'Unsponsored',
  voting: 'In Voting',
  grace: 'In Grace',
  needsProcessing: 'Ready to Execute',
  passed: 'Passed',
  actionFailed: 'Action Failed',
  failed: 'Defeated',
  expired: 'Expired',
};

export enum ProposalTypeIds {
  Signal = 'SIGNAL',
  IssueSharesLoot = 'ISSUE',
  AddShaman = 'ADD_SHAMAN',
  TransferErc20 = 'TRANSFER_ERC20',
  TransferNetworkToken = 'TRANSFER_NETWORK_TOKEN',
  UpdateGovSettings = 'UPDATE_GOV_SETTINGS',
  UpdateTokenSettings = 'TOKEN_SETTINGS',
  TokensForShares = 'TOKENS_FOR_SHARES',
  GuildKick = 'GUILDKICK',
  WalletConnect = 'WALLETCONNECT',
  Multicall = 'MULTICALL',
  AddSigner = 'ADD_SIGNER',
  RunPayroll = 'RUN_PAYROLL',
}

export const PROPOSAL_TYPE_LABELS: { [key: string]: string } = {
  SIGNAL: 'Signal Proposal',
  ISSUE: 'Token Proposal',
  ADD_SHAMAN: 'Shaman Proposal',
  TRANSFER_ERC20: 'Funding Proposal',
  TRANSFER_NETWORK_TOKEN: 'Funding Proposal',
  UPDATE_GOV_SETTINGS: 'Governance Proposal',
  TOKEN_SETTINGS: 'Token Proposal',
  TOKENS_FOR_SHARES: 'Token Proposal',
  GUILDKICK: 'Token Proposal',
  WALLETCONNECT: 'WalletConnect Proposal',
  MULTICALL: 'Multicall Proposal',
  ADD_SIGNER: 'Add Safe Signer Proposal',
  RUN_PAYROLL: 'Run Payroll Proposal',
};

export const PROPOSAL_TYPE_WARNINGS: { [key: string]: string } = {
  SIGNAL: 'Proposal for DAO voting signal. No transactions are executed.',
  ISSUE: 'Proposal issues voting or non-voting tokens from the DAO.',
  TRANSFER_ERC20: 'Proposal transfers ERC-20 tokens from DAO treasury.',
  TRANSFER_NETWORK_TOKEN: 'Proposal transfers native tokens from DAO treasury.',
  ADD_SHAMAN: 'Proposal grants DAO permissions to an external contract.',
  UPDATE_GOV_SETTINGS:
    'Proposal updates DAO proposal timing or advanced governance settings.',
  TOKEN_SETTINGS:
    'Proposal updates DAO voting or non-voting token transferability settings.',
  TOKENS_FOR_SHARES:
    'Proposal issues voting or non-voting tokens from the DAO.',
  GUILDKICK: 'Proposal transfers DAO voting tokens into non-voting tokens.',
  WALLETCONNECT: 'Proposal interacts with external contracts and applications.',
  ADD_SIGNER:
    'Proposal adds a signer to one of the DAO non-ragequittable vaults.',
  RUN_PAYROLL:
    'Proposal sends funds from the payroll safe to multiple addresses.',
  MULTICALL: 'TODO: Proposal description', // TOOD:
  ERROR_CANNOT_DECODE:
    'Cannot decode contract details for this proposal. Please proceed with extreme caution!',
  ERROR_UNKOWN:
    'Cannot verify contract details for this proposal. Please proceed with extreme caution!',
};

export const SENSITIVE_PROPOSAL_TYPES: { [key: string]: boolean } = {
  ADD_SHAMAN: true,
};

export const DAO_METHOD_TO_PROPOSAL_TYPE: { [key: string]: string } = {
  setShamans: ProposalTypeIds.AddShaman,
};
