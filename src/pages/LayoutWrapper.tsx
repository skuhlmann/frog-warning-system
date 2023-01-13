import { ReactNode } from "react";
import { DHLayout } from "@daohaus/connect";
import { useDao } from "@daohaus/moloch-v3-context";
import { useLocation } from "react-router-dom";
import { HeaderAvatar } from "../components/HeaderAvatar";
import { DAO_ADDRESS, DAO_NAME } from "../utils/constants";

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const { dao } = useDao();

  return (
    <DHLayout
      pathname={pathname}
      navLinks={[
        { label: "Home", href: "/" },
        { label: "Proposals", href: "/proposals" },
        { label: "Members", href: "/members" },
        { label: "Treasury", href: "/treasury" },
        { label: "Operations", href: "/operations" },
        { label: "Trading", href: "/trading" },
        { label: "Settings", href: "/settings" },
      ]}
      leftNav={
        <HeaderAvatar
          name={DAO_NAME}
          address={DAO_ADDRESS}
          imgUrl={dao?.avatarImg}
        />
      }
    >
      {children}
    </DHLayout>
  );
};
