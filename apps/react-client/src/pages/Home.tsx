import Typography from '@mui/material/Typography';
import { NavPill } from 'components';
import { RouteList } from 'routes/route-list';

export default function HomePage() {
  return (
    <div className="root">
      <Typography variant="h5" sx={{ mb: '20px' }}>
        Hello from the Home Page!
      </Typography>
      {RouteList.map(route => (
        <NavPill
          text={route.text}
          pathName={route.path}
          key={route.path.replace('/', '')}
        />
      ))}
    </div>
  );
}
