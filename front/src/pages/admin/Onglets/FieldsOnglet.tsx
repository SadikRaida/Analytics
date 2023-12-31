import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

export const FieldsOnglet = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        // Logique de validation du formulaire ici
    };

    return (
        <div>
            <h2>Indiquez les champs que vous souhaitez ajouter</h2>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Grid
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                        width: '30%',
                    }}
                >
                    <TextField
                        id="email"
                        label="Email"
                        color={'secondary'}
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            borderRadius: 20,
                            width: '100%',
                            marginBottom: 2,
                        }}
                    />
                    <TextField
                        type={'password'}
                        id="mot_de_passe"
                        color={'secondary'}
                        label="Mot de passe"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            borderRadius: 20,
                            width: '100%',
                        }}
                    />
                    <Button
                        variant={"outlined"}
                        onClick={() => validateForm()}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            backgroundColor: "#00BB7E",
                        }}
                    >
                        Se connecter
                    </Button>
                </Grid>
            </Box>
        </div>
    );
};