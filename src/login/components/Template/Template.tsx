import { Languages } from "@/components/langauges";
import { ModeToggle } from "@/components/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import { useInitializeTemplate } from "./useInitializeTemplate";

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

    return (
        <div className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,1.2fr)_minmax(28rem,0.8fr)]">
            <section className="order-2 flex min-h-[calc(100svh-9rem)] flex-col gap-8 p-6 md:p-10 lg:min-h-svh">
                <div className="flex items-center justify-between gap-4">
                    <a
                        href={redirectUrlOrigin}
                        className="flex flex-col items-start gap-1.5 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                        <span
                            role="img"
                            aria-label="Lamassu IoT"
                            className="block h-[1.1875rem] w-40 bg-primary dark:bg-foreground"
                            style={{
                                WebkitMaskImage: `url(${import.meta.env.BASE_URL}lamassu-brand.png)`,
                                maskImage: `url(${import.meta.env.BASE_URL}lamassu-brand.png)`,
                                WebkitMaskPosition: "left center",
                                maskPosition: "left center",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                                WebkitMaskSize: "contain",
                                maskSize: "contain"
                            }}
                        />
                        <span className="text-[0.625rem] font-semibold tracking-[0.2em] text-muted-foreground">
                            IDENTITY BY DESIGN
                        </span>
                    </a>
                    <div className="flex items-center gap-2">
                        <Languages />
                        {kcContext.darkMode !== false && <ModeToggle />}
                    </div>
                </div>

                <main className="flex flex-1 items-center justify-center py-8">
                    <div className="w-full max-w-sm">
                        <div>
                            <header className="mb-8 text-center">
                                <div className="space-y-2">
                                    {(() => {
                                        const node = !(
                                            auth !== undefined &&
                                            auth.showUsername &&
                                            !auth.showResetCredentials
                                        ) ? (
                                            <div className="space-y-2">
                                                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                                    {headerNode}
                                                </h1>
                                                {subHeaderNode !== null && (
                                                    <p className="text-balance text-sm text-muted-foreground">
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

                                        return node;
                                    })()}
                                </div>
                            </header>
                            <div>
                                <div id="kc-content">
                                    <div id="kc-content-wrapper">
                                        {displayMessage &&
                                            message !== undefined &&
                                            (message.type !== "warning" ||
                                                !isAppInitiatedAction) && (
                                                <Alert
                                                    variant={message.type}
                                                    className="mb-4"
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
                                        {displayRequiredFields && (
                                            <div className="mb-4 flex justify-end">
                                                <span className="text-xs text-muted-foreground">
                                                    <span
                                                        className="mr-1 text-destructive"
                                                        aria-hidden="true"
                                                    >
                                                        *
                                                    </span>
                                                    {msg("requiredFields")}
                                                </span>
                                            </div>
                                        )}
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
                                                            "kcFormGroupClass",
                                                            "mt-5"
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
                                                            className="inline-flex cursor-pointer rounded-sm text-sm font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
                                            <div className="mt-6 text-center text-sm text-muted-foreground">
                                                {infoNode}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>

            <aside className="order-1 relative h-36 overflow-hidden bg-black sm:h-44 lg:h-auto">
                <img
                    src={`${import.meta.env.BASE_URL}image.png`}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-[72%_62%] lg:object-[72%_center]"
                />
            </aside>
        </div>
    );
}
