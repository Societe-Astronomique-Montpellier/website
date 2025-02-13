export default defineEventHandler(
  async (event): Promise<{ status: number; message: string }> => {
    const config = useRuntimeConfig();

    // Prismic
    const secret = config.prismicEventSecret;

    // Nextcloud
    const nextcloudUrl: string = config.nextcloudUrl;
    const nextcloudLogin: string = config.nextcloudLogin;
    const nextcloudPassword: string = config.nextcloudPassword;
    const nextcloudAgenda: string = "sam-agenda";

    const body = await readBody(event);
    const requestSecret = body.secret;

    if (secret !== requestSecret) {
      event.node.res.statusCode = 403;
      return { status: 403, message: "Forbidden: Invalid secret" };
    }

    const { documents } = body;
    const documentId = documents[0];

    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Basic ${Buffer.from(`${nextcloudLogin}:${nextcloudPassword}`).toString("base64")}`,
    );

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    const ncResponse: Response = await fetch(
      `${nextcloudUrl}/remote.php/dav/calendars/${nextcloudLogin}/${nextcloudAgenda}/${documentId}.ics`,
      requestOptions,
    );

    if (!ncResponse.ok) {
      event.node.res.statusCode = 400;
      return {
        status: 400,
        message: `Error from nextcloud: ${ncResponse.statusText}`,
      };
    }

    event.node.res.statusCode = 204;
    return {
      status: event.node.res.statusCode,
      message: `Evene ${documentId} deleted`,
    };
  },
);
