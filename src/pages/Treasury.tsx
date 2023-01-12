import { useState } from "react";
import styled from "styled-components";

import {
  Card,
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

const VaultExplainer = styled.div`
  margin-bottom: 3rem;
`;

export function Treasury() {
  const { dao } = useDao();
  const { connectedMember } = useConnectedMember();

  const [open, setOpen] = useState(false);
  const isMd = useBreakpoint(widthQuery.md);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SingleColumnLayout
      title="Treasury"
      actions={
        <Actions>
          <ButtonRouterLink
            to={`/new-proposal?formLego=ISSUE`}
            color="secondary"
            fullWidth={isMd}
            linkType="no-icon-external"
          >
            Approve Spending
          </ButtonRouterLink>
          {connectedMember && (
            <ButtonRouterLink
              to={`/members/${connectedMember.memberAddress}`}
              fullWidth={isMd}
              linkType="no-icon-external"
            >
              Fund Trading
            </ButtonRouterLink>
          )}
        </Actions>
      }
    >
      {dao?.vaults
        .filter((v) => Number(v.ragequittable))
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

export default Treasury;
