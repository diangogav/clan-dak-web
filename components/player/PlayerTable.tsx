import { Player } from "@/interfaces";
import { Col, Row, Table, Tooltip, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { playersAPI } from '../../apis';
import { EyeIcon } from "./EyeIcon";
import { IconButton } from "./IconButton";


export const PlayerTable = () => {
  const [players, setPlayers] = useState<Player[]>([])

  const getPlayers = async () => {
    const { data } = await playersAPI.get<Player[]>('/players')
    setPlayers(data.map( player => {
      return {
        ...player,
        winRate: (player.matchWins / player.matchesPlayed) || 1
      }
    }))
  } 

  useEffect(() => {
    getPlayers()
  }, [])

  const columns = [
    { name: "Nickname", uid: "name" },
    { name: "Match Jugados", uid: "matchesPlayed" },
    { name: "Match Ganados", uid: "matchWins" },
    { name: "Match Perdidos", uid: "matchLosses" },
    { name: "Victorias", uid: "wins" },
    { name: "Derrotas", uid: "defeats" },
    { name: "Win Rate", uid: "winRate" },
    { name: "Acciones", uid: "actions" }
  ];

  const renderCell = (user: Player, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Player];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user?.avatar} name={cellValue} css={{ p: 0 }}>
            {user?.nickname}
          </User>
        );

        case "actions":
          return (
            <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Details">
                  <IconButton
                    onClick={() => console.log("View user", user?.id)}
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
      <Table.Body items={players}>
        {(item: Player) => (
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
