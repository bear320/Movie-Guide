<template>
    <section class="container">
        <div class="search">
            <input
                type="text"
                class="movie-search"
                placeholder="Enter movie name here..."
                ref="movie-search"
                v-model.trim="input"
                @keyup.enter="getMovie"
                @input="reset"
            />
            <button class="search-btn" ref="search-btn" @click="getMovie">Search</button>
        </div>
        <div class="result" ref="result">
            <!-- Input is empty -->
            <div v-if="this.input.length <= 0">
                <h3 class="msg">Please enter a movie name</h3>
            </div>

            <!-- Get movie data -->
            <div class="movie-data" v-else-if="this.input.length != 0 && this.isDataGet === 'get'">
                <div class="info-wrap">
                    <img :src="this.data.Poster" class="poster" alt="Poster" />
                    <div class="info">
                        <h2>{{ this.data.Title }}</h2>
                        <div class="rating">
                            <img src="@/assets/images/star-icon.svg" alt="Rating" />
                            <h4>{{ this.data.imdbRating }}</h4>
                        </div>
                        <div class="details">
                            <span>{{ this.data.Year }}</span>
                            <span>{{ this.data.Rated }}</span>
                            <span>{{ this.data.Runtime }}</span>
                        </div>
                        <div class="genre">
                            <div v-if="this.gnere1">{{ this.gnere1 }}</div>
                            <div v-if="this.gnere2">{{ this.gnere2 }}</div>
                            <div v-if="this.gnere3">{{ this.gnere3 }}</div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <h3>Plot:</h3>
                    <p>{{ this.data.Plot }}</p>
                    <h3>Cast:</h3>
                    <p>{{ this.data.Actors }}</p>
                </div>
            </div>

            <!-- Movie doesn't exist -->
            <div v-else-if="this.isDataGet === 'error'">
                <h3 class="msg">{{ this.data.Error }}</h3>
            </div>

            <!-- Other situations -->
            <div v-else>
                <h3 class="msg">Please enter a movie name</h3>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            input: "Dune",
            isDataGet: "",
            data: null,
            gnere1: "",
            gnere2: "",
            gnere3: "",
        };
    },
    methods: {
        async getMovie() {
            if (!this.input) return;

            let apiURL = `http://www.omdbapi.com/?t=${this.input}&apikey=${process.env.VUE_APP_OMDBKEY}`;

            await fetch(apiURL)
                .then((res) => res.json())
                .then((data) => {
                    if (data.Response == "True") {
                        this.data = data;
                        this.gnere1 = data.Genre.split(",")[0];
                        this.gnere2 = data.Genre.split(",")[1];
                        this.gnere3 = data.Genre.split(",")[2];
                        this.isDataGet = "get";
                    } else if (data.Response == "False") {
                        this.data = data;
                        this.isDataGet = "error";
                    }
                })
                .catch(() => {
                    this.$refs["result"].innerHTML = `<h3 class="msg">Error Occured</h3>`;
                });
        },
        reset() {
            this.isDataGet = "";
            this.data = null;
            this.gnere1 = "";
            this.gnere2 = "";
            this.gnere3 = "";
        },
    },
    created() {
        this.getMovie();
    },
};
</script>

<style lang="scss">
#app {
    position: relative;
    height: 100vh;
    background: no-repeat center url("@/assets/images/background.jpg");

    .container {
        font-size: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90vw;
        max-height: 90vh;
        max-width: 37.5rem;
        padding: 3rem 1.8rem;
        background-color: #1e293b;
        border-radius: 0.6rem;
        box-shadow: 0 0 2rem #ffffff75;

        .search {
            display: flex;
            justify-content: space-between;
            background-color: #1e293b;
            padding-bottom: 1rem;

            .movie-search,
            .search-btn {
                color: #1e293b;
                font-size: 0.9rem;
                border-radius: 0.3rem;
                outline: none;
            }

            .movie-search {
                width: 70%;
                background-color: #fff;
                border: 1px solid #a0a0a0;
                padding: 0.7rem;

                &:focus {
                    border-color: #fff;
                }
            }

            .search-btn {
                width: 25%;
                background-color: #ffb92a;
                border: none;
                cursor: pointer;
            }
        }

        .result {
            color: #fff;

            .msg {
                text-align: center;
                margin: 1rem 0 0;
            }

            .movie-data {
                max-height: 600px;
                overflow: scroll;

                &::-webkit-scrollbar {
                    display: none;
                }

                .info-wrap {
                    display: flex;
                    margin-top: 1rem;

                    .poster {
                        width: calc(100% / 3);
                    }

                    .info {
                        flex-grow: 1;

                        h2 {
                            text-align: center;
                            font-size: 1.5rem;
                            font-weight: 600;
                            letter-spacing: 0.06rem;
                        }

                        .rating {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 0.6rem;
                            margin: 0.9rem 0;

                            img {
                                width: 1.2rem;
                            }

                            h4 {
                                display: inline-block;
                                font-size: 1.1rem;
                                font-weight: 500;
                            }
                        }

                        .details {
                            display: flex;
                            justify-content: center;
                            gap: 1rem;
                            margin: 0.9rem 0 1.5rem;
                            font-size: 0.95rem;
                            font-weight: 300;
                            color: #a0a0a0;
                        }

                        .genre {
                            display: flex;
                            justify-content: center;
                            column-gap: 1rem;

                            div {
                                border: 1px solid #a0a0a0;
                                border-radius: 0.4rem;
                                padding: 0.4rem 1rem;
                                font-size: 0.75rem;
                                font-weight: 300;
                            }
                        }
                    }
                }

                .content {
                    h3 {
                        font-weight: 500;
                        margin-top: 1.2rem;
                    }

                    p {
                        font-size: 0.9rem;
                        font-weight: 300;
                        line-height: 1.8rem;
                        text-align: justify;
                        color: #a0a0a0;
                    }
                }
            }
        }
    }
}

@media all and (max-width: 600px) {
    #app {
        .container {
            font-size: 14px;

            .result {
                .movie-data {
                    .info-wrap {
                        flex-direction: column;

                        .poster {
                            display: block;
                            margin: auto;
                            width: 60%;
                        }

                        .info {
                            margin-bottom: 0.3rem;

                            .rating {
                                h4 {
                                    margin: 0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
