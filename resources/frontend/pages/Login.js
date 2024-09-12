import React, { useContext } from "react";
import styles from "../assets/scss/form.module";
import flash from "../assets/scss/flashMessage.module";
import axiosClient from "../ajax/axiosClient";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStateContext } from "../context/ContextProvider";
import { useFlashMessage } from "../context/FlashMessage";

export default function Login() {
    let { setUser, setSession } = useStateContext();
    let { status, message, setFlashStatus, setFlashMessage } =
        useFlashMessage();

    let schema = yup.object().shape({
        username: yup.string().required("Username is required."),
        password: yup.string().required("Password is required."),
    });

    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    let onSubmit = (payload) => {
        axiosClient
            .post("/submit-login", payload)
            .then(({ data }) => {
                if ((data.result = true)) {
                    setUser(data.user);
                    setSession(data.id);
                }
                setFlashStatus(false);
                setFlashMessage(data.message);
            })
            .catch((err) => {
                let response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className={styles.formBackground}>
            <div className={styles.formContainerLogin}>
                {message && (
                    <div className={flash.messageContainer}>
                        <div
                            className={
                                status
                                    ? flash.successMessageBox
                                    : flash.errorMessageBox
                            }
                        >
                            {message}
                        </div>
                    </div>
                )}
                <h1 className={styles.formTitle}>Login your account.</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.form}>
                        <div className={styles.formGroupLogin}>
                            <h1 className={styles.formInputTitle}>Username</h1>
                            <input
                                className={styles.formInput}
                                type="text"
                                {...register("username")}
                            />
                            <div className={styles.formError}>
                                <p className={styles.formErrorMessage}>
                                    {errors.username?.message}
                                </p>
                            </div>
                        </div>
                        <div className={styles.formGroupLogin}>
                            <h1 className={styles.formInputTitle}>Password</h1>
                            <input
                                className={styles.formInput}
                                type="password"
                                {...register("password")}
                            />
                            <div className={styles.formError}>
                                <p className={styles.formErrorMessage}>
                                    {errors.password?.message}
                                </p>
                            </div>
                        </div>
                        <div className={styles.formGroupLogin}>
                            <button className={styles.formButton}>Login</button>
                        </div>
                        <div className={styles.formGroupLogin}>
                            <h1 className={styles.formBottom}>
                                Doesn't have an account?
                                <a className={styles.formLink} href="/register">
                                    Register here.
                                </a>
                            </h1>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
