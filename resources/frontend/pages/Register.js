import React, { useContext, useState } from "react";
import styles from "../assets/scss/form.module";
import flash from "../assets/scss/flashMessage.module";
import axiosClient from "../ajax/axiosClient";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { parse, differenceInYears } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessage";

export default function Register() {
    let navigate = useNavigate();
    let { status, message, setFlashStatus, setFlashMessage } =
        useFlashMessage();

    let schema = yup.object().shape({
        firstName: yup
            .string()
            .max(15, "First name should only be 15 characters")
            .required("First name is required."),
        lastName: yup
            .string()
            .max(10, "Last name should only be 10 characters")
            .required("Last name is required."),
        gender: yup.number().typeError("Gender is required."),
        dateOfBirth: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/, "Date is required")
            .test("ageRestriction", "Must be 12 and above.", function (value) {
                let userBirthday = parse(value, "yyyy-MM-dd", new Date());
                let age = differenceInYears(new Date(), userBirthday);
                return age >= 12;
            }),
        username: yup
            .string()
            .max(15, "Username should only be 15 characters")
            .required("Username is required."),
        password: yup
            .string()
            .required("Password is required.")
            .min(8, "Password should be 8 characters and above.")
            .max(100, "Password should only be 100 characters")
            .matches(/[0-9]/, "Password must contain a number.")
            .matches(/[a-z]/, "Password must contain a lower case.")
            .matches(/[A-Z]/, "Password must contain an upper case."),
    });

    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    let onSubmit = (payload) => {
        console.log(payload);

        axiosClient
            .post("/submit-register", payload)
            .then(({ data }) => {
                if (data.result === true) {
                    console.log("Success");
                    setFlashStatus(true);
                    setFlashMessage(
                        "Success! Account successfully registered.",
                    );
                    navigate("/login");
                } else {
                    setFlashStatus(false);
                    setFlashMessage(data.message.username);
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
        <div className={styles.formBackground}>
            <div className={styles.formContainerRegister}>
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
                <h1 className={styles.formTitle}>Register an account.</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={styles.form}>
                        <div className={styles.formGroupRegister}>
                            <h1 className={styles.formInputTitle}>
                                First name
                            </h1>
                            <input
                                id="firstName"
                                {...register("firstName", {
                                    required: "First name is required.",
                                })}
                                className={styles.formInput}
                                type="text"
                            />
                            <div className={styles.formError}>
                                {errors.firstName && (
                                    <p className={styles.formErrorMessage}>
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.formGroupRegister}>
                            <h1 className={styles.formInputTitle}>Last name</h1>
                            <input
                                {...register("lastName", {
                                    required: "Last name is required.",
                                })}
                                className={styles.formInput}
                                type="text"
                            />
                            <div className={styles.formError}>
                                {errors.lastName && (
                                    <p className={styles.formErrorMessage}>
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.formGroupRegister}>
                            <h1 className={styles.formInputTitle}>Gender</h1>
                            <select
                                className={styles.formInput}
                                {...register("gender", {
                                    required: "Gender is required.",
                                })}
                            >
                                <option selected={true} value="" disabled>
                                    Select Gender
                                </option>
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                            <div className={styles.formError}>
                                {errors.gender && (
                                    <p className={styles.formErrorMessage}>
                                        {errors.gender.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.formGroupRegister}>
                            <h1 className={styles.formInputTitle}>Birthday</h1>
                            <input
                                {...register("dateOfBirth", {
                                    required: "Birthday is required.",
                                })}
                                className={styles.formInput}
                                type="date"
                            />
                            <div className={styles.formError}>
                                {errors.dateOfBirth && (
                                    <p className={styles.formErrorMessage}>
                                        {errors.dateOfBirth.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.formGroupRegister}>
                            <h1 className={styles.formInputTitle}>Username</h1>
                            <input
                                {...register("username", {
                                    required: "username is required.",
                                })}
                                className={styles.formInput}
                                type="text"
                            />
                            <div className={styles.formError}>
                                {errors.username && (
                                    <p className={styles.formErrorMessage}>
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.formGroupRegister}>
                            <h1 className={styles.formInputTitle}>Password</h1>
                            <input
                                {...register("password", {
                                    required: "Password is required.",
                                })}
                                className={styles.formInput}
                                type="password"
                            />
                            <div className={styles.formError}>
                                {errors.password && (
                                    <p className={styles.formErrorMessage}>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.formGroupLogin}>
                            <button className={styles.formButton}>
                                Register
                            </button>
                        </div>
                        <div className={styles.formGroupLogin}>
                            <h1 className={styles.formBottom}>
                                Already have an account?
                                <a className={styles.formLink} href="/login">
                                    Login here.
                                </a>
                            </h1>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
