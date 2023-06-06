import { google } from "googleapis";

async function getAuthSheets(): Promise<{
    auth: any;
    googleClient: any;
    googleSheets: any;
    spreadsheetId: string;
}>{
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentialsSheets.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const googleClient = await auth.getClient();

    const googleSheets = google.sheets({version: 'v4'});

    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
        throw new Error("No spreadsheet ID found in .env file")
    }

    return {
        auth,
        googleClient,
        googleSheets,
        spreadsheetId
    }
}

export async function getGurusNamesIds(){
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets()

    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Suport Guru Bot"
    })

    return rows.data.values
}