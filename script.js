document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
       ========================================= */

    const flute = document.getElementById("fluteMusic");
    const musicButton = document.getElementById("musicButton");
    const bigMusicButton = document.getElementById("bigMusicButton");

    const storyPopup = document.getElementById("storyPopup");
    const closePopup = document.getElementById("closePopup");
    const popupTitle = document.getElementById("popupTitle");
    const popupText = document.getElementById("popupText");
    const popupListen = document.getElementById("popupListen");

    let flutePlaying = false;
    let currentStory = "";


    /* =========================================
       KRISHNA STORY CONTENT
       ========================================= */

    const stories = {

        birth: {
            title: "🪷 The Birth of Krishna",

            text:
                "According to Hindu tradition, Krishna was born in Mathura to Devaki and Vasudeva. " +
                "His birth is celebrated as Krishna Janmashtami. " +
                "His arrival represents the victory of hope, righteousness and divine wisdom over darkness."
        },


        gokul: {
            title: "🦚 Krishna in Gokul",

            text:
                "Krishna spent his childhood in Gokul, where his playful nature brought happiness to everyone around him. " +
                "He was lovingly cared for by Yashoda and Nanda. " +
                "The stories of young Krishna remind us of innocence, friendship, joy and devotion."
        },


        radha: {
            title: "💮 Krishna and Radha",

            text:
                "The relationship of Krishna and Radha is traditionally remembered as a symbol of deep devotion. " +
                "Their story represents spiritual love, faith and a connection that goes beyond ordinary attachment."
        },


        gita: {
            title: "📖 The Bhagavad Gita",

            text:
                "On the battlefield of Kurukshetra, Krishna guided Arjuna through the teachings of the Bhagavad Gita. " +
                "He taught the importance of performing one's duty, remaining balanced in success and failure, " +
                "and acting with wisdom and compassion."
        }

    };


    /* =========================================
       FLUTE MUSIC
       ========================================= */

    function updateMusicButtons() {

        if (musicButton) {

            musicButton.textContent =
                flutePlaying
                    ? "⏸️ Pause Flute"
                    : "🎵 Play Flute";

        }


        if (bigMusicButton) {

            bigMusicButton.textContent =
                flutePlaying
                    ? "⏸️ Pause Flute"
                    : "🪈 Play Krishna's Flute";

        }

    }


    function playFlute() {

        if (!flute) {

            console.error("Audio element not found.");

            return;

        }


        /*
         * Make sure the browser loads
         * the audio file.
         */

        flute.load();

        flute.volume = 0.55;


        const playPromise = flute.play();


        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    flutePlaying = true;

                    updateMusicButtons();

                    console.log("🪈 Krishna flute started.");

                })

                .catch(error => {

                    console.error(
                        "Flute playback failed:",
                        error
                    );

                    alert(
                        "The flute could not play.\n\n" +
                        "Please check:\n" +
                        "audio/flute.mp3"
                    );

                });

        }

    }


    function pauseFlute() {

        if (!flute) return;


        flute.pause();

        flutePlaying = false;

        updateMusicButtons();

    }


    function toggleFlute() {

        if (flutePlaying) {

            pauseFlute();

        } else {

            playFlute();

        }

    }


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            toggleFlute
        );

    }


    if (bigMusicButton) {

        bigMusicButton.addEventListener(
            "click",
            toggleFlute
        );

    }


    /*
     * Keep button state synchronized
     * if the audio ends or pauses.
     */

    if (flute) {

        flute.addEventListener(
            "play",
            () => {

                flutePlaying = true;

                updateMusicButtons();

            }
        );


        flute.addEventListener(
            "pause",
            () => {

                flutePlaying = false;

                updateMusicButtons();

            }
        );

    }


    /* =========================================
       ENTER VRINDAVAN BUTTON
       ========================================= */

    const enterButton =
        document.getElementById("enterVrindavan");


    if (enterButton) {

        enterButton.addEventListener(
            "click",
            () => {

                /*
                 * Start flute because this is
                 * a user interaction.
                 */

                playFlute();


                const intro =
                    document.getElementById("intro");


                if (intro) {

                    intro.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =========================================
       EXPLORE STORY BUTTON
       ========================================= */

    const exploreButton =
        document.getElementById("exploreStory");


    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            () => {

                const story =
                    document.getElementById("story");


                if (story) {

                    story.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =========================================
       TEXT-TO-SPEECH
       ========================================= */

    function stopNarration() {

        if ("speechSynthesis" in window) {

            window.speechSynthesis.cancel();

        }

    }


    function speakStory(storyKey) {

        if (!("speechSynthesis" in window)) {

            alert(
                "Your browser does not support story narration."
            );

            return;

        }


        const story = stories[storyKey];


        if (!story) return;


        /*
         * Stop previous narration.
         */

        stopNarration();


        /*
         * Create new speech.
         */

        const speech =
            new SpeechSynthesisUtterance(
                story.title + ". " + story.text
            );


        speech.lang = "en-US";

        speech.rate = 0.88;

        speech.pitch = 1.05;

        speech.volume = 1;


        window.speechSynthesis.speak(
            speech
        );

    }


    /* =========================================
       STORY CARDS
       ========================================= */

    const listenButtons =
        document.querySelectorAll(
            ".listen-button"
        );


    listenButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const storyKey =
                    button.dataset.story;


                if (!stories[storyKey]) return;


                currentStory = storyKey;


                openStoryPopup(
                    storyKey
                );

            }
        );

    });


    /* =========================================
       OPEN STORY POPUP
       ========================================= */

    function openStoryPopup(storyKey) {

        const story =
            stories[storyKey];


        if (!story || !storyPopup) return;


        popupTitle.textContent =
            story.title;


        popupText.textContent =
            story.text;


        storyPopup.classList.add(
            "active"
        );


        /*
         * Automatically play the narration
         * when the user clicks Listen.
         */

        speakStory(storyKey);

    }


    /* =========================================
       CLOSE STORY POPUP
       ========================================= */

    function closeStoryPopup() {

        if (storyPopup) {

            storyPopup.classList.remove(
                "active"
            );

        }


        stopNarration();

    }


    if (closePopup) {

        closePopup.addEventListener(
            "click",
            closeStoryPopup
        );

    }


    /* =========================================
       POPUP LISTEN BUTTON
       ========================================= */

    if (popupListen) {

        popupListen.addEventListener(
            "click",
            () => {

                if (currentStory) {

                    speakStory(
                        currentStory
                    );

                }

            }
        );

    }


    /* =========================================
       CLOSE POPUP BY CLICKING OUTSIDE
       ========================================= */

    if (storyPopup) {

        storyPopup.addEventListener(
            "click",
            event => {

                if (
                    event.target === storyPopup
                ) {

                    closeStoryPopup();

                }

            }
        );

    }


    /* =========================================
       ESC KEY CLOSES POPUP
       ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeStoryPopup();

            }

        }
    );


    /* =========================================
       FIREflies
       ========================================= */

    const fireflies =
        document.querySelector(".fireflies");


    if (fireflies) {

        for (
            let i = 0;
            i < 30;
            i++
        ) {

            const firefly =
                document.createElement("span");


            firefly.classList.add(
                "firefly"
            );


            firefly.style.left =
                Math.random() * 100 + "%";


            firefly.style.top =
                Math.random() * 100 + "%";


            firefly.style.animationDelay =
                Math.random() * 6 + "s";


            firefly.style.animationDuration =
                4 + Math.random() * 5 + "s";


            fireflies.appendChild(
                firefly
            );

        }

    }


    /* =========================================
       INITIAL STATE
       ========================================= */

    updateMusicButtons();


    console.log(
        "🦚 Krishna Janmashtami website loaded successfully."
    );

});
