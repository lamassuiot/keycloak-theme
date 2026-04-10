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

const APP_NAME = "Lamassu IoT";
const SHOWCASE_TAGS = ["#OPENSOURCE", "#INDUSTRY 4.0", "#CYBER SECURE OT"];

export function Template(props: {
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    headerNode: ReactNode;
    subHeaderNode?: ReactNode;
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
        subHeaderNode = null,
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
            documentTitle ??
            msgStr("loginTitle", kcContext.realm.displayName || kcContext.realm.name);
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

    console.log("kcContext", kcContext);
    console.log("kcContext.client?.baseUrl", kcContext.client?.baseUrl);
    console.log("redirectUrlOrigin", redirectUrlOrigin);

    return (
        <div className="relative grid min-h-svh bg-white dark:bg-background lg:grid-cols-2">
            <div className="absolute top-4 left-4 z-20 flex gap-2 lg:top-4 lg:left-9">
                <Button type="button" variant="outline" size="icon" asChild>
                    <a href={kcContext.client?.baseUrl ?? redirectUrlOrigin}>
                        <FiHome />
                    </a>
                </Button>

                <Languages />

                {kcContext.darkMode !== false && <ModeToggle />}
            </div>

            {/* Main content */}
            <div className="relative flex min-h-screen flex-col bg-[#fafafa] px-5 py-5 pb-8 dark:bg-background lg:order-2 lg:min-h-0 lg:px-8 lg:py-8">
                <div className="flex flex-1 items-center justify-center pt-16 lg:pt-10">
                    <div className="w-full max-w-[29rem]">
                        <Card className="gap-0 rounded-[1rem] border border-black/5 bg-[#ffffff] py-0 shadow-[0_18px_48px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-card dark:shadow-none">
                            <CardHeader className="px-8 pt-8 pb-6 text-left sm:px-10 sm:pt-10 sm:pb-7">
                                <div className="mb-8 flex flex-col items-center gap-3 text-center">
                                    <img
                                        src={companylogo}
                                        alt={`${APP_NAME} logo`}
                                        className="h-auto w-10 shrink-0"
                                    />
                                    <span className="text-[0.75rem] font-medium tracking-[0.02em] text-slate-500 dark:text-slate-400">
                                        {APP_NAME}
                                    </span>
                                </div>
                                <CardTitle className="space-y-2">
                                    {(() => {
                                        const node = !(
                                            auth !== undefined &&
                                            auth.showUsername &&
                                            !auth.showResetCredentials
                                        ) ? (
                                            <div className="space-y-2">
                                                <h1 className="text-[1.9rem] leading-none font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-50">
                                                    {headerNode}
                                                </h1>
                                                {subHeaderNode !== null && (
                                                    <p className="text-[0.97rem] leading-6 text-slate-500 dark:text-slate-400">
                                                        {subHeaderNode}
                                                    </p>
                                                )}
                                            </div>
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
                            <CardContent className="px-8 pb-8 sm:px-10 sm:pb-10">
                                <div id="kc-content">
                                    <div id="kc-content-wrapper">
                                        {displayMessage &&
                                            message !== undefined &&
                                            (message.type !== "warning" ||
                                                !isAppInitiatedAction) && (
                                                <Alert
                                                    variant={message.type}
                                                    className="mb-4 rounded-lg border border-slate-200 bg-[#fafafa] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
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
                                                            onClick={event => {
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
                                            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
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
                <div className="kc-right-showcase__content mt-5">
                    <img
                        src={`${import.meta.env.BASE_URL}lamassu-brand.png`}
                        alt="Lamassu IoT"
                        className="kc-right-showcase__brand"
                    />
                    <p className="kc-right-showcase__eyebrow">IDENTITY BY DESIGN</p>
                    <h2 className="kc-right-showcase__title">{msg("showcaseTitle")}</h2>
                    <p className="kc-right-showcase__description">
                        {msg("showcaseDescription")}
                    </p>
                    <div className="kc-right-showcase__tags">
                        {SHOWCASE_TAGS.map(tag => (
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
