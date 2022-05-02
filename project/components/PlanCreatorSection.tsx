import styled from "styled-components";
import useSWR from "swr";

interface Props {
  creatorId: string;
}

function PlanCreatorSection({ creatorId }: Props) {
  const { data: users } = useSWR(`/api/users/${creatorId}`);
  const { data: profiles } = useSWR(() => `/api/profiles/${users.data[0].id}`);

  if (!users || !profiles) return <p>Loading...</p>;

  return (
    <PlanCreatorSectionStyles>
      <h2 className="title">Plan creator</h2>
      <div className="information">
        <img src="/images/placeholder.png" alt="" className="image" />
        <div>
          <p className="name">
            {profiles.data[0].first_name} {profiles.data[0].last_name}
          </p>
          <p className="username">@{users.data[0].username}</p>
        </div>
        <q className="quote">
          Do something today that your future self will thank you for.
        </q>
      </div>
    </PlanCreatorSectionStyles>
  );
}

const PlanCreatorSectionStyles = styled.section`
  .title {
    font-weight: 700;
    font-size: 34px;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }

  .information {
    display: flex;
    align-items: center;
    border-top: 1px solid #dadada;
    padding-top: 32px;
  }

  .image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
    object-fit: cover;
  }

  .name {
    font-weight: 700;
    font-size: 34px;
    letter-spacing: -0.02em;
    color: #200e32;
  }

  .username {
    display: block;
    font-weight: 700;
    font-size: 24px;
    letter-spacing: -0.02em;
    background: linear-gradient(90deg, #f77062 0%, #fe5196 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .quote {
    font-weight: 700;
    font-size: 34px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #dadada;
    margin-left: auto;
    max-width: 635px;
  }
`;

export default PlanCreatorSection;
