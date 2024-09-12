import React, { useEffect, useState } from "react";
import styles from "../../assets/scss/dashboard.module";
import axiosClient from "../../ajax/axiosClient";
import { useStateContext } from "../../context/ContextProvider";

export default function TopGames() {
    let { user } = useStateContext();
    let [topGamesData, setTopGamesData] = useState([]);

    useEffect(() => {
        axiosClient.get("/games").then(({ data }) => {
            setTopGamesData(data.topGames);
        });
    }, []);

    let onClick = (key) => {
        let click = {
            user: user.username,
            key: key,
        };

        axiosClient.post("/recently-clicked", click).then(({ data }) => {
            window.open(data.url, "_blank");
            window.location.reload();
        });
    };

    return (
        <div className={styles.gameGroup}>
            <h1 className={styles.gameGroupTitle}>Top Games</h1>
            <div className={styles.gameCard}>
                {topGamesData?.map((game) => (
                    <a
                        onClick={() => onClick(game.id)}
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
                        <h1 className={styles.gameNew}>New!</h1>
                    </a>
                ))}
            </div>
        </div>
    );
}
