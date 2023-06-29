import {Box, Button, Stack, TextField} from "@mui/material";
import AuthService from "../services/AuthService.ts";
import {useState} from "react";
import {useAuthContext} from "../providers/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

export const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const {setUser} = useAuthContext() ;
    const navigate = useNavigate() ;

    const validateForm = () => {
        // AuthService.register(email, name, url).then((response) => {
            // appeler la création de l'utilisateur
        // })
    }

    return (
        <Box
            sx={{
                background:"url(/login.png)",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Stack>
                <TextField
                    type={'name'}
                    id="name"
                    value={name}
                    color={'secondary'}
                    label="Nom de la société"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                        borderRadius: 20,
                    }}
                />
                <TextField
                    id="email"
                    label="Email"
                    value={email}
                    color={'secondary'}
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        borderRadius: 20,
                        marginBottom: 2,
                    }}
                />
                <TextField
                    type={'url'}
                    id="url"
                    value={url}
                    color={'secondary'}
                    label="Url de votre site"
                    variant="outlined"
                    onChange={(e) => setUrl(e.target.value)}
                    sx={{
                        borderRadius: 20,
                    }}
                />
                <Button variant={"outlined"} onClick={() => validateForm()} style={{
                    marginTop: 20,
                    backgroundColor: "#00BB7E",
                }}>
                    S'enregistrer
                </Button>
            </Stack>

        </Box>

    )
}