import {Box, Button, TextField, Grid} from "@mui/material";
import AuthService from "../services/AuthService.ts";
import {useState} from "react";
import {useAuthContext} from "../providers/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

export const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [society, setSociety] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const {setUser} = useAuthContext() ;
    const navigate = useNavigate() ;

    const validateForm = () => {
        AuthService.register(email, password, url, society).then((response :any) => {
            if (response === undefined) {
                navigate('/register')
            }else {
                localStorage.setItem('user', JSON.stringify(response))
                setUser(response)
                navigate('/')
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
                <h2>Créer son compte</h2>
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
                    id="password"
                    label="Mot de passe"
                    color={'secondary'}
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        borderRadius: 20,
                        width: '100%',
                        marginBottom: 2,
                    }}
                />
                <TextField
                    type={'society'}
                    id="society"
                    color={'secondary'}
                    label="Nom de votre société"
                    variant="outlined"
                    onChange={(e) => setSociety(e.target.value)}
                    sx={{
                        borderRadius: 20,
                        width: '100%',
                        marginBottom: 2,
                    }}
                />
                <TextField
                    type={'url'}
                    id="url"
                    color={'secondary'}
                    label="Url de votre site"
                    variant="outlined"
                    onChange={(e) => setUrl(e.target.value)}
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
                    Valider
                </Button>
            </Grid>
        </Box>

    )
}