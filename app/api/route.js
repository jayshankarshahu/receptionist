import { clientData } from "./_dbSchema";
import mongoose from 'mongoose';

export async function GET(request, response) {

    const clientFingerprint = request.nextUrl.searchParams.get('clientFingerprint');

    if (!clientFingerprint) {
        return new Response("", {
            status: 400
        });
    }

    const currentHourTimestamp = Math.floor(Date.now()/1000/3600); // unix timestamp of current     

    const ipAddress = getClientIp(request);

    await mongoose.connect(process.env.MONGODB_CONNECTION_URI);

    const result = await clientData.updateOne(
        { clientFingerprint },
        {
            $addToSet: {
                visits: currentHourTimestamp,
                ip: ipAddress
            }
        },
        { upsert: true }
    );

    console.log(result);
    
    return new Response("", {
        status: 200
    });

}

function getClientIp(req) {

    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) return forwardedFor.split(',')[0].trim();

    // fallback using ipAddress utility
    return ipAddress(req) || 'Unknown';

}