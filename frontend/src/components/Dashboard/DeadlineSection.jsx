import * as React from "react";
import styled from "styled-components";

const DeadlinesSection = () => {
  return (
    <Section>
      <SectionTitle>Upcoming Deadlines</SectionTitle>
      <CardsContainer>
        <Card>
          <CardContent backgroundColor="rgba(238, 231, 70, 1)">
            <Description>
              Short description or titile of scholarship
            </Description>
            <ReadMoreButton backgroundColor="rgba(219, 224, 161, 1)">
              <ButtonText>Readmore</ButtonText>
              <ArrowIcon
                src="https://cdn.builder.io/api/v1/image/assets/9e4be7cefad348f9b2066a9cb3315973/4405c2334b73b6416e75d7c7ead3365fabc8d57ff3f326bdf3d3c0051390bbfe?placeholderIfAbsent=true"
                alt=""
              />
            </ReadMoreButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent backgroundColor="rgba(41, 191, 159, 1)">
            <Description>
              Short description or titile of scholarship
            </Description>
            <ReadMoreButton backgroundColor="rgba(176, 242, 228, 1)">
              <ButtonText>Readmore</ButtonText>
              <ArrowIcon
                src="https://cdn.builder.io/api/v1/image/assets/9e4be7cefad348f9b2066a9cb3315973/f0b252fac8cca55124a8e3b3ea1ccdff7448583694d000128932702f989c7275?placeholderIfAbsent=true"
                alt=""
              />
            </ReadMoreButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent backgroundColor="rgba(207, 64, 45, 1)">
            <Description>
              Short description or titile of scholarship
            </Description>
            <ReadMoreButton backgroundColor="rgba(236, 172, 164, 1)">
              <ButtonText>Readmore</ButtonText>
              <ArrowIcon
                src="https://cdn.builder.io/api/v1/image/assets/9e4be7cefad348f9b2066a9cb3315973/9bccfeeca4a82657f5c691a7167959560591576004799d85bb6cb78c7e1cf02a?placeholderIfAbsent=true"
                alt=""
              />
            </ReadMoreButton>
          </CardContent>
        </Card>
      </CardsContainer>
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  max-width: 1011px;
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 32px;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 700;
  margin-bottom: 41px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

const Card = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 991px) {
    margin-top: 32px;
  }
`;

const CardContent = styled.div`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  padding-top: 51px;
  font-family:
    Inter,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 24px;
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
`;

const Description = styled.p`
  color: #ffffff;
  padding: 0 34px;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 991px) {
    padding: 0 10px;
  }
`;

const ReadMoreButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  width: 100%;
  margin-top: 41px;
  padding: 24px 48px;
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 991px) {
    padding: 24px 20px;
    margin-top: 40px;
  }
`;

const ButtonText = styled.span`
  font-size: 24px;
  color: rgba(0, 0, 0, 1);
`;

const ArrowIcon = styled.img`
  aspect-ratio: 0.82;
  object-fit: contain;
  object-position: center;
  width: 28px;
  flex-shrink: 0;
`;

export default DeadlinesSection;
