import { useState } from "react";
import styled from "styled-components";

import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  ParMd,
  SingleColumnLayout,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import { ButtonRouterLink } from "../components/ButtonRouterLink";
import { useConnectedMember, useDao } from "@daohaus/moloch-v3-context";
import { VaultOverview } from "../components/VaultOverview";

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

const VAULT_NAMES = ["Trading"];

export function Trading() {
  const { dao } = useDao();
  const { connectedMember } = useConnectedMember();

  const [open, setOpen] = useState(false);
  const isMd = useBreakpoint(widthQuery.md);
  const isMobile = useBreakpoint(widthQuery.sm);

  const handleClose = () => {
    setOpen(false);
  };

  const VaultExplainer = styled.div`
    margin-bottom: 3rem;
  `;

  return (
    <SingleColumnLayout
      title="Trading"
      actions={
        <Actions>
          {connectedMember && (
            <>
              <ButtonRouterLink
                to={`/new-proposal?formLego=ISSUE`}
                color="secondary"
                fullWidth={isMd}
                linkType="no-icon-external"
              >
                Delegate Trader
              </ButtonRouterLink>
              <ButtonRouterLink
                to={`/members/${connectedMember.memberAddress}`}
                fullWidth={isMd}
                linkType="no-icon-external"
                color="secondary"
              >
                Take Profit
              </ButtonRouterLink>
            </>
          )}
        </Actions>
      }
    >
      {dao?.vaults
        .filter((v) => VAULT_NAMES.includes(v.name))
        .map(
          (vault) =>
            dao &&
            vault && (
              <div key={vault.id}>
                <VaultExplainer>
                  <ParMd>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer sit amet odio varius, tincidunt quam at, bibendum
                    erat. Quisque tristique sed sem sed iaculis.
                  </ParMd>
                </VaultExplainer>
                <VaultContainer key={vault.id}>
                  <VaultOverview dao={dao} vault={vault} />
                </VaultContainer>
              </div>
            )
        )}
    </SingleColumnLayout>
  );
}

export default Trading;
