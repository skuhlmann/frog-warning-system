import {
  H1,
  H2,
  Button,
  ParLg,
  ParMd,
  SingleColumnLayout,
  Card,
} from '@daohaus/ui';
import styled from 'styled-components';

import { ButtonRouterLink } from '../components/ButtonRouterLink';

const Cards = styled.div`
  padding: 5em 0 5em 0;
  display: flex;
  gap: 1.7rem;
`;

export const Home = () => {
  return (
    <SingleColumnLayout>
      <H1>Lorem Ipsum</H1>
      <ParLg>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
        praesentium iste nobis molestias maxime velit laudantium, facilis
        nesciunt minus illum sed necessitatibus laboriosam atque distinctio,
        assumenda at earum eius voluptate!
      </ParLg>
      <Button onClick={function noRefCheck() {}}>Join DAO</Button>
      <Cards>
        <Card>
          <H2>Proposals</H2>
          <ParMd>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </ParMd>
          <ButtonRouterLink
            to={`/proposals`}
            color='secondary'
            linkType='no-icon-external'
          >
            View Proposals
          </ButtonRouterLink>
        </Card>
        <Card>
          <H2>Members</H2>
          <ParMd>
            Ex, iusto qui vitae asperiores ad ratione officiis! Magnam
            praesentium veritatis nemo ab. Vitae deserunt eligendi molestias ea
            reiciendis accusamus inventore facilis.
          </ParMd>
          <ButtonRouterLink
            to={`/members`}
            color='secondary'
            linkType='no-icon-external'
          >
            See Members
          </ButtonRouterLink>
        </Card>
        <Card>
          <H2>Treasury</H2>
          <ParMd>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </ParMd>
          <ButtonRouterLink
            to={`/treasury`}
            color='secondary'
            linkType='no-icon-external'
          >
            View Treasury
          </ButtonRouterLink>
        </Card>
      </Cards>
      <H2>Lorem Ipsum</H2>
      <ParLg>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit
        amet odio varius, tincidunt quam at, bibendum erat. Quisque tristique
        sed sem sed iaculis. Etiam neque tellus, hendrerit ac ullamcorper vitae,
        vestibulum quis dolor. In scelerisque nisi id pretium dictum. Ut sed
        justo nulla. Duis faucibus arcu nec justo congue consequat. Morbi eu
        lacus sed elit luctus tempor eu vel felis. Vestibulum efficitur ligula
        non nulla feugiat, vitae ornare diam laoreet. Integer cursus erat nec
        tincidunt lacinia. Phasellus quis leo lorem. Donec eleifend lorem a enim
        tincidunt, at mollis risus congue. Proin feugiat consectetur fermentum.
        Nam laoreet dolor nec pellentesque ultricies.
      </ParLg>
    </SingleColumnLayout>
  );
};
