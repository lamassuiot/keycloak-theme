const SESSION_STORAGE_KEY = "redirectUrlOrigin";

function getOriginFromAbsoluteUrl(value: string): string | undefined {
    try {
        return new URL(value).origin;
    } catch {
        return undefined;
    }
}

function decodeBase64Url(value: string): string | undefined {
    try {
        const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
        const padded = normalized.padEnd(
            normalized.length + ((4 - (normalized.length % 4)) % 4),
            "="
        );

        return window.atob(padded);
    } catch {
        return undefined;
    }
}

export const redirectUrlOrigin = ((): string => {
    const url = new URL(window.location.href);

    from_url: {
        const value = url.searchParams.get("redirect_url");

        if (value === null) {
            break from_url;
        }

        const redirectUrlOrigin = getOriginFromAbsoluteUrl(value);

        if (redirectUrlOrigin === undefined) {
            break from_url;
        }

        sessionStorage.setItem(SESSION_STORAGE_KEY, redirectUrlOrigin);

        return redirectUrlOrigin;
    }

    from_client_data: {
        const clientData = url.searchParams.get("client_data");

        if (clientData === null) {
            break from_client_data;
        }

        const decodedClientData = decodeBase64Url(clientData);

        if (decodedClientData === undefined) {
            break from_client_data;
        }

        let parsedClientData: { ru?: string };

        try {
            parsedClientData = JSON.parse(decodedClientData) as { ru?: string };
        } catch {
            break from_client_data;
        }

        const redirectUrlOrigin = parsedClientData.ru
            ? getOriginFromAbsoluteUrl(parsedClientData.ru)
            : undefined;

        if (redirectUrlOrigin === undefined) {
            break from_client_data;
        }

        sessionStorage.setItem(SESSION_STORAGE_KEY, redirectUrlOrigin);

        return redirectUrlOrigin;
    }

    from_session_storage: {
        const redirectUrlOrigin = sessionStorage.getItem(SESSION_STORAGE_KEY);

        if (redirectUrlOrigin === null) {
            break from_session_storage;
        }

        return redirectUrlOrigin;
    }

    return window.location.origin;
})();
