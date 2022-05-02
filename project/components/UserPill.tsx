import type { AnchorHTMLAttributes } from "react";

import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";

import useUser from "../libs/hooks/useUser";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

function UserPill({ href, ...rest }: Props) {
  const [user, userLoading] = useUser({
    onboardingRequired: true,
    redirectTo: "/login",
  });
  const { data: profile, error: profileError } = useSWR(
    () => `/api/profiles/${user!.id}`
  );

  if (userLoading || !profile) return <p>Loading...</p>;

  return (
    <Link href={href} passHref>
      <UserPillStyles {...rest}>
        {profile?.data[0]?.first_name}{" "}
        <img src="/images/placeholder.png" alt="" width="46" height="46" />
      </UserPillStyles>
    </Link>
  );
}

const UserPillStyles = styled.a`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 100px;
  padding: 8px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 20px;
  color: #353535;
  font-weight: 700;

  img {
    border-radius: 50%;
    margin-left: 16px;
    object-fit: cover;
  }
`;

export default UserPill;
