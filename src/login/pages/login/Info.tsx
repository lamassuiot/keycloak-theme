import { assert } from "tsafe/assert";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Info() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login.ftl");

    const { url } = kcContext;

    const { msg } = useI18n();

    return (
        <div
            id="kc-registration-container"
            className="text-sm text-slate-500 dark:text-slate-400"
        >
            <div id="kc-registration">
                <span className="space-x-2">
                    {msg("noAccount")}
                    <a
                        className="font-medium text-slate-700 underline underline-offset-4 dark:text-slate-200"
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
