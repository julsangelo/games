import React, { useContext, useState } from "react";
import styles from "../pages/Edit.module";
import flash from "../assets/scss/flashMessage.module";
import axiosClient from "../ajax/axiosClient";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFlashMessage } from "../context/FlashMessage";
import { useStateContext } from "../context/ContextProvider";

export default function Register() {
    let { status, message, setFlashStatus, setFlashMessage } =
        useFlashMessage();
    let { user } = useStateContext();
    let schema = yup.object().shape({
        firstName: yup
            .string()
            .required("First name is required")
            .max(15, "First name should only be 15 characters"),
        lastName: yup
            .string()
            .required("Last name is required")
            .max(10, "Last name should only be 10 characters"),
        username: yup
            .string()
            .required("Username is required")
            .max(15, "Username should only be 15 characters"),
    });

    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    let onSubmit = (payload) => {
        axiosClient
            .put("/submit-edit", payload)
            .then(({ data }) => {
                if (data.result === "true") {
                    setFlashStatus(true);
                    setFlashMessage("Success! Profile edited.");
                } else {
                    setFlashStatus(false);
                    setFlashMessage("Username is already taken.");
                }
            })
            .catch((err) => {
                let response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className={styles.editBackground}>
            <div className={styles.editContainer}>
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
                <h1 className={styles.editTitle}>Edit Profile</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.editInputTitle}>First Name</h1>
                    <input
                        type="text"
                        className={styles.editInput}
                        defaultValue={user.firstName}
                        {...register("firstName")}
                    />
                    {errors.firstName && (
                        <p className={styles.editErrorMessage}>
                            {errors.firstName.message}
                        </p>
                    )}
                    <h1 className={styles.editInputTitle}>Last Name</h1>
                    <input
                        type="text"
                        className={styles.editInput}
                        defaultValue={user.lastName}
                        {...register("lastName")}
                    />
                    {errors.lastName && (
                        <p className={styles.editErrorMessage}>
                            {errors.lastName.message}
                        </p>
                    )}
                    <h1 className={styles.editInputTitle}>Username</h1>
                    <input
                        type="text"
                        className={styles.editInput}
                        defaultValue={user.username}
                        {...register("username")}
                    />
                    {errors.username && (
                        <p className={styles.editErrorMessage}>
                            {errors.username.message}
                        </p>
                    )}
                    <button className={styles.editButton}>Edit Profile</button>
                    <div className={styles.editCancel}>
                        <a className={styles.editCancelButton} href="/">
                            Back
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
