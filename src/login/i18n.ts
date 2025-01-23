import { i18nBuilder } from "@keycloakify/login-ui/i18n";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { I18nProvider, useI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            welcomeMessage:
                "Welcome to Lamassu IoT - Your gateway to seamless planning and organization.",
            loginAccountTitle: "Login to your account",
            registerTitle: "Register a new account",
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
            email: "Correu electrònic",
            doRegister: "Registra't",
            noAccount: "No tens cap compte?",
            "organization.selectTitle": "Tria la teva organització",
            "organization.pickPlaceholder":
                "Selecciona una organització per continuar",
            "identity-provider-login-last-used": "Darrer ús"
        }
    })
    .build();

export { I18nProvider, useI18n };
