import React, { useEffect, useRef, useState } from "react";
import styles from "../assets/scss/dashboard.module";
import TopGames from "../pages/dashboard/TopGames";
import AllGames from "../pages/dashboard/AllGames";
import RecentGames from "../pages/dashboard/RecentGames";
import axiosClient from "../ajax/axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function () {
    let { user, setSession } = useStateContext();
    let [searchGamesData, setSearchGameData] = useState();
    let [isSearch, setIsSearch] = useState();
    let [isOpen, setIsOpen] = useState(false);
    let [isMobile, setIsMobile] = useState(window.innerWidth < 651);
    let navigate = useNavigate();
    let gameName = useRef();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 651);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    let onSearch = (ev) => {
        let payload = {
            gameName: gameName.current.value,
        };

        axiosClient.post("/search", payload).then(({ data }) => {
            setSearchGameData(data.data);
            setIsSearch(data.result);
        });
    };

    let onSubmit = () => {
        axiosClient
            .post("/submit-logout")
            .catch((err) => {
                let response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        setSession(null);
        navigate("/login");
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardContainerHeader}>
                <form onSubmit={onSearch}>
                    <input
                        ref={gameName}
                        type="text"
                        placeholder="Search game"
                        className={styles.dashboardSearch}
                    />
                </form>
                <div className={styles.dashboardUserContainer}>
                    <h1 className={styles.dashboardUserName}>
                        {user.username}
                    </h1>
                    {isMobile ? (
                        <div >
                            <button onClick={toggleMenu} className={styles.dashboardHamburgerButton}>☰</button>
                            {isOpen && (
                                <div className={styles.dashboardHamburgerMenu}>
                                    <a
                                        href="/edit"
                                        className={styles.dashboardUserButton}
                                    >
                                        Edit
                                    </a>
                                    <form onSubmit={onSubmit}>
                                        <button
                                            className={
                                                styles.dashboardUserButton
                                            }
                                        >
                                            Logout
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.dashboardButtonContainer}>
                            <a
                                href="/edit"
                                className={styles.dashboardUserButton}
                            >
                                Edit
                            </a>
                            <form onSubmit={onSubmit}>
                                <button className={styles.dashboardUserButton}>
                                    Logout
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <hr />
            {isSearch ? (
                <div>
                    <h1 className={styles.gameGroupTitle}>Search Games</h1>
                    <div className={styles.gameCard}>
                        {searchGamesData.map((game) => (
                            <a
                                key={game.id}
                                href={game.url}
                                target="_blank"
                                className={styles.gameLink}
                            >
                                <img
                                    src={`/images/${game.image}`}
                                    alt=""
                                    className={styles.gameImage}
                                />
                                <h1 className={styles.gameName}>{game.name}</h1>
                                {game.rank ? (
                                    <h1 className={styles.gameRank}>
                                        {game.rank}
                                    </h1>
                                ) : null}
                                {game.isNew ? (
                                    <h1 className={styles.gameNew}>New!</h1>
                                ) : null}
                            </a>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <RecentGames />
                    <hr />
                    <TopGames />
                    <hr />
                    <AllGames />
                </div>
            )}
        </div>
    );
}
