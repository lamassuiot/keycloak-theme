import { assert } from "tsafe/assert";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Info() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login.ftl");

    const { url } = kcContext;

    const { msg } = useI18n();

    return (
        <div id="kc-registration-container" className="text-sm text-muted-foreground">
            <div id="kc-registration">
                <span className="space-x-2">
                    {msg("noAccount")}
                    <a
                        className="rounded-sm font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        tabIndex={8}
                        href={url.registrationUrl}
                    >
                        {msg("doRegister")}
                    </a>
                </span>
            </div>
        </div>
    );
}
