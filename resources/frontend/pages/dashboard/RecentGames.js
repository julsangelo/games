import React, { useEffect, useState } from "react";
import styles from "../../assets/scss/dashboard.module";
import axiosClient from "../../ajax/axiosClient";
import { useStateContext } from "../../context/ContextProvider";

export default function () {
    let { user } = useStateContext();
    let [recentGamesData, setRecentGamesData] = useState([]);

    useEffect(() => {
        axiosClient.get("/games").then(({ data }) => {
            setRecentGamesData(data.recentGames);
        });
    }, []);

    let onClick = (key) => {
        let click = {
            user: user.username,
            key: key,
        };

        axiosClient.post("/recently-clicked", click).then(({ data }) => {
            window.open(data.url, "_blank");
        });
    };

    return (
        <div className={styles.gameGroup}>
            <h1 className={styles.gameGroupTitle}>Recent Games</h1>
            {recentGamesData.length !== 0 && (
                <div className={styles.gameCard}>
                    {recentGamesData?.map((game) => (
                        <a
                            onClick={() => onClick(game.id)}
                            key={game.id}
                            className={styles.gameLink}
                        >
                            <img
                                src={`/images/${game.image}`}
                                alt=""
                                className={styles.gameImage}
                            />
                            <h1 className={styles.gameName}>{game.name}</h1>
                            {game.rank ? (
                                <h1 className={styles.gameRank}>{game.rank}</h1>
                            ) : null}
                            {game.isNew ? (
                                <h1 className={styles.gameNew}>New!</h1>
                            ) : null}
                        </a>
                    ))}
                </div>
            )}
            {recentGamesData.length === 0 && (
                <div>
                    <h1 className={styles.noRecentGames}>No recent games.</h1>
                </div>
            )}
        </div>
    );
}
