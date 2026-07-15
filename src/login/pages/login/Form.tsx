import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useKcContext } from "@/login/KcContext";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { Fingerprint } from "lucide-react";
import { useState } from "react";
import { assert } from "tsafe/assert";
import { PasswordVisibilityButton } from "../../components/PasswordVisibilityButton";
import { useI18n } from "../../i18n";
import { useScript } from "./useScript";

export function Form() {
    const { kcContext } = useKcContext();

    assert(kcContext.pageId === "login.ftl");

    const { msg, msgStr } = useI18n();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const { kcClsx } = useKcClsx();

    const webAuthnButtonId = "authenticateWebAuthnButton";

    useScript({ webAuthnButtonId });

    return (
        <>
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {kcContext.realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={kcContext.url.loginAction}
                            method="post"
                            className="space-y-5"
                        >
                            {!kcContext.usernameHidden && (
                                <Field>
                                    <FieldLabel
                                        htmlFor="username"
                                        className="text-[0.8125rem] font-semibold tracking-[0.01em] text-slate-700 dark:text-slate-200"
                                    >
                                        {!kcContext.realm.loginWithEmailAllowed
                                            ? msg("email")
                                            : !kcContext.realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("username")}
                                    </FieldLabel>
                                    <Input
                                        tabIndex={2}
                                        type="text"
                                        id="username"
                                        defaultValue={kcContext.login.username ?? ""}
                                        name="username"
                                        autoFocus
                                        autoComplete="username"
                                        placeholder={
                                            !kcContext.realm.loginWithEmailAllowed
                                                ? msgStr("email")
                                                : !kcContext.realm
                                                        .registrationEmailAsUsername
                                                  ? msgStr("usernameOrEmail")
                                                  : msgStr("username")
                                        }
                                        aria-invalid={kcContext.messagesPerField.existsError(
                                            "username",
                                            "password"
                                        )}
                                        className="h-11 rounded-lg border-slate-300 bg-white px-3.5 text-[0.9375rem] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-slate-400 focus-visible:border-[#3843d0] focus-visible:ring-[#3843d0]/15 dark:border-white/15 dark:bg-white/5 dark:hover:border-white/25"
                                    />
                                    {kcContext.messagesPerField.existsError(
                                        "username",
                                        "password"
                                    ) && (
                                        <FieldError>
                                            <span
                                                id="input-error"
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(
                                                        kcContext.messagesPerField.getFirstError(
                                                            "username",
                                                            "password"
                                                        )
                                                    )
                                                }}
                                            />
                                        </FieldError>
                                    )}
                                </Field>
                            )}

                            <Field>
                                <div className="flex items-center justify-between gap-4">
                                    <FieldLabel
                                        htmlFor="password"
                                        className="text-[0.8125rem] font-semibold tracking-[0.01em] text-slate-700 dark:text-slate-200"
                                    >
                                        {msg("password")}
                                    </FieldLabel>
                                    {kcContext.realm.resetPasswordAllowed && (
                                        <a
                                            tabIndex={6}
                                            href={kcContext.url.loginResetCredentialsUrl}
                                            className="rounded-sm text-[0.8125rem] font-medium text-[#2b36c6] underline-offset-4 transition-colors hover:text-[#1d268f] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b36c6]/30 dark:text-indigo-300 dark:hover:text-indigo-200"
                                        >
                                            {msg("doForgotPassword")}
                                        </a>
                                    )}
                                </div>
                                <InputGroup className="h-11 rounded-lg border-slate-300 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-slate-400 focus-within:border-[#3843d0] focus-within:ring-3 focus-within:ring-[#3843d0]/15 dark:border-white/15 dark:bg-white/5 dark:hover:border-white/25">
                                    <InputGroupInput
                                        tabIndex={3}
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder={msgStr("password")}
                                        aria-invalid={kcContext.messagesPerField.existsError(
                                            "username",
                                            "password"
                                        )}
                                        className="h-10 rounded-lg px-3.5 text-[0.9375rem]"
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <PasswordVisibilityButton
                                            passwordInputId="password"
                                            tabIndex={4}
                                        />
                                    </InputGroupAddon>
                                </InputGroup>
                                {kcContext.messagesPerField.existsError(
                                    "username",
                                    "password"
                                ) && (
                                    <FieldError>
                                        <span
                                            id="input-error"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(
                                                    kcContext.messagesPerField.getFirstError(
                                                        "username",
                                                        "password"
                                                    )
                                                )
                                            }}
                                        />
                                    </FieldError>
                                )}
                            </Field>

                            {kcContext.realm.rememberMe && !kcContext.usernameHidden && (
                                <div className="flex items-center gap-2.5">
                                    <Checkbox
                                        tabIndex={5}
                                        id="rememberMe"
                                        name="rememberMe"
                                        defaultChecked={!!kcContext.login.rememberMe}
                                        className="size-4 rounded border-slate-400 data-[state=checked]:border-[#2b36c6] data-[state=checked]:bg-[#2b36c6] dark:border-white/40 dark:data-[state=checked]:border-indigo-400 dark:data-[state=checked]:bg-indigo-400 dark:data-[state=checked]:text-slate-950"
                                    />

                                    <Label
                                        htmlFor="rememberMe"
                                        className="cursor-pointer text-[0.8125rem] font-normal text-slate-600 dark:text-slate-300"
                                    >
                                        {msg("rememberMe")}
                                    </Label>
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    value={kcContext.auth.selectedCredential}
                                />

                                <Button
                                    disabled={isLoginButtonDisabled}
                                    className="h-11 w-full rounded-lg bg-[#252f9b] font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.15),0_6px_16px_-8px_rgba(37,47,155,0.65)] hover:bg-[#1d267f] focus-visible:ring-[#3843d0]/30 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-400"
                                    tabIndex={7}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                >
                                    {msgStr("doLogIn")}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {kcContext.enableWebAuthnConditionalUI && (
                <>
                    <form id="webauth" action={kcContext.url.loginAction} method="post">
                        <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                        <input
                            type="hidden"
                            id="authenticatorData"
                            name="authenticatorData"
                        />
                        <input type="hidden" id="signature" name="signature" />
                        <input type="hidden" id="credentialId" name="credentialId" />
                        <input type="hidden" id="userHandle" name="userHandle" />
                        <input type="hidden" id="error" name="error" />
                    </form>

                    {kcContext.authenticators !== undefined &&
                        kcContext.authenticators.authenticators.length !== 0 && (
                            <>
                                <form id="authn_select" className={kcClsx("kcFormClass")}>
                                    {kcContext.authenticators.authenticators.map(
                                        (authenticator, i) => (
                                            <input
                                                key={i}
                                                type="hidden"
                                                name="authn_use_chk"
                                                readOnly
                                                value={authenticator.credentialId}
                                            />
                                        )
                                    )}
                                </form>
                            </>
                        )}
                    <br />

                    <Button
                        id={webAuthnButtonId}
                        type="button"
                        className="mt-5 h-11 w-full rounded-lg border-slate-300 bg-white font-medium shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
                        variant="outline"
                    >
                        <Fingerprint className="w-4 h-4" />
                        {msgStr("passkey-doAuthenticate")}
                    </Button>
                </>
            )}
        </>
    );
}
