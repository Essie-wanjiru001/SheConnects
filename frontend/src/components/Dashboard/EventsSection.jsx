import * as React from "react";
import styled from "styled-components";

const EventsSection = () => {
  return (
    <Section>
      <SectionTitle>Upcoming Events</SectionTitle>
      <CardsContainer>
        <Card>
          <CardContent backgroundColor="rgba(238, 231, 70, 1)">
            <Description>Description of the Event Details</Description>
            <EventButton backgroundColor="rgba(219, 224, 161, 1)">
              <ButtonText>Event link</ButtonText>
              <ArrowIcon
                src="https://cdn.builder.io/api/v1/image/assets/9e4be7cefad348f9b2066a9cb3315973/4e8b2830ba6837f19d80b975bc17f846dcb328b3dcccfe7db218b8ee586db9e8?placeholderIfAbsent=true"
                alt=""
              />
            </EventButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent backgroundColor="rgba(41, 191, 159, 1)">
            <Description>Description of the Event Details</Description>
            <EventButton backgroundColor="rgba(176, 242, 228, 1)">
              <ButtonText>Event link</ButtonText>
              <ArrowIcon
                src="https://cdn.builder.io/api/v1/image/assets/9e4be7cefad348f9b2066a9cb3315973/89a277b4ae4fe19af53272e4a1ab3a0ee17b54ca45f81f9e4c3a60c9670db8b2?placeholderIfAbsent=true"
                alt=""
              />
            </EventButton>
          </CardContent>
        </Card>

        <Card>
          <CardContent backgroundColor="rgba(207, 64, 45, 1)">
            <Description>Description of the Event Details</Description>
            <EventButton backgroundColor="rgba(236, 172, 164, 1)">
              <ButtonText>Event link</ButtonText>
              <ArrowIcon
                src="https://cdn.builder.io/api/v1/image/assets/9e4be7cefad348f9b2066a9cb3315973/4d4460fd99185f41ebc8bba0c241f1233fa68ebfa9647b1bc654388ccfe07507?placeholderIfAbsent=true"
                alt=""
              />
            </EventButton>
          </CardContent>
        </Card>
      </CardsContainer>
    </Section>
  );
};

const Section = styled.section`
  width: 967px;
  max-width: 100%;
  margin-top: 28px;
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 32px;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 700;
  margin-bottom: 46px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
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
  margin-top: 7px;

  @media (max-width: 991px) {
    margin-top: 40px;
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
  padding: 15px 37px 95px;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 991px) {
    padding: 15px 20px 110px;
  }
`;

const EventButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  width: 100%;
  padding: 13px 28px;
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 991px) {
    padding: 13px 20px;
  }
`;

const ButtonText = styled.span`
  font-size: 24px;
  color: rgba(0, 0, 0, 1);
`;

const ArrowIcon = styled.img`
  aspect-ratio: 1.13;
  object-fit: contain;
  object-position: center;
  width: 26px;
  margin-top: 6px;
  flex-shrink: 0;
`;

export default EventsSection;
