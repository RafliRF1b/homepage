"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const gsapInstance = window.gsap;

    if (!gsapInstance) {
        console.error(
            "Avatar Guide: GSAP tidak ditemukan. Pastikan CDN GSAP dipanggil sebelum avatar-guide.js."
        );
        return;
    }

    /* ========================================================
       KONFIGURASI DURASI
       Seluruh durasi dibuat terpisah agar mudah disesuaikan.
       ======================================================== */

    const AVATAR_TIMING = {
        introVisible: 8000,
        interactionIdleDelay: 8000,

        typingSpeed: 27,
        idleBubbleVisible: 5200,
        idleBubbleGap: 850,

        idleSequenceGap: 2200,

        // Sengaja terpisah walaupun nilai awal sama.
        idleLoopGap: 2200,

        companionBubbleVisible: 5500,
        companionTypingSpeed: 24
    };

    /* ========================================================
       DAFTAR ASSET

       Ubah path di sini apabila nama file aslimu berbeda.
       Tidak perlu mengubah logic utama.
       ======================================================== */

    const AVATAR_ASSETS = {
        sela: {
            greeting: "assets/image/avatar/sela-greeting.webp",
            happy: "assets/image/avatar/sela-happy.webp",
            confused: "assets/image/avatar/sela-confused.webp",
            sad: "assets/image/avatar/sela-sad.webp"
        },

        aras: {
            greeting: "assets/image/avatar/aras-greeting.webp",
            happy: "assets/image/avatar/aras-happy.webp",
            confused: "assets/image/avatar/aras-confused.webp",
            sad: "assets/image/avatar/aras-sad.webp"
        }
    };

    /* ========================================================
       DATA DIALOG

       Bagian inilah yang nanti paling sering direvisi.
       Logic dan data sengaja dipisahkan.
       ======================================================== */

    const AVATAR_DIALOGUES = {
        intro: {
            sela: {
                eyebrow: "HALOOO",
                title: 'Aku <span>Sela!</span>',
                text: "Aku siap mengajakmu berani melangkah.",
                pose: "greeting",
                ctaText: "Yuk Kenali Filosofiku!",
                ctaLink:
                    "https://himtika.cs.unsika.ac.id/logo-himtika/"
            },

            aras: {
                eyebrow: "HALOOO",
                title: 'Aku <span>Aras!</span>',
                text: "Aku siap menemanimu tumbuh seimbang.",
                pose: "greeting",
                ctaText: "Mari Lihat Ceritaku!",
                ctaLink:
                    "https://himtika.cs.unsika.ac.id/logo-himtika/"
            }
        },

        interactive: {
            sela: [
                {
                    pose: "happy",
                    eyebrow: "EH, KAMU KLIK AKU!",
                    text:
                        "Kalau kamu suka mencoba hal baru, sepertinya kita bakal cocok!"
                },
                {
                    pose: "greeting",
                    eyebrow: "YUK, MULAI!",
                    text:
                        "Di homepage ini kamu bisa mengenal HIMTIKA, melihat kegiatan, sampai menemukan HIMFO."
                },
                {
                    pose: "happy",
                    eyebrow: "AKU SUKA BAGIAN INI",
                    text:
                        "Kabinet Selaras tidak berhenti di rencana. Nilai Aksi mengingatkan kami untuk benar-benar bergerak."
                },
                {
                    pose: "confused",
                    eyebrow: "MASIH BINGUNG?",
                    text:
                        "Coba lanjutkan scroll. Aku dan Aras akan menunjukkan bagian menariknya satu per satu."
                },
                {
                    pose: "happy",
                    eyebrow: "ADA BANYAK KEGIATAN",
                    text:
                        "Mulai dari pelatihan, kompetisi, sampai ruang belajar bersama. Mungkin ada yang cocok untukmu."
                },
                {
                    pose: "greeting",
                    eyebrow: "SATU LAGI",
                    text:
                        "Jangan takut memulai dari hal kecil. Setiap kontribusi tetap bisa membawa perubahan."
                }
            ],

            aras: [
                {
                    pose: "happy",
                    eyebrow: "HAI, KAMU MENEMUKANKU",
                    text:
                        "Tenang, kamu tidak harus memahami semuanya sekaligus kok, kita jelajahi pelan-pelan."
                },
                {
                    pose: "greeting",
                    eyebrow: "MARI KENALI HIMTIKA",
                    text:
                        "Setiap bagian di homepage ini punya peran, mulai dari pengenalan organisasi sampai layanan mahasiswa."
                },
                {
                    pose: "happy",
                    eyebrow: "TENTANG SELARAS",
                    text:
                        "Selaras berarti setiap proses berjalan terarah, saling terhubung, dan tetap memberi ruang untuk berkembang."
                },
                {
                    pose: "confused",
                    eyebrow: "BELUM TAHU MULAI DARI MANA?",
                    text:
                        "Kamu bisa mulai dari bagian Kenali. Di sana ada sejarah, visi misi, logo, dan Grand Design."
                },
                {
                    pose: "happy",
                    eyebrow: "PROSES JUGA PENTING",
                    text:
                        "Hasil yang baik tumbuh dari langkah yang terstruktur, efisien, dan dapat diteruskan."
                },
                {
                    pose: "greeting",
                    eyebrow: "AKU AKAN MENEMANIMU",
                    text:
                        "Yuk lanjutkan menjelajah homepage ini. Nanti aku akan muncul lagi saat ada informasi yang perlu kamu perhatikan."
                }
            ]
        },

        idleSequences: [
            [
                {
                    speaker: "sela",
                    pose: "happy",
                    listenerPose: "confused",
                    text:
                        "Aras, menurutmu, kenapa kabinet ini dinamakan Selaras?"
                },
                {
                    speaker: "aras",
                    pose: "happy",
                    listenerPose: "confused",
                    text:
                        "Karena setiap bagian bergerak bersama tanpa kehilangan perannya."
                },
                {
                    speaker: "sela",
                    pose: "greeting",
                    listenerPose: "happy",
                    text:
                        "Berarti ada yang merancang, mengembangkan, dan langsung bergerak?"
                },
                {
                    speaker: "aras",
                    pose: "greeting",
                    listenerPose: "happy",
                    text:
                        "Benar!! Ketika semuanya terhubung, tujuan organisasi bisa dicapai dengan lebih terarah."
                }
            ],

            [
                {
                    speaker: "aras",
                    pose: "confused",
                    listenerPose: "greeting",
                    text:
                        "Sela, kira-kira pengunjung sebaiknya mulai dari bagian mana yaa?"
                },
                {
                    speaker: "sela",
                    pose: "happy",
                    listenerPose: "confused",
                    text:
                        "Aku pilih Kenali! Banyak cerita HIMTIKA yang bisa ditemukan di sana."
                },
                {
                    speaker: "aras",
                    pose: "happy",
                    listenerPose: "greeting",
                    text:
                        "Benar juga! setelah itu lanjut ke Events untuk melihat berbagai programnya."
                },
                {
                    speaker: "sela",
                    pose: "greeting",
                    listenerPose: "happy",
                    text:
                        "Nah, tinggal scroll sedikit lagi. Siapa tahu ada kegiatan yang bikin penasaran haha!"
                }
            ],

            [
                {
                    speaker: "sela",
                    pose: "confused",
                    listenerPose: "greeting",
                    text:
                        "Aras, apakah HIMFO cuma berisi informasi HIMTIKA?"
                },
                {
                    speaker: "aras",
                    pose: "happy",
                    listenerPose: "confused",
                    text:
                        "Tidak, Sela. Di HIMFO ada fitur yang dirancang untuk menunjang kebutuhan akademik dan nonakademik mahasiswa Informatika."
                },
                {
                    speaker: "sela",
                    pose: "happy",
                    listenerPose: "greeting",
                    text:
                        "Oh iya, aku lihat ada HiCode untuk belajar dan HiAgenda untuk membantu mengelola kegiatan!"
                },
                {
                    speaker: "aras",
                    pose: "greeting",
                    listenerPose: "happy",
                    text:
                        "Betul sekali, HIMFO ingin terus bertumbuh agar tetap relevan dengan kebutuhan mahasiswa."
                }
            ]
        ],

        companion: {
            about: {
                character: "aras",
                pose: "greeting",
                name: "Aras",
                text:
                    "Di sini kamu bisa mengenal Ketua, Wakil Ketua, serta Kabinet Selaras yang menjalankan HIMTIKA."
            },

            kenali: {
                character: "aras",
                pose: "happy",
                name: "Aras",
                text:
                    "Mau mengenal HIMTIKA lebih dalam? Pilih sejarah, visi misi, logo, atau Grand Design yang paling membuatmu penasaran."
            },

            events: {
                character: "aras",
                pose: "greeting",
                name: "Aras",
                text:
                    "Berbagai nilai organisasi diwujudkan melalui kegiatan nyata. Geser kartunya dan lihat perjalanan HIMTIKA."
            },

            himfo: {
                character: "sela",
                pose: "happy",
                name: "Sela",
                text:
                    "Sekarang kita masuk ke HIMFO! Satu platform yang menyatukan informasi HIMTIKA dan fitur-fitur yang menarik."
            },

            faq: {
                character: "sela",
                pose: "greeting",
                name: "Sela",
                text:
                    "Masih ada yang bikin penasaran? Buka pertanyaannya, atau kirim pesan lewat tombol 'Hubungi Kami!'. Kamu juga bisa kunjungi media sosial HIMTIKA di bagian paling bawah."
            }
        }
    };

    /* ========================================================
       MAPPING SECTION → COMPANION

       HIMFO dan Fitur HIMFO memakai messageKey yang sama.
       Artinya bubble tidak berubah ketika berpindah di antara
       kedua section tersebut.
       ======================================================== */

    const COMPANION_SECTION_MAP = {
        "about-section": {
            character: "aras",
            messageKey: "about"
        },

        "kenali-section": {
            character: "aras",
            messageKey: "kenali"
        },

        "events-section": {
            character: "aras",
            messageKey: "events"
        },

        "himfo-section": {
            character: "sela",
            messageKey: "himfo"
        },

        "fitur-himfo-section": {
            character: "sela",
            messageKey: "himfo"
        },

        "faq-section": {
            character: "sela",
            messageKey: "faq"
        }
    };

    /* ========================================================
       DOM
       ======================================================== */

    const avatarSection = document.getElementById(
        "avatar-guide-section"
    );

    if (!avatarSection) {
        console.warn(
            "Avatar Guide: #avatar-guide-section tidak ditemukan."
        );
        return;
    }

    const characters = {
        sela: {
            wrapper: document.getElementById("avatarCharacterSela"),
            image: document.getElementById("avatarImageSela"),
            bubble: document.getElementById("avatarBubbleSela"),
            text: document.getElementById("avatarBubbleTextSela"),
            cta: document.getElementById("avatarBubbleCtaSela"),
            progress: document.getElementById("avatarBubbleProgressSela")
        },

        aras: {
            wrapper: document.getElementById("avatarCharacterAras"),
            image: document.getElementById("avatarImageAras"),
            bubble: document.getElementById("avatarBubbleAras"),
            text: document.getElementById("avatarBubbleTextAras"),
            cta: document.getElementById("avatarBubbleCtaAras"),
            progress: document.getElementById("avatarBubbleProgressAras")
        }
    };

    const companion = {
        root: document.getElementById("avatarCompanion"),
        image: document.getElementById("avatarCompanionImage"),
        characterButton: document.getElementById(
            "avatarCompanionCharacter"
        ),
        bubble: document.getElementById("avatarCompanionBubble"),
        name: document.getElementById("avatarCompanionName"),
        text: document.getElementById("avatarCompanionText"),
        notification: document.getElementById(
            "avatarCompanionNotification"
        ),
        close: document.getElementById("avatarCompanionClose")
    };

    /* ========================================================
       STATE
       ======================================================== */

    const AVATAR_STATES = Object.freeze({
        INTRO: "INTRO",
        INTERACTIVE_SELA: "INTERACTIVE_SELA",
        INTERACTIVE_ARAS: "INTERACTIVE_ARAS",
        IDLE_CONVERSATION: "IDLE_CONVERSATION",
        LEAVING_SECTION: "LEAVING_SECTION",
        COMPANION_MODE: "COMPANION_MODE"
    });

    let currentState = AVATAR_STATES.LEAVING_SECTION;
    let activeCharacter = null;

    let interactiveIndexes = {
        sela: 0,
        aras: 0
    };

    let currentIdleSequenceIndex = 0;
    let currentIdleBubbleIndex = 0;

    let isAvatarSectionVisible = false;
    let isTyping = false;

    // Secara konsep merupakan USER_READING.
    let userReading = false;

    let typingToken = 0;
    let introTimer = null;
    let interactionTimer = null;
    let idleTimer = null;
    let companionTimer = null;

    let currentCompanionSection = null;
    let currentCompanionCharacter = null;
    let currentCompanionMessageKey = null;

    let companionHiddenByUser = false;
    let companionBubbleOpen = false;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ========================================================
       TIMER HELPERS
       ======================================================== */

    function clearTimer(timerName) {
        if (timerName) {
            window.clearTimeout(timerName);
        }

        return null;
    }

    function clearAvatarTimers() {
        introTimer = clearTimer(introTimer);
        interactionTimer = clearTimer(interactionTimer);
        idleTimer = clearTimer(idleTimer);
    }

    function clearCompanionTimer() {
        companionTimer = clearTimer(companionTimer);
    }

    function cancelTyping() {
        typingToken += 1;
        isTyping = false;
        userReading = false;

        characters.sela.bubble.classList.remove("is-typing");
        characters.aras.bubble.classList.remove("is-typing");

        if (companion.root) {
            companion.root.classList.remove("is-typing");
        }
    }

    /* ========================================================
       ANIMATION HELPERS
       ======================================================== */

    function showElement(element, options = {}) {
        if (!element) return;

        const {
            y = 18,
            x = 0,
            duration = 0.45,
            scale = 0.98
        } = options;

        gsapInstance.killTweensOf(element);

        if (reducedMotion) {
            gsapInstance.set(element, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1
            });
            return;
        }

        gsapInstance.fromTo(
            element,
            {
                autoAlpha: 0,
                x,
                y,
                scale
            },
            {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration,
                ease: "power3.out",
                overwrite: true
            }
        );
    }

    function hideElement(element, options = {}) {
        if (!element) return Promise.resolve();

        const {
            y = 12,
            x = 0,
            duration = 0.3
        } = options;

        gsapInstance.killTweensOf(element);

        if (reducedMotion) {
            gsapInstance.set(element, {
                autoAlpha: 0
            });
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            gsapInstance.to(element, {
                autoAlpha: 0,
                x,
                y,
                duration,
                ease: "power2.in",
                overwrite: true,
                onComplete: resolve
            });
        });
    }

    /* ========================================================
       POSE
       ======================================================== */

    function setPose(characterName, poseName) {
        const character = characters[characterName];
        const source =
            AVATAR_ASSETS[characterName]?.[poseName] ??
            AVATAR_ASSETS[characterName].greeting;

        if (!character?.image || character.image.src.endsWith(source)) {
            return;
        }

        const oldImage = character.image;

        gsapInstance.killTweensOf(oldImage);

        if (reducedMotion) {
            oldImage.src = source;
            return;
        }

        gsapInstance.to(oldImage, {
            autoAlpha: 0,
            y: 8,
            scale: 0.97,
            duration: 0.16,
            ease: "power2.in",
            onComplete: () => {
                oldImage.src = source;

                gsapInstance.fromTo(
                    oldImage,
                    {
                        autoAlpha: 0,
                        y: 8,
                        scale: 0.97
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.26,
                        ease: "back.out(1.5)"
                    }
                );
            }
        });
    }

    function resetCharacterPoses() {
        setPose("sela", "greeting");
        setPose("aras", "greeting");
    }

    /* ========================================================
       BUBBLE CONTENT
       ======================================================== */

    function setBubbleStaticContent(characterName, dialogue) {
        const character = characters[characterName];

        const eyebrow = character.bubble.querySelector(
            ".avatar-bubble__eyebrow"
        );

        const title = character.bubble.querySelector(
            ".avatar-bubble__title"
        );

        hideDialogueProgress(characterName);

        eyebrow.textContent = dialogue.eyebrow ?? "";
        title.hidden = !dialogue.title;
        title.innerHTML = dialogue.title ?? "";

        character.text.textContent = dialogue.text ?? "";

        if (dialogue.ctaText && dialogue.ctaLink) {
            character.cta.innerHTML =
                `${dialogue.ctaText} <svg xmlns="http://www.w3.org/2000/svg" width="1.78em" height="1em" viewBox="0 0 16 9"><title xmlns="">arrowright</title><path fill="currentColor" d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"/><path fill="currentColor" d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"/></svg>`;

            character.cta.href = dialogue.ctaLink;
            character.cta.hidden = false;
        } else {
            character.cta.hidden = true;
        }
    }

    function formatDialogueProgress(currentIndex, total) {
        return `${currentIndex + 1}/${total}`;
    }

    function showInteractiveProgress(
        characterName,
        currentIndex,
        total
    ) {
        const progress = characters[characterName].progress;

        if (!progress) return;

        progress.textContent = formatDialogueProgress(
            currentIndex,
            total
        );

        progress.hidden = false;
    }

    function hideDialogueProgress(characterName) {
        const progress = characters[characterName].progress;

        if (!progress) return;

        progress.hidden = true;
    }

    async function typeText({
        target,
        text,
        speed,
        typingClassElement
    }) {
        cancelTyping();

        const localToken = typingToken;

        target.textContent = "";
        isTyping = true;
        userReading = true;

        typingClassElement?.classList.add("is-typing");

        if (reducedMotion) {
            target.textContent = text;
            isTyping = false;
            userReading = false;
            typingClassElement?.classList.remove("is-typing");
            return;
        }

        for (let index = 0; index < text.length; index += 1) {
            if (localToken !== typingToken) {
                return;
            }

            target.textContent += text[index];

            await new Promise((resolve) => {
                window.setTimeout(resolve, speed);
            });
        }

        if (localToken === typingToken) {
            isTyping = false;
            userReading = false;
            typingClassElement?.classList.remove("is-typing");
        }
    }

    function completeTyping(target, fullText, typingClassElement) {
        cancelTyping();
        target.textContent = fullText;
        typingClassElement?.classList.remove("is-typing");
    }

    /* ========================================================
       INTRO
       ======================================================== */

    function enterIntroState() {
        clearAvatarTimers();
        cancelTyping();

        currentState = AVATAR_STATES.INTRO;
        activeCharacter = null;

        currentIdleSequenceIndex = 0;
        currentIdleBubbleIndex = 0;

        resetCharacterPoses();

        setBubbleStaticContent(
            "sela",
            AVATAR_DIALOGUES.intro.sela
        );

        setBubbleStaticContent(
            "aras",
            AVATAR_DIALOGUES.intro.aras
        );

        gsapInstance.set(
            [
                characters.sela.bubble,
                characters.aras.bubble
            ],
            {
                autoAlpha: 0,
                y: 24,
                scale: 0.96
            }
        );

        showElement(characters.sela.bubble, {
            y: 24,
            duration: 0.55
        });

        showElement(characters.aras.bubble, {
            y: 24,
            duration: 0.55
        });

        introTimer = window.setTimeout(() => {
            if (
                isAvatarSectionVisible &&
                currentState === AVATAR_STATES.INTRO
            ) {
                startIdleConversation();
            }
        }, AVATAR_TIMING.introVisible);
    }

    /* ========================================================
       INTERACTIVE
       ======================================================== */

    function scheduleInteractionIdle() {
        interactionTimer = clearTimer(interactionTimer);

        interactionTimer = window.setTimeout(() => {
            if (
                isAvatarSectionVisible &&
                (
                    currentState ===
                        AVATAR_STATES.INTERACTIVE_SELA ||
                    currentState ===
                        AVATAR_STATES.INTERACTIVE_ARAS
                )
            ) {
                startIdleConversation();
            }
        }, AVATAR_TIMING.interactionIdleDelay);
    }

    async function showInteractiveDialogue(characterName) {
        clearAvatarTimers();
        cancelTyping();

        activeCharacter = characterName;

        currentState =
            characterName === "sela"
                ? AVATAR_STATES.INTERACTIVE_SELA
                : AVATAR_STATES.INTERACTIVE_ARAS;

        const listenerName = characterName === "sela" ? "aras" : "sela";
        const dialogues = AVATAR_DIALOGUES.interactive[characterName];
        const currentIndex = interactiveIndexes[characterName] % dialogues.length;
        const dialogue = dialogues[currentIndex];

        showInteractiveProgress(
            characterName,
            currentIndex,
            dialogues.length
        );
        hideDialogueProgress(listenerName);

        setPose(characterName, dialogue.pose);
        setPose(listenerName, "confused");

        await hideElement(
            characters[listenerName].bubble,
            {
                x: listenerName === "sela" ? -10 : 10
            }
        );

        const activeBubble = characters[characterName].bubble;
        const activeText = characters[characterName].text;

        const eyebrow = activeBubble.querySelector(
            ".avatar-bubble__eyebrow"
        );

        const title = activeBubble.querySelector(
            ".avatar-bubble__title"
        );

        eyebrow.textContent = dialogue.eyebrow;
        title.hidden = true;
        title.innerHTML = "";

        characters[characterName].cta.hidden = true;

        showElement(activeBubble, {
            x: characterName === "sela" ? -12 : 12,
            y: 12
        });

        activeBubble.dataset.fullText = dialogue.text;

        await typeText({
            target: activeText,
            text: dialogue.text,
            speed: AVATAR_TIMING.typingSpeed,
            typingClassElement: activeBubble
        });

        scheduleInteractionIdle();
    }

    function advanceInteractiveDialogue(characterName) {
        const character = characters[characterName];
        const fullText = character.bubble.dataset.fullText ?? "";

        if (
            isTyping &&
            activeCharacter === characterName &&
            userReading
        ) {
            completeTyping(
                character.text,
                fullText,
                character.bubble
            );

            scheduleInteractionIdle();
            return;
        }

        interactiveIndexes[characterName] =
            (
                interactiveIndexes[characterName] + 1
            ) %
            AVATAR_DIALOGUES.interactive[characterName].length;

        showInteractiveDialogue(characterName);
    }

    function handleCharacterInteraction(characterName) {
        if (!isAvatarSectionVisible) return;

        if (activeCharacter !== characterName) {
            showInteractiveDialogue(characterName);
            return;
        }

        advanceInteractiveDialogue(characterName);
    }

    /* ========================================================
       IDLE CONVERSATION
       ======================================================== */

    async function startIdleConversation() {
        clearAvatarTimers();
        cancelTyping();

        currentState = AVATAR_STATES.IDLE_CONVERSATION;
        activeCharacter = null;

        hideDialogueProgress("sela");
        hideDialogueProgress("aras");

        currentIdleBubbleIndex = 0;

        await runCurrentIdleBubble();
    }

    async function runCurrentIdleBubble() {
        if (
            !isAvatarSectionVisible ||
            currentState !==
                AVATAR_STATES.IDLE_CONVERSATION
        ) {
            return;
        }

        const sequence =
            AVATAR_DIALOGUES.idleSequences[
                currentIdleSequenceIndex
            ];

        const dialogue =
            sequence[currentIdleBubbleIndex];

        const speaker = dialogue.speaker;
        const listener =
            speaker === "sela" ? "aras" : "sela";

        setPose(speaker, dialogue.pose);
        setPose(
            listener,
            dialogue.listenerPose ?? "confused"
        );

        await hideElement(
            characters[listener].bubble,
            {
                x: listener === "sela" ? -10 : 10
            }
        );

        if (
            !isAvatarSectionVisible ||
            currentState !==
                AVATAR_STATES.IDLE_CONVERSATION
        ) {
            return;
        }

        const speakerBubble = characters[speaker].bubble;
        const speakerText = characters[speaker].text;

        const eyebrow = speakerBubble.querySelector(
            ".avatar-bubble__eyebrow"
        );

        const title = speakerBubble.querySelector(
            ".avatar-bubble__title"
        );

        eyebrow.textContent =
            speaker === "sela"
                ? "SELA BERBICARA"
                : "ARAS BERBICARA";

        title.hidden = true;
        title.innerHTML = "";

        characters[speaker].cta.hidden = true;

        speakerBubble.dataset.fullText = dialogue.text;

        showElement(speakerBubble, {
            x: speaker === "sela" ? -12 : 12,
            y: 12
        });

        await typeText({
            target: speakerText,
            text: dialogue.text,
            speed: AVATAR_TIMING.typingSpeed,
            typingClassElement: speakerBubble
        });

        if (
            !isAvatarSectionVisible ||
            currentState !==
                AVATAR_STATES.IDLE_CONVERSATION
        ) {
            return;
        }

        idleTimer = window.setTimeout(
            advanceIdleConversation,
            AVATAR_TIMING.idleBubbleVisible
        );
    }

    async function advanceIdleConversation() {
        if (
            !isAvatarSectionVisible ||
            currentState !==
                AVATAR_STATES.IDLE_CONVERSATION
        ) {
            return;
        }

        const sequence =
            AVATAR_DIALOGUES.idleSequences[
                currentIdleSequenceIndex
            ];

        const currentDialogue =
            sequence[currentIdleBubbleIndex];

        await hideElement(
            characters[currentDialogue.speaker].bubble
        );

        currentIdleBubbleIndex += 1;

        if (currentIdleBubbleIndex < sequence.length) {
            idleTimer = window.setTimeout(
                runCurrentIdleBubble,
                AVATAR_TIMING.idleBubbleGap
            );
            return;
        }

        currentIdleBubbleIndex = 0;

        const isLastSequence =
            currentIdleSequenceIndex ===
            AVATAR_DIALOGUES.idleSequences.length - 1;

        if (isLastSequence) {
            currentIdleSequenceIndex = 0;

            idleTimer = window.setTimeout(
                runCurrentIdleBubble,
                AVATAR_TIMING.idleLoopGap
            );
        } else {
            currentIdleSequenceIndex += 1;

            idleTimer = window.setTimeout(
                runCurrentIdleBubble,
                AVATAR_TIMING.idleSequenceGap
            );
        }
    }

    /* ========================================================
       LEAVING AVATAR SECTION
       ======================================================== */

    function leaveAvatarSection() {
        clearAvatarTimers();
        cancelTyping();

        currentState = AVATAR_STATES.LEAVING_SECTION;
        activeCharacter = null;

        hideDialogueProgress("sela");
        hideDialogueProgress("aras");

        hideElement(characters.sela.bubble);
        hideElement(characters.aras.bubble);

        resetCharacterPoses();
    }
    /* ========================================================
    AVATAR SECTION OBSERVER

    Tugasnya:
    1. Memulai INTRO ketika Avatar Section terlihat 32%.
    2. Tidak menghentikan avatar ketika scroll ke bawah.
        Section berikutnya yang akan mengambil alih.
    3. Menghentikan avatar ketika user kembali ke Hero.
    ======================================================== */

    const AVATAR_SECTION_ENTER_RATIO = 0.32;

    const avatarSectionObserver = new IntersectionObserver(
        ([entry]) => {
            /*
            * MASUK AVATAR SECTION
            *
            * Guard !isAvatarSectionVisible mencegah INTRO
            * dijalankan ulang ketika user hanya scroll sedikit.
            */
            if (
                entry.isIntersecting &&
                entry.intersectionRatio >= AVATAR_SECTION_ENTER_RATIO &&
                !isAvatarSectionVisible
            ) {
                isAvatarSectionVisible = true;

                hideCompanion(true);
                enterIntroState();

                return;
            }

            /*
            * Selama section masih terlihat, jangan mengubah apa pun.
            * Typewriter, timer, dan state sekarang tetap berjalan.
            */
            if (entry.isIntersecting) {
                return;
            }

            /*
            * Jika Avatar Section tidak terlihat dan posisinya berada
            * DI BAWAH viewport, artinya user kembali naik ke Hero.
            *
            * Pada kondisi ini avatar boleh dihentikan.
            */
            const hasReturnedToHero =
                !entry.isIntersecting &&
                entry.boundingClientRect.top >= 0;

            if (
                hasReturnedToHero &&
                isAvatarSectionVisible
            ) {
                isAvatarSectionVisible = false;

                leaveAvatarSection();
                hideCompanion(true);
            }

            /*
            * Kalau section tidak terlihat karena sudah lewat ke atas
            * saat scroll turun, jangan lakukan apa pun di sini.
            *
            * Companion observer yang akan mengambil alih.
            */
        },
        {
            threshold: [
                0,
                AVATAR_SECTION_ENTER_RATIO
            ]
        }
    );

    avatarSectionObserver.observe(avatarSection);

    /* ========================================================
       COMPANION
       ======================================================== */

    function getCompanionImage(characterName, poseName) {
        return (
            AVATAR_ASSETS[characterName]?.[poseName] ??
            AVATAR_ASSETS[characterName].greeting
        );
    }

    function showCompanionRoot() {
        if (!companion.root || companionHiddenByUser) return;

        companion.root.setAttribute("aria-hidden", "false");
        companion.root.classList.add("is-visible");

        gsapInstance.killTweensOf(companion.root);

        gsapInstance.to(companion.root, {
            autoAlpha: 1,
            y: 0,
            duration: reducedMotion ? 0 : 0.4,
            ease: "back.out(1.5)",
            overwrite: true
        });
    }

    function hideCompanion(immediate = false) {
        if (!companion.root) return;

        clearCompanionTimer();
        // cancelTyping();
        companion.root.classList.remove("is-typing");

        companionBubbleOpen = false;

        gsapInstance.killTweensOf(
            [
                companion.root,
                companion.bubble
            ]
        );

        gsapInstance.set(companion.bubble, {
            autoAlpha: 0
        });

        gsapInstance.to(companion.root, {
            autoAlpha: 0,
            y: 16,
            duration:
                immediate || reducedMotion
                    ? 0
                    : 0.28,
            ease: "power2.in",
            onComplete: () => {
                companion.root.classList.remove("is-visible");
                companion.root.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }
        });
    }

    async function showCompanionBubble(messageData) {
        if (
            !companion.root ||
            companionHiddenByUser ||
            isAvatarSectionVisible
        ) {
            return;
        }

        clearCompanionTimer();
        cancelTyping();

        companionBubbleOpen = true;

        companion.name.textContent = messageData.name;
        companion.text.textContent = "";

        companion.image.alt =
            `${messageData.name}, pemandu HIMTIKA`;

        showElement(companion.bubble, {
            y: 12,
            x: -8,
            duration: 0.38
        });

        await typeText({
            target: companion.text,
            text: messageData.text,
            speed: AVATAR_TIMING.companionTypingSpeed,
            typingClassElement: companion.root
        });

        companionTimer = window.setTimeout(() => {
            closeCompanionBubble(true);
        }, AVATAR_TIMING.companionBubbleVisible);
    }

    function closeCompanionBubble(showNotification = false) {
        if (!companion.bubble) return;

        clearCompanionTimer();
        companionBubbleOpen = false;

        hideElement(companion.bubble, {
            y: 8,
            x: -5
        });

        if (showNotification) {
            gsapInstance.fromTo(
                companion.notification,
                {
                    autoAlpha: 0,
                    scale: 0.5
                },
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(2)"
                }
            );
        }
    }

    function switchCompanionCharacter(
        characterName,
        poseName
    ) {
        if (!companion.image) return;

        const source = getCompanionImage(
            characterName,
            poseName
        );

        const characterChanged =
            currentCompanionCharacter !== characterName;

        currentCompanionCharacter = characterName;

        if (!characterChanged) {
            companion.image.src = source;
            return;
        }

        gsapInstance.killTweensOf(
            companion.characterButton
        );

        if (reducedMotion) {
            companion.image.src = source;
            return;
        }

        gsapInstance.to(companion.characterButton, {
            autoAlpha: 0,
            x: -22,
            scale: 0.9,
            duration: 0.22,
            ease: "power2.in",
            onComplete: () => {
                companion.image.src = source;

                gsapInstance.fromTo(
                    companion.characterButton,
                    {
                        autoAlpha: 0,
                        x: -22,
                        scale: 0.9
                    },
                    {
                        autoAlpha: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "back.out(1.6)"
                    }
                );
            }
        });
    }

    function activateCompanionSection(sectionId) {
        const map = COMPANION_SECTION_MAP[sectionId];

        
        if (
            !map ||
            companionHiddenByUser
        ) {
            return;
        }

        const messageData =
            AVATAR_DIALOGUES.companion[map.messageKey];

        if (!messageData) return;

        currentState = AVATAR_STATES.COMPANION_MODE;
        currentCompanionSection = sectionId;

        showCompanionRoot();

        switchCompanionCharacter(
            map.character,
            messageData.pose
        );

        /*
         * HIMFO dan Fitur HIMFO memiliki messageKey sama.
         * Karena itu bubble tidak dibuka ulang ketika berpindah
         * di antara kedua section tersebut.
         */
        if (
            currentCompanionMessageKey === map.messageKey
        ) {
            return;
        }

        currentCompanionMessageKey = map.messageKey;

        gsapInstance.set(companion.notification, {
            autoAlpha: 0
        });

        showCompanionBubble(messageData);
    }

    // function evaluateCompanionVisibility() {
    //     const avatarRect =
    //         avatarSection.getBoundingClientRect();

    //     /*
    //      * Companion hanya aktif apabila user sudah berada
    //      * di bawah Avatar Section, bukan ketika scroll ke Hero.
    //      */
    //     const hasPassedAvatarSection =
    //         avatarRect.bottom <=
    //         window.innerHeight * 0.4;

    //     if (!hasPassedAvatarSection) {
    //         hideCompanion();
    //     }
    // }

    /* ========================================================
       COMPANION SECTION OBSERVER
       ======================================================== */

    const companionSections = Object.keys(
        COMPANION_SECTION_MAP
    )
        .map((sectionId) =>
            document.getElementById(sectionId)
        )
        .filter(Boolean);

    const visibleSectionRatios = new Map();

    const companionSectionObserver =
        // new IntersectionObserver(
        //     (entries) => {
        //         entries.forEach((entry) => {
        //             visibleSectionRatios.set(
        //                 entry.target.id,
        //                 entry.isIntersecting
        //                     ? entry.intersectionRatio
        //                     : 0
        //             );
        //         });

        //         if (
        //             isAvatarSectionVisible ||
        //             companionHiddenByUser
        //         ) {
        //             return;
        //         }

        //         const activeEntry =
        //             [...visibleSectionRatios.entries()]
        //                 .filter(([, ratio]) => ratio > 0)
        //                 .sort(
        //                     (first, second) =>
        //                         second[1] - first[1]
        //                 )[0];

        //         if (!activeEntry) {
        //             return;
        //         }

        //         activateCompanionSection(activeEntry[0]);
        //     },
        //     {
        //         rootMargin: "-18% 0px -42% 0px",
        //         threshold: [
        //             0.08,
        //             0.18,
        //             0.28,
        //             0.4,
        //             0.55,
        //             0.7
        //         ]
        //     }
        // );

        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibleSectionRatios.set(
                        entry.target.id,
                        entry.isIntersecting
                            ? entry.intersectionRatio
                            : 0
                    );
                });

                if (companionHiddenByUser) {
                    return;
                }

                /*
                * Cari section companion yang saat ini paling dominan
                * terlihat di area observer.
                */
                const activeEntry =
                    [...visibleSectionRatios.entries()]
                        .filter(([, ratio]) => ratio > 0)
                        .sort(
                            (first, second) =>
                                second[1] - first[1]
                        )[0];

                if (!activeEntry) {
                    return;
                }

                const activeSectionId = activeEntry[0];

                /*
                * Section Kahim–Wahim atau section companion lainnya
                * sekarang mengambil alih lifecycle Avatar Section.
                */
                if (isAvatarSectionVisible) {
                    isAvatarSectionVisible = false;
                    leaveAvatarSection();
                }

                activateCompanionSection(activeSectionId);
            },
            {
                /*
                * Area deteksi dibuat cukup luas agar Kahim–Wahim
                * langsung aktif, bukan menunggu sampai Events.
                */
                rootMargin: "-8% 0px -48% 0px",
                threshold: [
                    0.05,
                    0.15,
                    0.3,
                    0.5
                ]
            }
        );

    companionSections.forEach((section) => {
        companionSectionObserver.observe(section);
    });

    /* ========================================================
       EVENT LISTENERS — AVATAR SECTION
       ======================================================== */

    Object.entries(characters).forEach(
        ([characterName, character]) => {
            character.wrapper.addEventListener(
                "click",
                (event) => {
                    /*
                     * Jangan mengubah dialog apabila pengguna
                     * sedang menekan CTA menuju halaman Logo.
                     */
                    if (
                        event.target.closest(
                            ".avatar-bubble__cta"
                        )
                    ) {
                        return;
                    }

                    handleCharacterInteraction(
                        characterName
                    );
                }
            );

            character.wrapper.addEventListener(
                "keydown",
                (event) => {
                    if (
                        event.key !== "Enter" &&
                        event.key !== " "
                    ) {
                        return;
                    }

                    event.preventDefault();
                    handleCharacterInteraction(
                        characterName
                    );
                }
            );
        }
    );

    /* ========================================================
       EVENT LISTENERS — COMPANION
       ======================================================== */

    companion.characterButton?.addEventListener(
        "click",
        () => {
            if (!currentCompanionMessageKey) return;

            gsapInstance.set(companion.notification, {
                autoAlpha: 0
            });

            if (companionBubbleOpen) {
                closeCompanionBubble();
                return;
            }

            const messageData =
                AVATAR_DIALOGUES.companion[
                    currentCompanionMessageKey
                ];

            showCompanionBubble(messageData);
        }
    );

    companion.bubble?.addEventListener(
        "click",
        () => {
            if (isTyping && currentCompanionMessageKey) {
                const messageData =
                    AVATAR_DIALOGUES.companion[
                        currentCompanionMessageKey
                    ];

                completeTyping(
                    companion.text,
                    messageData.text,
                    companion.root
                );

                clearCompanionTimer();

                companionTimer = window.setTimeout(
                    () => closeCompanionBubble(true),
                    AVATAR_TIMING.companionBubbleVisible
                );

                return;
            }

            closeCompanionBubble();
        }
    );

    companion.close?.addEventListener(
        "click",
        () => {
            companionHiddenByUser = true;
            hideCompanion();
        }
    );

    /* ========================================================
       PAGE VISIBILITY

       Menghentikan timer ketika tab browser tidak aktif.
       ======================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                clearAvatarTimers();
                clearCompanionTimer();
                cancelTyping();
                return;
            }

            if (isAvatarSectionVisible) {
                enterIntroState();
            }
        }
    );

    // window.addEventListener(
    //     "scroll",
    //     evaluateCompanionVisibility,
    //     {
    //         passive: true
    //     }
    // );

    /* ========================================================
       INITIAL STATE
       ======================================================== */

    gsapInstance.set(
        [
            characters.sela.bubble,
            characters.aras.bubble
        ],
        {
            autoAlpha: 0
        }
    );

    if (companion.root) {
        gsapInstance.set(companion.root, {
            autoAlpha: 0,
            y: 16
        });

        gsapInstance.set(companion.bubble, {
            autoAlpha: 0
        });
    }

    /*
     * Preload seluruh pose supaya pergantian image tidak
     * berkedip ketika pertama digunakan.
     */
    Object.values(AVATAR_ASSETS).forEach(
        (characterAssets) => {
            Object.values(characterAssets).forEach(
                (source) => {
                    const preloadImage = new Image();
                    preloadImage.src = source;
                }
            );
        }
    );
});