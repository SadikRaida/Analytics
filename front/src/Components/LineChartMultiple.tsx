import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { Money } from "@mui/icons-material";

interface CardCountProps {
    value: number;
    positive: boolean;
    sx: React.CSSProperties;
    fieldName: string;
}

export const CardCount = ({ value, positive, sx, fieldName }: CardCountProps) => {
    return (
        <Card sx={sx} style={{ backgroundColor: "#063285", color: "white", borderRadius: 20, minWidth: 300 }}>
            <CardContent>
                <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
                    <Stack spacing={1}>
                        <Typography variant="overline">{fieldName}</Typography>
                        <Typography variant="h4">{value}</Typography>
                    </Stack>
                    <Avatar sx={{ backgroundColor: positive ? 'success.main' : 'error.main', height: 56, width: 56 }}>
                        <SvgIcon>
                            <Money />
                        </SvgIcon>
                    </Avatar>
                </Stack>
            </CardContent>
        </Card>
    );
};
