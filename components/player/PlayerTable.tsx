import { Col, Row, Table, Tooltip, User } from '@nextui-org/react';
import { FC } from "react";
import { EyeIcon } from "./EyeIcon";
import { IconButton } from "./IconButton";
import { DuelStatistic } from '../../interfaces';
import { useRouter } from 'next/router';

interface Props {
  statistics: DuelStatistic[]
}

export const PlayerTable: FC<Props> = ({ statistics }) => {

  const router = useRouter()

  const columns = [
    { name: "Nickname", uid: "name" },
    { name: "Match Jugados", uid: "matchesPlayed" },
    { name: "Match Ganados", uid: "matchWins" },
    { name: "Match Perdidos", uid: "matchLosses" },
    { name: "Duelos Ganados", uid: "wins" },
    { name: "Duelos Perdidos", uid: "defeats" },
    { name: "Acciones", uid: "actions" }
  ];

  const renderCell = (user: DuelStatistic, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof DuelStatistic];
    switch (columnKey) {
      case "name":
        return (
          <User squared src="https://i.pinimg.com/originals/0e/72/b3/0e72b35e99486084d2170a8d7cc38394.png" name={cellValue} css={{ p: 0 }}>
            {user?.nickname}
          </User>
        );

        case "actions":
          return (
            <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Details">
                  <IconButton
                    onClick={() => {
                      router.push("/events/[eventId]/player/[playerId]", `/events/${user.eventId}/player/${user.playerId}`)  
                    }}
                  >
                    <EyeIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
            </Row>
          );

      default:
        return cellValue;
    }
  };
  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={statistics}>
        {(item: DuelStatistic) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
