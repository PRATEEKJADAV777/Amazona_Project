import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MultiTaskDisplay from '../Component/MultiTaskDisplay/MutliTaskDisplay';

export default function CARd() {
  return (
    <Card sx={{ maxWidth: 1000 }}>
        <MultiTaskDisplay/>
    </Card>
  );
}