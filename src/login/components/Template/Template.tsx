import { Languages } from "@/components/langauges";
import { ModeToggle } from "@/components/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirectUrlOrigin } from "@/login/shared/redirectUrlOrigin";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@radix-ui/react-tooltip";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { FiHome } from "react-icons/fi";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import companylogo from "./../../assets/img/auth-logo.svg";
import { useInitializeTemplate } from "./useInitializeTemplate";

const APP_NAME = "Lamassu IoT.";
const SHOWCASE_TAGS = ["#OPENSOURCE", "#INDUSTRY 4.0", "#CYBER SECURE OT"];

export function Template(props: {
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    headerNode: ReactNode;
    socialProvidersNode?: ReactNode;
    infoNode?: ReactNode;
    documentTitle?: string;
    bodyClassName?: string;
    children: ReactNode;
}) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        children
    } = props;

    const { kcContext } = useKcContext();

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = useI18n();

    const { kcClsx } = useKcClsx();

    useEffect(() => {
        document.title =
            documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName || kcContext.realm.name);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    useInitializeTemplate();

    return (
        <div className="grid min-h-svh lg:grid-cols-2 bg-white dark:bg-background lg:bg-transparent">
            {/* Main content */}
            <div className="flex flex-col gap-4 px-0 py-0 pb-6 lg:p-6 lg:md:p-10 lg:pt-10 min-h-screen lg:min-h-0 lg:order-2">
                {/*  navigation */}
                <div className="absolute top-4 start-4 z-20 flex gap-2 lg:top-4 lg:start-9">
                    <Button type="button" variant="outline" size="icon" asChild>
                        <a href={kcContext.client?.baseUrl ?? redirectUrlOrigin}>
                            <FiHome />
                        </a>
                    </Button>

                    <Languages />

                    {kcContext.darkMode !== false && <ModeToggle />}
                </div>

                {/* Mobile header with logo */}
                <div className="lg:hidden relative pt-8 px-6">
                    {/* Logo and welcome message */}
                    <div className="flex flex-col items-center justify-center gap-3 mt-4">
                        <div className="mb-4 flex items-center gap-3">
                            <img src={companylogo} alt="Logo" />
                            <span className="text-xl"> {APP_NAME}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 items-start lg:items-center justify-center lg:mt-0 ">
                    <div className="w-full max-w-xl ">
                        <Card className=" shadow-none bg-transparent lg:bg-card border-0 lg:rounded-lg lg:border lg:shadow-sm rounded-t-2xl">
                            <CardHeader className="text-center">
                                <CardTitle>
                                    {(() => {
                                        const node = !(
                                            auth !== undefined &&
                                            auth.showUsername &&
                                            !auth.showResetCredentials
                                        ) ? (
                                            <h1 className="text-xl">{headerNode}</h1>
                                        ) : (
                                            <div
                                                id="kc-username"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <label
                                                    className="font-semibold text-lg"
                                                    id="kc-attempted-username"
                                                >
                                                    {auth.attemptedUsername}
                                                </label>

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                asChild
                                                            >
                                                                <a
                                                                    id="reset-login"
                                                                    href={
                                                                        url.loginRestartFlowUrl
                                                                    }
                                                                    aria-label={msgStr(
                                                                        "restartLoginTooltip"
                                                                    )}
                                                                >
                                                                    <RotateCcw className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>
                                                                {msg(
                                                                    "restartLoginTooltip"
                                                                )}
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        );

                                        if (displayRequiredFields) {
                                            return (
                                                <div className="flex items-center justify-between gap-2">
                                                    <div>{node}</div>
                                                    <div>
                                                        <span className="subtitle">
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                            {msg("requiredFields")}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return node;
                                    })()}
                                </CardTitle>
                            </CardHeader>
                            <CardContent >
                                <div id="kc-content">
                                    <div id="kc-content-wrapper">
                                        {displayMessage &&
                                            message !== undefined &&
                                            (message.type !== "warning" ||
                                                !isAppInitiatedAction) && (
                                                <Alert
                                                    variant={message.type}
                                                    className="my-3"
                                                >
                                                    <AlertDescription>
                                                        <div>
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: kcSanitize(
                                                                        message.summary
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    </AlertDescription>
                                                </Alert>
                                            )}
                                        {socialProvidersNode}
                                        <div className="children">{children}</div>
                                        {auth !== undefined &&
                                            auth.showTryAnotherWayLink && (
                                                <form
                                                    id="kc-select-try-another-way-form"
                                                    action={url.loginAction}
                                                    method="post"
                                                >
                                                    <div
                                                        className={kcClsx(
                                                            "kcFormGroupClass"
                                                        )}
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="tryAnotherWay"
                                                            value="on"
                                                        />
                                                        <a
                                                            href="#"
                                                            id="try-another-way"
                                                            onClick={(event) => {
                                                                document.forms[
                                                                    "kc-select-try-another-way-form" as never
                                                                ].submit();
                                                                event.preventDefault();
                                                                return false;
                                                            }}
                                                        >
                                                            {msg("doTryAnotherWay")}
                                                        </a>
                                                    </div>
                                                </form>
                                            )}
                                        {displayInfo && (
                                            <div className="text-center text-sm mt-4">
                                                {infoNode}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="kc-right-showcase relative hidden overflow-hidden lg:block lg:order-1">
                <div className="kc-right-showcase__content">
                    <p className="kc-right-showcase__brand">LAMASSU IOT</p>
                    <p className="kc-right-showcase__eyebrow">IDENTITY BY DESIGN</p>
                    <h2 className="kc-right-showcase__title">
                        PKI industrial para gestionar identidades IoT de extremo a
                        extremo
                    </h2>
                    <p className="kc-right-showcase__description">
                        Centraliza emision, validacion y ciclo de vida de dispositivos
                        en una plataforma lista para operacion industrial.
                    </p>
                    <div className="kc-right-showcase__tags">
                        {SHOWCASE_TAGS.map((tag) => (
                            <span key={tag} className="kc-right-showcase__tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
