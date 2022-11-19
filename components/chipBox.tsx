import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';


interface ChipData {
  key: number;
  name: string;
  value: string;
}

interface ChipProps {
    chips: ChipData[];
}


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipBox(props:ChipProps):JSX.Element {
    const { chips } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chips && chips.map((data) => {

        return (
          <ListItem key={data.key}>
            <Chip
              icon={<KeyboardArrowRightIcon style={{fill:'#ff00a0'}} />}
              style={{color: 'white'}}
              label={`${data.name} | ${data.value}`}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}