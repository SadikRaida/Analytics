import {Box, Button, Stack, TextField} from "@mui/material";
import AuthService from "../services/AuthService.ts";
import {useState} from "react";
import {useAuthContext} from "../providers/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

export const Login = () => {

    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const {setUser} = useAuthContext() ;
    const navigate = useNavigate() ;

    const validateForm = () => {
        AuthService.login(email, password).then((response) => {
            setUser(response) ;
            if (response.access_token) {
                localStorage.setItem('token', response.access_token)
                navigate('/') ;
            }
        })
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
                <img width={500}  src={'/carbon-logo.png'}/>
                <TextField
                    id="email"
                    label="Email"
                    color={'secondary'}
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        borderRadius: 20,
                        marginBottom: 2,
                    }}
                />
                <TextField
                    type={'password'}
                    id="mot_de_passe"
                    color={'secondary'}
                    label="Mot de passe"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        borderRadius: 20,
                    }}
                />
                <Button variant={"outlined"} onClick={() => validateForm()} style={{
                    marginTop: 20,
                    backgroundColor: "#00BB7E",
                }}>
                    Se connecter
                </Button>
            </Stack>

        </Box>

    )
}