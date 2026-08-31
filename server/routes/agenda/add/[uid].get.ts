import type { H3Event } from "h3";
import type { RuntimeConfig } from "nuxt/schema";
import { createClient } from "@prismicio/client";
import type { AllDocumentTypes, EventDocument } from "~~/prismicio-types";

export default defineEventHandler(async (event: H3Event) => {
    const uid: string | undefined = getRouterParam(event, "uid");
    if (!uid) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing 'uid' parameter",
        });
    }

    const config: RuntimeConfig = useRuntimeConfig();

    try {
        const client = createClient<AllDocumentTypes>(config.apiPrismicRepository);
        const document: EventDocument = await client.getByUID<EventDocument>("event", uid);

        const icalData: string = buildIcalEvent(document);

        setResponseHeader(event, "Content-Type", "text/calendar; charset=utf-8");
        setResponseHeader(
            event,
            "Content-Disposition",
            `attachment; filename="${document.id}.ics"`,
        );
        return icalData;
    } catch (error: unknown) {
        const statusCode = (error as { statusCode?: number }).statusCode ?? 400;
        const statusMessage = (error as Error).message ?? "Internal Server Error";

        throw createError({
            statusCode,
            statusMessage,
        });
    }
});
