import { FC } from "react";
import { DuelStatistic } from '../../interfaces';
import { useRouter } from 'next/router';
import { Paper, TableContainer, TableHead, TableRow, Table, TableCell, TableBody } from '@mui/material';

interface Props {
  statistics: DuelStatistic[]
}

export const PlayerTable: FC<Props> = ({ statistics }) => {

  const router = useRouter()

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nickname</TableCell>
          <TableCell align="right">Match Jugados</TableCell>
          <TableCell align="right">Match Ganados</TableCell>
          <TableCell align="right">Match Perdidos</TableCell>
          <TableCell align="right">Duelos Ganados</TableCell>
          <TableCell align="right">Duelos Perdidos</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {statistics.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.nickname}
            </TableCell>
            <TableCell align="right">{row.matchesPlayed}</TableCell>
            <TableCell align="right">{row.matchWins}</TableCell>
            <TableCell align="right">{row.matchLosses}</TableCell>
            <TableCell align="right">{row.wins}</TableCell>
            <TableCell align="right">{row.defeats}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    // <Table
    //   css={{
    //     height: "auto",
    //     minWidth: "100%",
    //   }}
    //   selectionMode="none"
    // >
    //   <Table.Header columns={columns}>
    //     {(column) => (
    //       <Table.Column
    //         align='start'
    //         key={column.uid}
    //         minWidth={1000}
    //       >
    //         {column.name}
    //       </Table.Column>
    //     )}
    //   </Table.Header>
    //   <Table.Body items={statistics}>
    //     {(item: DuelStatistic) => (
    //       <Table.Row>
    //         {(columnKey) => (
    //           <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
    //         )}
    //       </Table.Row>
    //     )}
    //   </Table.Body>
    // </Table>
  );
}
