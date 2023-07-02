import {Box, Button, Grid, TextField} from "@mui/material";
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
        AuthService.login(email, password).then((response :any) => {
            console.log(response)
            if (response === undefined) {
                throw new Error('Erreur de connexion, vos identifiants sont incorrects')
                navigate('/login')
            }
            if (response.access_token) {
                setUser(response);
                localStorage.setItem('token', response.access_token)
                navigate('/') ;
            }
        })
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{
                width: '30%',
            }}>
                <h2>Login</h2>
                <TextField
                    id="email"
                    label="Email"
                    color={'secondary'}
                    variant="outlined"
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
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        borderRadius: 20,
                        width: '100%',
                    }}
                />
                <Button variant={"outlined"} onClick={() => validateForm()} style={{
                    marginTop: 20,
                    width: '100%',
                    backgroundColor: "#00BB7E",
                }}>
                    Se connecter
                </Button>
            </Grid>
        </Box>

    )
}