import { FormLego } from '@daohaus/form-builder';
import { FIELD } from './fields';
import { TX } from './tx';

export const FORM: Record<string, FormLego> = {
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
};
