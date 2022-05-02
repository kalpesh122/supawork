import styled from "styled-components";

interface Props {}

function AuthFooter({}: Props) {
  return (
    <AuthFooterStyles>
      <p>
        Powered by <span>Short Hop</span>
      </p>
    </AuthFooterStyles>
  );
}

const AuthFooterStyles = styled.footer`
  position: absolute;
  bottom: 33px;

  p {
    font-weight: 600;
    font-size: 16px;
    color: #959595;

    span {
      font-weight: 700;
    }
  }
`;

export default AuthFooter;
