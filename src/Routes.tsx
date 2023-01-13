import { useDHConnect } from "@daohaus/connect";
import { Routes as Router, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Members } from "./pages/Members";
import { Proposals } from "./pages/Proposals";
import { Treasury } from "./pages/Treasury";
import { Operations } from "./pages/Operations";
import { Trading } from "./pages/Trading";
import { Settings } from "./pages/Settings";
import { MolochV3DaoProvider } from "@daohaus/moloch-v3-context";
import Member from "./pages/Member";
import { DAO_ADDRESS, DAO_CHAIN } from "./utils/constants";
import ProposalDetails from "./pages/ProposalDetails";
import NewProposal from "./pages/NewProposal";
import RageQuit from "./pages/RageQuit";
import { HomeContainer } from "./pages/HomeContainer";
import UpdateSettings from "./pages/UpdateSettings";
import { LayoutWrapper } from "./pages/LayoutWrapper";

export const Routes = () => {
  const { address } = useDHConnect();

  return (
    <MolochV3DaoProvider
      address={address}
      daoid={DAO_ADDRESS}
      daochain={DAO_CHAIN}
      graphApiKeys={{}}
    >
      <LayoutWrapper>
        <Router>
          <Route path="/" element={<HomeContainer />}>
            <Route index element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/:memberAddress" element={<Member />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="proposals/:proposalId" element={<ProposalDetails />} />
            <Route path="new-proposal" element={<NewProposal />} />
            <Route path="/treasury" element={<Treasury />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="settings/update" element={<UpdateSettings />} />
            <Route path="members/ragequit" element={<RageQuit />} />
          </Route>
        </Router>
      </LayoutWrapper>
    </MolochV3DaoProvider>
  );
};
