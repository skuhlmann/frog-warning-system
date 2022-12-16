import { useState } from 'react';
import styled from 'styled-components';

import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  SingleColumnLayout,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { ButtonRouterLink } from '../components/ButtonRouterLink';
import { useConnectedMember, useDao } from '@daohaus/moloch-v3-context';
import { VaultOverview } from '../components/VaultOverview';

const Actions = styled.div`
  display: flex;
  width: 100%;
  button:first-child {
    margin-right: 1rem;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button:first-child {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;

const VaultContainer = styled(Card)`
  padding: 3rem;
  width: 100%;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Treasury() {
  const { dao } = useDao();
  const { connectedMember } = useConnectedMember();

  const [open, setOpen] = useState(false);
  const isMd = useBreakpoint(widthQuery.md);
  const isMobile = useBreakpoint(widthQuery.sm);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SingleColumnLayout
      title='Treasury'
      actions={
        <Actions>
          <ButtonRouterLink
            to={`/molochv3/${'0x5'}/${'0x9789ac55e21939f3cc771325c6a23e8497182042'}/new-proposal?formLego=ISSUE`}
            color='secondary'
            fullWidth={isMd}
            linkType='no-icon-external'
          >
            Approve Spending
          </ButtonRouterLink>
          {connectedMember && (
            <ButtonRouterLink
              to={`/members/${connectedMember.memberAddress}`}
              fullWidth={isMd}
              linkType='no-icon-external'
              // centerAlign={isMd}
            >
              Fund Trading
            </ButtonRouterLink>
          )}
        </Actions>
      }
    >
      {dao?.vaults
        .sort((a, b) => Number(b.ragequittable) - Number(a.ragequittable))
        .map(
          vault =>
            dao &&
            vault && (
              <VaultContainer key={vault.id}>
                <VaultOverview dao={dao} vault={vault} />
              </VaultContainer>
            )
        )}
    </SingleColumnLayout>
  );
}

export default Treasury;
