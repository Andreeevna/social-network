import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input, Radio } from "../../common/Preloader/FormsControl";
import { MaxLengthCreator, requiredField } from "../../utils/validators/validators";
import {LoginAut} from "../../redux/auth-reducer";
import { Navigate } from 'react-router-dom';
import s from "./../../common/Preloader/FormsControl.module.css";
import { AppStateType } from "../../redux/redux-store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import style from "./Login.module.css";
import logo from "./../../assets/img/logo.png";
import cn from "classnames";



type LoginFormOwnProps = {
    captchaUrl: string | null
}

let MaxLength50 = MaxLengthCreator(50);


const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnProps> & LoginFormOwnProps>  = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit} className={style.login__form}>
                <Field className={style.login__field} placeholder={"login"} name={'email'} component={Input}   validate={[requiredField, MaxLength50]}/>
                <Field className={style.login__field} placeholder={"Password"} name={'password'} component={Input}  validate={[requiredField, MaxLength50]} />
             <div className={style.from_field__container}><Field className={style.login__field_checkbox} type={"checkbox"} name={'rememberMe'} component={Radio} textTitle="remember me" validate={[requiredField]} /></div>  
            {error && 
            <div className={s.formSumError}>
                {error}
            </div>
            }

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl &&  <Field placeholder={""} name={'captcha'} component={Input}  validate={[requiredField]} />}
                <div className={style.button__container}>
                    <button className={cn("button_standart", "button_standart__login")}>login</button>
                </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType,LoginFormOwnProps>({
    form: 'login'
})(LoginForm)



type LoginFormDataType = {
    email: string,
    password: string, 
    rememberMe: boolean,
    captcha: string 
}

const Login:  React.FC = () => {

const isAuth = useSelector((state:AppStateType) => state.auth.isAuth);
const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl);
const dispatch = useDispatch();
  const onSubmit = (fromData: LoginFormDataType) => {
    //@ts-ignore
    dispatch(LoginAut(fromData.email, fromData.password, fromData.rememberMe , fromData.captcha))
  }



if(isAuth){
    return <Navigate to='/profile/19944'/>
}
    return (
        <div className={style.login__container}>
            <div className={style.login}>
            <img className={style.login__icon} src={logo} alt="Logo" />
            <h1 className={style.login__title}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
            </div>
        </div>
    )
}



export default Login;