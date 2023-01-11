import styled from "styled-components";
import { AddressDisplay, Button, DataSm, Link, widthQuery } from "@daohaus/ui";

import { Keychain } from "@daohaus/keychain-utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { DAO_ADDRESS, DAO_CHAIN } from "../utils/constants";

const ShamanContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    margin-top: 3rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
  .contract {
    width: 60%;
  }
  .manage {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 40%;
  }
`;

const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

type ShamanListProps = {
  shamen: MolochV3Dao["shamen"];
};

export const ShamanList = ({ shamen }: ShamanListProps) => {
  const daochain = DAO_CHAIN;
  const daoid = DAO_ADDRESS;
  return (
    <>
      <ShamanContainer>
        <div className="contract">
          <DataSm>Contract</DataSm>
        </div>
        <div>
          <DataSm>Permissions</DataSm>
        </div>
      </ShamanContainer>
      {shamen &&
        shamen.map((shaman) => (
          <ShamanContainer key={shaman.id}>
            <span className="contract">
              <AddressDisplay
                address={shaman.shamanAddress}
                explorerNetworkId={daochain as keyof Keychain}
              />
            </span>
            <div className="manage">
              <DataSm>{shaman.permissions}</DataSm>
              <StyledLink
                href={`/new-proposal?formLego=UPDATE_SHAMAN&defaultValues=${JSON.stringify(
                  {
                    shamanAddress: shaman.shamanAddress,
                    shamanPermission: shaman.permissions,
                  }
                )}`}
              >
                <Button color="secondary" size="sm">
                  Manage
                </Button>
              </StyledLink>
            </div>
          </ShamanContainer>
        ))}
    </>
  );
};
