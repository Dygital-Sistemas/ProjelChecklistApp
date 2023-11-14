import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import React from 'react';
import { Divider, Text, Title } from 'react-native-paper';
import { HomeStackParamList } from '../../routes/stack';
import {
  Container,
  Content,
  ContentItem,
  Header,
  ItemsLabel,
  SectionTitle,
} from './styles';

import backImg from '../../assets/back.png';
import frontImg from '../../assets/front.png';
import leftImg from '../../assets/left.png';
import rightImg from '../../assets/right.png';
import topImg from '../../assets/top.png';
import { ShowBreakdowns } from '../../components/ShowBreakdowns';

export const ShowChecklist: React.FC<
  NativeStackScreenProps<HomeStackParamList, 'ShowChecklist'>
> = ({ route }) => {
  const { item, vehicle } = route.params;
  const formattedDate = format(item.date, 'dd/MM/yyyy');

  return (
    <Container>
      <Header>
        <Title style={{ fontSize: 26, marginBottom: 10 }}>
          Checklist Diário
        </Title>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
            color: 'rgba(68, 68, 68, .6)',
          }}>
          {vehicle.tag} - {formattedDate}
        </Text>
      </Header>

      <Content>
        <ContentItem>
          <Title style={{ fontSize: 16 }}>Odômetro (km)</Title>
          <Text>{item.startOdometer} km</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Nível de Combustível
          </Title>
          <Text>{item.fuelLevel}</Text>
        </ContentItem>

        <Title style={{ marginTop: 16, fontSize: 22 }}>Itens a verificar</Title>
        <ItemsLabel>
          <Text
            style={{
              color: 'rgba(68, 68, 68, .6)',
              textTransform: 'uppercase',
            }}>
            C - conforme
          </Text>
          <Text
            style={{
              color: 'rgba(68, 68, 68, .6)',
              textTransform: 'uppercase',
            }}>
            N - não conforme
          </Text>
          <Text
            style={{
              color: 'rgba(68, 68, 68, .6)',
              textTransform: 'uppercase',
            }}>
            NA - não aplicável
          </Text>
        </ItemsLabel>

        <SectionTitle>
          Itens que impedem a circulação do veículo (segurança)
        </SectionTitle>

        <Divider />

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Freios (serviços e mão)
          </Title>
          <Text>{item.brakes}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Extintor de Incêndio
          </Title>
          <Text>{item.fireExtinguisher}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Faróis e Lanternas
          </Title>
          <Text>{item.headlightFlashlight}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Cinto de Segurança
          </Title>
          <Text>{item.securityBelt}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Funcionamento do Totaly
          </Title>
          <Text>{item.totalyOperation}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Trinca no Parabrisa
          </Title>
          <Text>{item.windshieldCrack}</Text>
        </ContentItem>

        <SectionTitle>Itens de verificação geral</SectionTitle>
        <Divider />

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Prazo de Manutenção Preventiva
          </Title>
          <Text>{item.preventiveMaintenanceTerm}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>Nível de Água</Title>
          <Text>{item.waterLevel}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>Nível de Óleo</Title>
          <Text>{item.oilLevel}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Placas Fixadas - DETRAN
          </Title>
          <Text>{item.fixedPlates}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Fixação - Logomarca/Adesivos
          </Title>
          <Text>{item.logoFixation}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>Buzina</Title>
          <Text>{item.horn}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Rádio de Comunicação
          </Title>
          <Text>{item.communicationRadio}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Triângulo de Segurança, Macaco e Chave de Rodas
          </Title>
          <Text>{item.tireTools}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>Pneu Reserva</Title>
          <Text>{item.spareTire}</Text>
        </ContentItem>

        <SectionTitle>
          Itens que impedem a circulação do veículo em área de lavra
        </SectionTitle>

        <Divider />

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>Bandeirola</Title>
          <Text>{item.carFlag}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Luz de Haste da Bandeirola
          </Title>
          <Text>{item.carFlagLights}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Calços para Rodas
          </Title>
          <Text>{item.wheelChocks}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Sinaleira (Giroflex)
          </Title>
          <Text>{item.trafficLights}</Text>
        </ContentItem>

        <SectionTitle>
          Itens que impedem a circulação do veículo em área de lavra e de
          verificação geral
        </SectionTitle>

        <Divider />

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>Alarme de Ré</Title>
          <Text>{item.reverseAlarm}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Rádio de Comunicação
          </Title>
          <Text>{item.communicationRadio}</Text>
        </ContentItem>

        <SectionTitle>Verificação do Totaly</SectionTitle>
        <Divider />

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Quantidade de Estouros
          </Title>
          <Text>{item.blowouts}</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Velocidade Máxima Atingida (km/h)
          </Title>
          <Text>{item.maximumSpeed} km/h</Text>
        </ContentItem>

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>
            Houve troca de Pneu
          </Title>
          <Text>{item.tireChange ? 'Sim' : 'Não'}</Text>
        </ContentItem>

        <Title style={{ marginTop: 16, fontSize: 22 }}>Avarias</Title>
        <ItemsLabel>
          <Text
            style={{
              color: 'rgba(68, 68, 68, .6)',
              textTransform: 'uppercase',
            }}>
            A - amassado
          </Text>
          <Text
            style={{
              color: 'rgba(68, 68, 68, .6)',
              textTransform: 'uppercase',
            }}>
            R - riscado
          </Text>
          <Text
            style={{
              color: 'rgba(68, 68, 68, .6)',
              textTransform: 'uppercase',
            }}>
            T - trincado
          </Text>

          <Text
            style={{
              color: 'rgba(68, 68, 68, .6)',
              textTransform: 'uppercase',
            }}>
            X - Quebrado
          </Text>

          <Text
            style={{
              color: 'rgba(68, 68, 68, .6)',
              textTransform: 'uppercase',
            }}>
            F - Faltante
          </Text>
        </ItemsLabel>

        <ShowBreakdowns source={leftImg} selected={item.leftBreakdowns ?? []} />

        <ShowBreakdowns
          source={rightImg}
          selected={item.rightBreakdowns ?? []}
        />

        <ShowBreakdowns source={topImg} selected={item.topBreakdowns ?? []} />

        <ShowBreakdowns
          source={frontImg}
          selected={item.frontBreakdowns ?? []}
        />

        <ShowBreakdowns source={backImg} selected={item.backBreakdowns ?? []} />

        <ContentItem>
          <Title style={{ marginTop: 16, fontSize: 16 }}>Observações</Title>
          <Text>{item.comments ?? '-'}</Text>
        </ContentItem>
      </Content>
    </Container>
  );
};
