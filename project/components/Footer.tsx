import styled from "styled-components";
import Container from "./Container";

function Footer() {
  return (
    <FooterStyles>
      <Container>
        <ul className="links links__social">
          <li>
            <a href="" className="link">
              Instagram
            </a>
          </li>
          <li>
            <a href="" className="link">
              Twitter
            </a>
          </li>
        </ul>

        <ul className="links links__legal">
          <li>
            <a href="" className="link">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="" className="link">
              Privacy
            </a>
          </li>
        </ul>

        <p className="watermark">
          Powered by <strong>Short Hop</strong>
        </p>
      </Container>
    </FooterStyles>
  );
}

const FooterStyles = styled.footer`
  background: #f7f7f7;
  padding: 36px 0;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .links {
    font-weight: 600;
    font-size: 16px;
    color: #959595;
    display: flex;
    align-items: center;
  }

  .link:first-child {
    margin-right: 21px;
  }

  .watermark {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    color: #959595;

    strong {
      font-weight: 700;
    }
  }
`;

export default Footer;
