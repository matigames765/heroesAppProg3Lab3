import { Button, Form } from "react-bootstrap"
import style from "./Login.module.css"
import { FormEvent, useState } from "react"
import { useform } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../hooks/redux";
import { setLogin } from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [showPass, setShowPass] = useState(false);

    
    const { values, handleChange } = useform({
        user:"",
        password:""
    })

    const { user, password } = values;

    // dispatch
    const dispatch = useAppDispatch();

    // 
    const navigate = useNavigate();
    
    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("/user.json");
        const usersData = await response.json();
        const usersFound = usersData.users.find(
            (u: {username: string; password: string})  => 
            u.username === user && u.password === password
        );
        if(usersFound){
            dispatch(setLogin(user))
            navigate("/")
        } else {
            alert("usuario o contraseña, No encontrados!!")
        }
    } 
    
    return (
        <div className={style.containerLogin}>
            <div className={style.containerForm}>
                
                <span style={{fontSize: '10vh'}} className="material-symbols-outlined">group</span>
                
                <Form onSubmit={handleSubmitForm}>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control onChange={handleChange} name="user" value={user} type="text" placeholder="Usuario" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control onChange={handleChange} name="password" value={password} type={showPass ? "text" : "password"} placeholder="Contraseña" />
                    </Form.Group>

                    <Form.Check // prettier-ignore
                        type="switch"
                        onChange={() => setShowPass(!showPass)}
                        id="custom-switch"
                        label="Mostrar contraseña"
                    />
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <Button type="submit" variant="primary">Ingresar</Button>{' '}
                    </div>
                </Form>
            </div>
        </div>
    )
}
