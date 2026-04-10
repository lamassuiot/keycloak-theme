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
                            className="space-y-4"
                        >
                            {!kcContext.usernameHidden && (
                                <Field>
                                    <FieldLabel htmlFor="username" className="sr-only">
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
                                        className="h-[3.25rem] rounded-lg border-[#dddfdf] bg-[#ffffff] px-4 text-[0.96rem] shadow-none focus-visible:border-[#592ff0] focus-visible:ring-[#592ff0]/15 dark:border-white/10 dark:bg-white/5"
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
                                <FieldLabel htmlFor="password" className="sr-only">
                                    {msg("password")}
                                </FieldLabel>
                                <InputGroup className="h-[3.25rem] rounded-lg border-[#dddfdf] bg-[#ffffff] shadow-none focus-within:border-[#592ff0] dark:border-white/10 dark:bg-white/5">
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
                                        className="h-full rounded-lg px-4 text-[0.96rem]"
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

                            <div className={kcClsx("kcFormGroupClass")}>
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    value={kcContext.auth.selectedCredential}
                                />

                                <Button
                                    disabled={isLoginButtonDisabled}
                                    className="h-12 w-full rounded-lg bg-[#151515] text-white shadow-none hover:bg-black"
                                    tabIndex={7}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                >
                                    {msgStr("doLogIn")}
                                </Button>
                            </div>

                            <div className="space-y-3 pt-1">
                                {kcContext.realm.rememberMe &&
                                    !kcContext.usernameHidden && (
                                        <div className="flex items-center gap-3">
                                            <Checkbox
                                                tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                defaultChecked={
                                                    !!kcContext.login.rememberMe
                                                }
                                                className="size-4 rounded-[0.3rem] border-[#151515] data-[state=checked]:border-[#151515] data-[state=checked]:bg-[#151515] dark:border-white/50 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black"
                                            />

                                            <Label
                                                htmlFor="rememberMe"
                                                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
                                            >
                                                {msg("rememberMe")}
                                            </Label>
                                        </div>
                                    )}

                                {kcContext.realm.resetPasswordAllowed && (
                                    <div className="text-right">
                                        <a
                                            tabIndex={6}
                                            href={kcContext.url.loginResetCredentialsUrl}
                                            className="text-sm text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-slate-100"
                                        >
                                            {msg("doForgotPassword")}
                                        </a>
                                    </div>
                                )}
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
                        className="mt-4 h-12 w-full rounded-lg border-[#d9dce2] bg-white shadow-none hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
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
