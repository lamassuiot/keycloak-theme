import { i18nBuilder } from "@keycloakify/login-ui/i18n";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { I18nProvider, useI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withExtraLanguages({
        eu: {
            // cspell: disable-next-line
            label: "Euskera",
            //@ts-ignore
            getMessages: () => import("./i18n.eu")
        }
    })
    .withCustomTranslations({
        en: {
            welcomeMessage:
                "Welcome to Lamassu IoT - Your gateway to seamless planning and organization.",
            loginAccountTitle: "Login to your account",
            registerTitle: "Register a new account",
            showcaseTitle: "Industrial PKI for end-to-end IoT identity management",
            showcaseDescription:
                "Centralize device issuance, validation, and lifecycle management on a platform ready for industrial operations.",
            email: "Email",
            noAccount: "Don't have an account?",
            doRegister: "Sign up",
            "organization.selectTitle": "Choose Your Organization",
            "organization.pickPlaceholder": "Pick an organization to continue",
            "identity-provider-login-last-used": "Last used"
        },
        es: {
            welcomeMessage:
                "Bienvenido a Lamassu IoT: tu puerta de entrada a una planificación y organización fluidas.",
            loginAccountTitle: "Inicia sesión en tu cuenta",
            registerTitle: "Crear una cuenta nueva",
            showcaseTitle:
                "PKI industrial para gestionar identidades IoT de extremo a extremo",
            showcaseDescription:
                "Centraliza la emisión, validación y el ciclo de vida de los dispositivos en una plataforma lista para la operación industrial.",
            email: "Correo electrónico",
            doRegister: "Regístrate",
            noAccount: "¿No tienes una cuenta?",
            "organization.selectTitle": "Elige tu organización",
            "organization.pickPlaceholder":
                "Selecciona una organización para continuar",
            "identity-provider-login-last-used": "Último uso"
        },
        ca: {
            welcomeMessage:
                "Benvingut a Lamassu IoT: la teva porta d'entrada a una planificació i organització fluides.",
            loginAccountTitle: "Inicia sessió al teu compte",
            registerTitle: "Crea un compte nou",
            showcaseTitle:
                "PKI industrial per gestionar identitats IoT de cap a cap",
            showcaseDescription:
                "Centralitza l'emissió, la validació i el cicle de vida dels dispositius en una plataforma preparada per a l'operació industrial.",
            email: "Correu electrònic",
            doRegister: "Registra't",
            noAccount: "No tens cap compte?",
            "organization.selectTitle": "Tria la teva organització",
            "organization.pickPlaceholder":
                "Selecciona una organització per continuar",
            "identity-provider-login-last-used": "Darrer ús"
        },
        eu: {
            welcomeMessage:
                "Ongi etorri Lamassu IoT-ra — plangintza eta antolaketa ezin hobe baterako zure sarbidea.",
            loginAccountTitle: "Hasi saioa zure kontuan",
            registerTitle: "Erregistratu kontu berri bat",
            showcaseTitle: "PKI industriala, muturretik muturrerako IoT identitate-kudeaketarako",
            showcaseDescription:
                "Gailuen jaulkipena, balidazioa eta bizi-zikloaren kudeaketa zentralizatu operazio industrialetarako prestatutako plataforma batean.",
            email: "E-maila",
            noAccount: "Ez duzu konturik?",
            doRegister: "Erregistratu",
            "organization.selectTitle": "Aukeratu zure erakundea",
            "organization.pickPlaceholder": "Aukeratu erakunde bat jarraitzeko",
            "identity-provider-login-last-used": "Azkenekoz erabilia"
        },
    })
    .build();

export { I18nProvider, useI18n };
