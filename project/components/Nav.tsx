import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

import Logo from "../public/vectors/Logo.svg";
import NavLink from "./NavLink";
import HomeIcon from "../public/vectors/HomeIcon.svg";
import WorkoutPlanIcon from "../public/vectors/WorkoutPlanIcon.svg";
import MealPlanIcon from "../public/vectors/MealPlanIcon.svg";
import ProgressIcon from "../public/vectors/ProgressIcon.svg";
import DashboardIcon from "../public/vectors/DashboardIcon.svg";
import UserPill from "./UserPill";
import useUser from "../libs/hooks/useUser";

function Nav() {
  const [user, userLoading] = useUser({});
  const router = useRouter();

  return (
    <NavStyles>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>

      <ul>
        {/* <li>
          <NavLink
            title="Home"
            icon={<HomeIcon />}
            href="/"
            active={router.route === "/"}
          />
        </li> */}
        <li>
          <NavLink
            title="Workout Plan"
            icon={<WorkoutPlanIcon />}
            href="/workoutplan"
            active={router.route === "/workoutplan"}
          />
        </li>
        {/* <li>
          <NavLink
            title="Meal Plan"
            icon={<MealPlanIcon />}
            href="/mealplan"
            active={router.route === "/mealplan"}
          />
        </li>
        <li>
          <NavLink
            title="Progress"
            icon={<ProgressIcon />}
            href="/progress"
            active={router.route === "/progress"}
          />
        </li> */}
        {user?.is_coach && (
          <NavLink
            title="Dashboard"
            icon={<DashboardIcon />}
            href="/dashboard"
            active={router.route === "/dashboard"}
          />
        )}
        <li>
          <UserPill href="/password" />
        </li>
      </ul>
    </NavStyles>
  );
}

const NavStyles = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;

    li {
      margin-right: 16px;
    }

    li:last-child {
      margin-left: 14px;
      margin-right: 0;
    }
  }
`;

export default Nav;
