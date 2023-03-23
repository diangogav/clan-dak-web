import { FC } from "react";
import { Paper, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material';

interface Props {
  clanStats: { clan: string; matchCount: number; average: string, missingDuels: number,  maxPointsAvailable: number, points: number }[];
}

export const ClanTable: FC<Props> = ({ clanStats }) => {
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Clan</TableCell>
            <TableCell align="right">Matchs jugados</TableCell>
            <TableCell align="right">Puntos</TableCell>
            <TableCell align="right">Promedio</TableCell>
            <TableCell align="right">Duelos faltantes</TableCell>
            <TableCell align="right">Puntos posibles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clanStats.map((row) => (
            <TableRow
              key={row.clan}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.clan}
              </TableCell>
              <TableCell align="right">{row.matchCount}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
              <TableCell align="right">{row.average}</TableCell>
              <TableCell align="right">{row.missingDuels}</TableCell>
              <TableCell align="right">{row.maxPointsAvailable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
