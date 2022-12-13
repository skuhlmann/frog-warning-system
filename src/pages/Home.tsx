import { H1, H2, Link, ParLg, SingleColumnLayout, Card } from '@daohaus/ui';
import styled from 'styled-components';
import { HausAnimated } from '../components/HausAnimated';

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

const Cards = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
`;

export const Home = () => {
  return (
    <SingleColumnLayout>
      <H1>🐸 Frog Warning System</H1>
      <ParLg>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
        praesentium iste nobis molestias maxime velit laudantium, facilis
        nesciunt minus illum sed necessitatibus laboriosam atque distinctio,
        assumenda at earum eius voluptate!
      </ParLg>
      <Cards>
        <Card>
          <H2>Treasury</H2>
        </Card>
        <Card>
          <H2>Operations</H2>
        </Card>
        <Card>
          <H2>Trading</H2>
        </Card>
      </Cards>
      <LinkBox>
        <Link href='https://github.com/HausDAO/monorepo' linkType='external'>
          Github
        </Link>
        <Link href='https://admin.daohaus.fun/' linkType='external'>
          Admin
        </Link>
        <Link href='/formtest'>Example Form</Link>
      </LinkBox>
    </SingleColumnLayout>
  );
};
