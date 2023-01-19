import { SUMMON_COPY } from '../data/copy';
import { CustomFormLego } from './config';
import { FIELD } from './fields';
import { TX } from './tx';

export const getFormLegoById = (
  id: CustomFormLego['id']
): CustomFormLego | undefined => {
  const allForms = { ...FORM };
  const formKey = Object.keys(allForms).find(key => {
    return allForms[key].id === id;
  });
  if (!formKey) return;
  return allForms[formKey];
};

export const FORM: Record<string, CustomFormLego> = {
  SIGNAL: {
    id: 'SIGNAL',
    title: 'Signal Form',
    subtitle: 'Signal Proposal',
    description: 'Ratify on-chain using a DAO proposal.',
    requiredFields: { title: true, description: true },
    log: true,
    tx: TX.POST_SIGNAL,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  ADD_SAFE: {
    id: 'ADD_SAFE',
    description:
      'Create a new Gnosis Safe and attach to your DAO as a non-ragequittable vault.',
    requiredFields: {
      name: true,
    },
    tx: TX.ADD_SAFE,
    fields: [
      {
        id: 'name',
        type: 'input',
        label: 'Safe Name',
        placeholder: 'Enter name',
      },
    ],
    submitButtonText: 'Create',
  },
  MANAGE_DELEGATE: {
    id: 'MANAGE_DELEGATE',
    fields: [FIELD.DELEGATE],
    requiredFields: {
      delegatingTo: true,
    },
    submitButtonText: 'Update Delegate',
    tx: TX.MANAGE_DELEGATE,
  },
  RAGEQUIT: {
    id: 'RAGEQUIT',
    title: 'Ragequit',
    subtitle: 'Members',
    fields: [
      {
        id: 'tokenAmounts',
        type: 'formSegment',
        title: 'Step 1. Select voting and/or non-voting tokens to ragequit',
        fields: [
          {
            id: 'sharesToBurn',
            type: 'ragequitToken',
          },
          { id: 'lootToBurn', type: 'ragequitToken' },
        ],
      },
      {
        id: 'tokenAddresses',
        type: 'formSegment',
        title:
          'Step 2. Select treasury tokens you want to receive in exchange for your DAO tokens',
        fields: [{ id: 'tokens', type: 'ragequitTokenList' }],
      },
      {
        id: 'checkRender',
        type: 'checkRender',
        gateLabel: 'Ragequit to different address (optional)',
        components: [
          {
            id: 'to',
            type: 'input',
            label: 'Address to send funds',
            expectType: 'ethAddress',
            placeholder: '0x...',
          },
        ],
      },
    ],
    tx: TX.RAGEQUIT,
  },
  CONVERT: {
    id: 'CONVERT',
    title: 'Convert Voting Tokens to Loot Tokens',
    subtitle: 'Convert Proposal',
    description: 'Change your voting tokens into non-voting tokens.',
    tx: TX.CONVERT,
    log: true,
    requiredFields: {
      title: true,
      sharesToBurn: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.CONVERT_TOKEN,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  NEW_MEMBER: {
    id: 'NEW_MEMBER',
    title: 'Accept Offer',
    subtitle: 'Token Proposal',
    description: 'Request voting tokens from the DAO.',
    tx: TX.ISSUE_SHARES,
    requiredFields: {
      title: true,
      description: true,
      sharesRequested: true,
      lootRequested: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        expectType: 'ethAddress',
        placeholder: '0x...',
      },
      {
        ...FIELD.TO_WEI,
        label: 'Voting Tokens Requested',
        id: 'sharesRequested',
      },
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  METADATA_SETTINGS: {
    id: 'METADATA_SETTINGS',
    title: 'Update Metadata Settings',
    subtitle: 'Settings',
    requiredFields: { name: true },
    tx: TX.UPDATE_METADATA_SETTINGS,
    fields: [
      FIELD.NAME,
      FIELD.DESCRIPTION,
      {
        ...FIELD.DESCRIPTION,
        id: 'long_description',
        label: 'Long Description',
      },
      { ...FIELD.LINK, id: 'icon', label: 'Icon' },
      {
        id: 'links',
        type: 'formSegment',
        title: 'Add links to important content for your DAO',
        fields: [
          { ...FIELD.LINK, id: 'discord', label: 'Discord' },
          { ...FIELD.METADATA_LINK, id: 'github', label: 'Github' },
          { ...FIELD.METADATA_LINK, id: 'blog', label: 'Blog' },
          { ...FIELD.METADATA_LINK, id: 'telegram', label: 'Telegram' },
          { ...FIELD.METADATA_LINK, id: 'twitter', label: 'Twitter' },
          { ...FIELD.METADATA_LINK, id: 'web', label: 'Website' },
          { ...FIELD.METADATA_LINK, id: 'custom1', label: 'Custom Link 1' },
          { ...FIELD.METADATA_LINK, id: 'custom2', label: 'Custom Link 2' },
          { ...FIELD.METADATA_LINK, id: 'custom3', label: 'Custom Link 3' },
        ],
      },
      FIELD.TAGS,
    ],
  },
  UPDATE_GOV_SETTINGS: {
    id: 'UPDATE_GOV_SETTINGS',
    title: 'Update Governance Settings',
    subtitle: 'Governance Proposal',
    description: 'Change proposal timing or advanced governance settings.',
    tx: TX.UPDATE_GOV_SETTINGS,
    requiredFields: {
      title: true,
      description: true,
      votingPeriod: true,
      gracePeriod: true,
      quorum: true,
      minRetention: true,
      sponsorThreshold: true,
      newOffering: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'timing',
        type: 'formSegment',
        title: 'Proposal Timing',
        description: 'Update your timing for Voting and Grace periods.',
        fields: [
          {
            id: 'timingSplit',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'timingRows',
                left: {
                  id: 'votingPeriod',
                  type: 'timePicker',
                  label: 'Voting Period',
                  info: SUMMON_COPY.VOTING_PERIOD,
                },
                right: {
                  id: 'gracePeriod',
                  type: 'timePicker',
                  label: 'Grace Period',
                  info: SUMMON_COPY.GRACE_PERIOD,
                },
              },
            ],
          },
        ],
      },
      {
        id: 'advanced',
        type: 'formSegment',
        title: 'Advanced Governance',
        description: 'Modify some advanced governance features.',
        fields: [
          {
            id: 'advancedSplit',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'row1',
                left: {
                  id: 'quorum',
                  type: 'input',
                  expectType: 'percent',
                  label: 'Quorum %',
                  placeholder: '20',
                  info: SUMMON_COPY.QUORUM,
                },
                right: {
                  id: 'minRetention',
                  type: 'input',
                  label: 'Min Retention',
                  expectType: 'percent',
                  placeholder: '66',
                  info: SUMMON_COPY.MIN_RETENTION,
                },
              },
              {
                rowId: 'row2',
                left: {
                  id: 'sponsorThreshold',
                  type: 'toWeiInput',
                  expectType: 'number',
                  label: 'Sponsor Threshold',
                  placeholder: '1',
                  info: SUMMON_COPY.SPONSOR_THRESHOLD,
                },
                right: {
                  id: 'newOffering',
                  type: 'toWeiInput',
                  label: 'New Offering',
                  expectType: 'number',
                  placeholder: '0',
                  info: SUMMON_COPY.NEW_OFFERING,
                },
              },
            ],
          },
        ],
      },
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TOKEN_SETTINGS: {
    id: 'TOKEN_SETTINGS',
    title: 'Update Token Settings',
    subtitle: 'Token Proposal',
    description: 'Change transferability of voting or non-voting tokens.',
    tx: TX.TOKEN_SETTINGS,
    requiredFields: {
      title: true,
      description: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'tokenSettings',
        type: 'formSegment',
        title: 'DAO Tokens',
        description: 'Update Token Transferability',
        fields: [
          {
            id: 'split',
            type: 'splitColumn',
            rows: [
              {
                rowId: 'row1',
                left: {
                  id: 'vStake',
                  type: 'switch',
                  label: 'Voting Token',
                  info: SUMMON_COPY.STAKE_TRANSFER,
                  switches: [
                    {
                      id: 'vStake',
                      fieldLabel: {
                        off: 'Transferable',
                        on: 'Not Transferable',
                      },
                    },
                  ],
                },
                right: {
                  id: 'nvStake',
                  type: 'switch',
                  label: 'Non-Voting Token',
                  info: SUMMON_COPY.NV_STAKE_TRANSFER,
                  switches: [
                    {
                      id: 'nvStake',
                      fieldLabel: {
                        off: 'Transferable',
                        on: 'Not Transferable',
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  UPDATE_SHAMAN: {
    id: 'UPDATE_SHAMAN',
    title: 'Update Shaman Settings',
    description: 'Reduce shaman permissions level.',
    subtitle: 'Shaman Proposal',
    requiredFields: {
      title: true,
      description: true,
      shamanAddress: true,
      shamanPermission: true,
    },
    tx: TX.ADD_SHAMAN,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      { ...FIELD.SHAMAN_ADDRESS, disabled: true },
      FIELD.SHAMAN_DELUXE,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  ADD_SHAMAN: {
    id: 'ADD_SHAMAN',
    title: 'Add Shaman',
    description: 'Grant DAO permissions to an external contract.',
    subtitle: 'Shaman Proposal',
    requiredFields: {
      title: true,
      description: true,
      shamanAddress: true,
      shamanPermission: true,
    },
    tx: TX.ADD_SHAMAN,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.SHAMAN_ADDRESS,
      FIELD.SHAMAN_PERMISSION,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TRANSFER_ERC20: {
    id: 'TRANSFER_ERC20',
    title: 'ERC-20 Token Transfer',
    subtitle: 'Funding Proposal',
    description: 'Request ERC-20 tokens from the DAO treasury.',
    tx: TX.ISSUE_ERC20,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  FUND_TRADING: {
    id: 'FUND_TRADING',
    title: 'Fund Trading',
    subtitle: 'Funding Proposal',
    description:
      'Transfer ERC-20 tokens from the DAO treasury to the Trading safe.',
    tx: TX.ISSUE_ERC20,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  FUND_VENDOR: {
    id: 'FUND_VENDOR',
    title: 'Fund Vendor',
    subtitle: 'Funding Proposal',
    description:
      'Transfer ERC-20 tokens from the DAO treasury to the Vendor safe.',
    tx: TX.ISSUE_ERC20,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  APPROVE_SPENDING: {
    id: 'APPROVE_SPENDING',
    title: 'Approve Spending',
    subtitle: 'Funding Proposal',
    description:
      'Transfer ERC-20 tokens from the DAO treasury to fund a project.',
    tx: TX.ISSUE_ERC20,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TRANSFER_ERC20_SIDECAR: {
    id: 'TRANSFER_ERC20_SIDECAR',
    title: 'Transfer ERC-20',
    subtitle: 'Transfer Proposal',
    description:
      'Create a proposal to transfer ERC-20 tokens from the DAO safe',
    tx: TX.ISSUE_ERC20_SIDECAR,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.SAFE_SELECT,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TAKE_PROFIT: {
    id: 'TAKE_PROFIT',
    title: 'Take Profit',
    subtitle: 'Transfer Proposal',
    description:
      'Transfer ERC-20 tokens from the Trading safe to the DAO treasury.',
    tx: TX.ISSUE_ERC20_SIDECAR,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.SAFE_SELECT,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_TOKEN,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TRANSFER_NETWORK_TOKEN: {
    id: 'TRANSFER_NETWORK_TOKEN',
    title: 'Network Token Transfer',
    subtitle: 'Funding Proposal',
    description: "Request network's native token from the DAO treasury.",
    tx: TX.ISSUE_NETWORK_TOKEN,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_NATIVE_TOKEN,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  TRANSFER_NETWORK_TOKEN_SIDECAR: {
    id: 'TRANSFER_NETWORK_TOKEN_SIDECAR',
    title: 'Network Token Transfer',
    subtitle: 'Funding Proposal',
    description: "Request network's native token from the DAO safe.",
    tx: TX.ISSUE_NETWORK_TOKEN_SIDECAR,
    requiredFields: {
      title: true,
      description: true,
      payment: true,
      recipient: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.SAFE_SELECT,
      {
        id: 'recipient',
        type: 'input',
        label: 'Recipient',
        info: 'Address to receive the tokens',
        placeholder: '0x...',
      },
      FIELD.REQUEST_NATIVE_TOKEN,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  GUILDKICK: {
    id: 'GUILDKICK',
    title: 'Remove Member',
    subtitle: 'Token Proposal',
    description: 'Change a member’s voting tokens into non-voting tokens.',
    tx: TX.GUILDKICK,
    requiredFields: {
      title: true,
      memberAddress: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      {
        ...FIELD.APPLICANT,
        id: 'memberAddress',
        label: 'Member',
        // @ts-expect-error: doing object spread, even if the field definition has the property
        daoMemberOnly: true,
      },
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  ADD_SIGNER_TO_SIDECAR: {
    id: 'ADD_SIGNER_TO_SIDECAR',
    title: 'Delegate Trader',
    subtitle: 'Role Proposal',
    description: 'Add signer to the Trading safe multi-signature wallet.',
    tx: TX.ADD_SIGNER_TO_SIDECAR,
    log: true,
    requiredFields: {
      title: true,
      description: true,
      signer: true,
      threshold: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.SAFE_SELECT,
      {
        id: 'signer',
        type: 'input',
        label: 'Signer',
        info: 'Signer Address',
        expectType: 'ethAddress',
        placeholder: '0x...',
      },
      {
        id: 'threshold',
        type: 'input',
        label: 'Threshold',
        info: 'Number of signatures needed to execute a transaction',
        expectType: 'number',
        placeholder: '1',
      },
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  DISPERSE_ERC20_SIDECAR: {
    id: 'DISPERSE_ERC20_SIDECAR',
    title: 'Run Payroll',
    subtitle: 'Token Proposal',
    description: 'Transfer ERC-20 tokens from the Vendor safe to DAO members.',
    tx: TX.DISPERSE_ERC20_SIDECAR,
    log: true,
    requiredFields: {
      title: true,
      description: true,
      paymentTokenAddress: true,
    },
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      FIELD.DISPERSE_TOKEN,
      {
        ...FIELD.DISPERSE_ADDRESS_AMOUNTS,
        info: 'Input list with member address and payment amount per row using spaces. Example: \n 0x00000000000000 20',
      },
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};
