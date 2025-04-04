import crypto from "crypto";

const secretKey = process.env.NEXT_PUBLIC_MOONPAY_SECRET_KEY;

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");

        if (!url) {
            return new Response(JSON.stringify({ error: "URL is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const signature = crypto.createHmac("sha256", secretKey)
            .update(new URL(url).search)
            .digest("base64");

        return new Response(JSON.stringify({ signature }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error generating signature:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
