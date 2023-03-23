import { Col, Row, Table, Tooltip, User } from '@nextui-org/react';
import { FC } from "react";
import { DuelStatistic } from '../../interfaces';
import { useRouter } from 'next/router';

interface Props {
  clanStats: { clan: string; matchCount: number; average: string }[];
}

export const ClanTable: FC<Props> = ({ clanStats }) => {

  const columns = [
    { name: "Clan", uid: "clan" },
    { name: "Cantidad de match jugados", uid: "matchCount" },
    { name: "Puntos", uid: "points" },
    { name: "Promedio", uid: "average" },
    { name: "Duelos Faltantes", uid: "missingDuels" },
    { name: "Puntos posibles", uid: "maxPointsAvailable" },
  ];

  const renderCell = (user: { clan: string; matchCount: number; average: string }, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof { clan: string; matchCount: number; average: string }];
    return cellValue;
    }
    return (
      <Table
      css={{
        height: "auto",
        minWidth: "100%",
        width: "100%"
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column 
            key={column.uid}
            allowsSorting
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={clanStats}>
        {(item: { clan: string; matchCount: number; average: string }) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
