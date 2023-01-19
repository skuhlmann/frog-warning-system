import styled from 'styled-components';
import {
  H3,
  H4,
  DataIndicator,
  ParSm,
  widthQuery,
  Theme,
  Button,
  Link,
} from '@daohaus/ui';

import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  charLimit,
  formatPeriods,
  formatValueTo,
  fromWei,
  INFO_COPY,
  lowerCaseLootToken,
} from '@daohaus/utils';

import { getNetwork } from '@daohaus/keychain-utils';

import { useMemo } from 'react';
import { DAO_ADDRESS, DAO_CHAIN } from '../utils/constants';

const GovernanceContainer = styled.div`
  h4 {
    margin-top: 4rem;
  }
`;

const GovernanceCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const TokensHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    margin-top: 3rem;
    width: 34rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

const TokenDataGrid = styled(DataGrid)`
  div {
    width: 22.7rem;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }: { theme: Theme }) => theme.primary.step10};
  :hover {
    text-decoration: none;
  }
`;

const StyledButtonLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

type GovernanceSettingsProps = {
  dao: MolochV3Dao;
};

export const TokenSettings = ({ dao }: GovernanceSettingsProps) => {
  const daochain = DAO_CHAIN;
  const daoid = DAO_ADDRESS;
  const networkData = useMemo(() => {
    if (!daochain) return null;
    return getNetwork(daochain);
  }, [daochain]);

  const defaultValues = useMemo(() => {
    if (!dao) return null;
    return {
      votingPeriod: dao.votingPeriod,
      votingPeriodUnits: 'seconds',
      gracePeriodUnits: 'seconds',
      gracePeriod: dao.gracePeriod,
      proposalOffering: dao.proposalOffering,
      quorum: dao.quorumPercent,
      minRetention: dao.minRetentionPercent,
      sponsorThreshold: dao.sponsorThreshold,
      newOffering: dao.proposalOffering,
      vStake: dao.sharesPaused,
      nvStake: dao.lootPaused,
    };
  }, [dao]);

  return (
    <GovernanceContainer>
      <TokensHeader>
        <H3 className='tokens'>DAO Tokens</H3>
        <StyledButtonLink
          href={`/new-proposal?formLego=TOKEN_SETTINGS&defaultValues=${JSON.stringify(
            defaultValues
          )}`}
        >
          <Button color='secondary'>Update Tokens</Button>
        </StyledButtonLink>
      </TokensHeader>
      <H4>Voting</H4>
      <TokenDataGrid>
        <DataIndicator
          size='sm'
          label='Total'
          data={formatValueTo({
            value: fromWei(dao.totalShares),
            decimals: 2,
            format: 'number',
          })}
        />
        <DataIndicator size='sm' label='Symbol' data={dao.shareTokenSymbol} />
        <DataIndicator
          size='sm'
          label='Name'
          data={charLimit(dao.shareTokenName, 12)}
        />
        <DataIndicator
          size='sm'
          label='Transferability'
          data={dao.sharesPaused ? 'Off' : 'On'}
        />
      </TokenDataGrid>
      <H4>Non-Voting</H4>
      <TokenDataGrid>
        <DataIndicator
          size='sm'
          label='Total'
          data={formatValueTo({
            value: fromWei(dao.totalLoot),
            decimals: 2,
            format: 'number',
          })}
        />
        <DataIndicator size='sm' label='Symbol' data={dao.lootTokenSymbol} />
        <DataIndicator
          size='sm'
          label='Name'
          data={charLimit(lowerCaseLootToken(dao.lootTokenName), 12)}
        />
        <DataIndicator
          size='sm'
          label='Transferability'
          data={dao.lootPaused ? 'Off' : 'On'}
        />
      </TokenDataGrid>
    </GovernanceContainer>
  );
};
